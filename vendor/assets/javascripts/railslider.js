//Checking if jQuery function is loaded
(function IsjQueryLoaded(){

    if(window.jQuery){

        $(function(){

            //Checking if "RailSlider" class is already created
            if(typeof RailSlider === 'undefined' || jQuery.isEmptyObject(RailSlider.prototype)){

                // constructor function
                RailSlider = function(params){

                    this.containerID = params['containerID'];
                    this.teWrapper = $('#' + this.containerID + ' .rs-wrapper');
                    this.teCover = $('#' + this.containerID + ' div.rs-cover');
                    this.teImages = $('#' + this.containerID + ' div.rs-images > img');
                    this.imagesCount = $(this.teImages).length;
                    this.currentImg = 0;
                    this.navNext = $('#' + this.containerID + ' .rs-next');
                    this.navPrev = $('#' + this.containerID + ' .rs-prev');
                    //holds all animation options
                    this.te_type = $('#' + this.containerID + ' .rs-effects');
                    //holds selection animation option
                    this.type= $(this.te_type).val();
                    //holds animation option used during transition
                    this.teTransition = $('#' + this.containerID + ' .rs-transition');
                    //flag pointing if transition is active
                    this.animated = false;
                    //bullets
                    this.bullets = $('#' + this.containerID + ' .rs-bullets a');
                    //auto sliding settings
                    this.isAutoSlidingEnabled = true;
                    this.direction = "next"; //"next" or "prev"
                    this.timeInterval = 5000; // time interval im milliseconds
                    this.isAutoSlidingOn = false;
                    this.autoSlidingID = null; // "id" returned by "setInterval()" function
                    //others
                    this.controls = $('#' + this.containerID + ' .rs-controls');
                };

                RailSlider.prototype = {

                    constructor: RailSlider,
                    hasPerspective: Modernizr.csstransforms3d,

                    init: function(){

                        //set transition animation option
                        this.teTransition.addClass(this.type);

                        this.navNext.on('click', $.proxy(function(){

                            //checking if browser supports 3D animations and an animation is not already running
                            if(!(this.hasPerspective && this.animated)){
                                this.animated = true;
                                this.showNext('next');
                            }

                            //calling "event.stopPropagation()" and "event.preventDefault()"
                            return false;

                        }, this));

                        this.navPrev.on('click', $.proxy(function(){

                            //checking if browser supports 3D animations and an animation is not already running
                            if(!(this.hasPerspective && this.animated)){
                                this.animated = true;
                                this.showNext('prev');
                            }

                            //calling "event.stopPropagation()" and "event.preventDefault()"
                            return false;

                        }, this));

                        if(this.hasPerspective){

                            this.teWrapper.on({

                                'animationstart webkitAnimationStart oAnimationStart MSAnimationStart': $.proxy(function(event){

                                    //ignoring "play" and "pause" buttons animations
                                    if(event.originalEvent.animationName == 'play-button-in' || event.originalEvent.animationName == 'pause-button-in'){
                                        return false;
                                    }else{
                                        this.te_type.prop('disabled', true);
                                        return false;
                                    }
                                }, this),
                                'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd': $.proxy(function(event){

                                    //ignoring "play" and "pause" buttons animations
                                    if(event.originalEvent.animationName == 'play-button-in' || event.originalEvent.animationName == 'pause-button-in'){
                                        return false;
                                    }else{

                                        if((this.type === 'rs-unfold01' && event.originalEvent.animationName !== 'unfold1_3Back')||(this.type === 'rs-unfold02' && event.originalEvent.animationName !== 'unfold2_3Back')){
                                            return false;
                                        }

                                        this.teCover.removeClass('rs-hide');
                                        this.teTransition.removeClass('rs-show');
                                        this.animated = false;
                                        this.te_type.prop('disabled', false);

                                        return false;
                                    }

                                }, this)
                            });
                        }

                        //update "transition" animation option
                        $(this.te_type).on('change.RailSlider', $.proxy(function(event) {
                            if(this.animated){
                                $(event.currentTarget).val(this.type);
                            }else{
                                this.type = $(event.currentTarget).val();
                                this.teTransition.removeClass().addClass('rs-transition').addClass(this.type);
                            }
                        }, this));

                        //handling bullets events
                        for(var index = 0; index < this.bullets.length; index++){

                            this.bullets.eq(index).on('click', $.proxy(function(event){

                                var currentElementPosition = $(event.target).attr('data-position');

                                //checking if browser supports 3D animations and an animation is not already running
                                if(!(this.hasPerspective && this.animated) && this.currentImg + 1 != currentElementPosition){
                                    this.animated = true;
                                    this.changeBullet(currentElementPosition - 1);
                                    this.showNext(currentElementPosition);
                                }

                                //calling "event.stopPropagation()" and "event.preventDefault()"
                                return false;

                            }, this));
                        }

                        this.changeBullet(this.currentImg);

                        //handling commands ("play" and "pause") events
                        this.teCover.on('click','.rs-animation-command',$.proxy(function() {
                            this.toggleAnimation();
                            if($(event.target).hasClass('rs-pause')){
                                $(event.target).removeClass('rs-pause');
                                $(event.target).addClass('rs-play');
                            }else{
                                $(event.target).removeClass('rs-play');
                                $(event.target).addClass('rs-pause');
                            }
                        }, this));

                        //starting auto sliding if needed
                        if(this.isAutoSlidingEnabled){
                            this.toggleAnimation();
                        }
                    },

                    changeBullet:function(index){
                        this.bullets.removeClass('shown').eq(index).addClass('shown');
                    },

                    showNext:function(direction){

                        if (this.hasPerspective) {

                            this.teTransition.addClass('rs-show');
                            this.teCover.addClass('rs-hide');
                        }

                        this.updateImages(direction);
                    },

                    updateImages:function(direction){

                        // "direction" can be "prev", "next" or number pointing exact image
                        var $last_img = this.teImages.eq(this.currentImg);

                        switch(direction){
                            case 'next':{
                                if(this.currentImg === this.imagesCount - 1){
                                    this.currentImg = 0;
                                }else{
                                    this.currentImg++;
                                }
                                break;
                            }
                            case 'prev':{
                                if(this.currentImg === 0){
                                    this.currentImg = this.imagesCount - 1;
                                }else{
                                    this.currentImg--;
                                }
                                break;
                            }
                            default:{

                                if(direction > 0 && direction <= this.imagesCount) {
                                    this.currentImg = --direction ;
                                }

                                break;
                            }
                        }

                        var $currentImg = this.teImages.eq(this.currentImg);

                        this.teTransition.find('div.rs-front').empty().append('<img src="' + $last_img.attr('src') + '">');
                        this.teTransition.find('div.rs-back').empty().append('<img src="' + $currentImg.attr('src') + '">');

                        this.teCover.find('img').attr('src', $currentImg.attr('src'));

                        this.changeBullet(this.currentImg);
                    },

                    toggleNavigation:function(){
                        $('#' + this.containerID + ' .rs-controls').toggle();
                    },

                    toggleAnimation:function(){
                        if(this.isAutoSlidingOn){
                            clearInterval(this.autoSlidingID);
                            this.isAutoSlidingOn = false;
                        }else{
                            this.autoSlidingID = setInterval($.proxy(function(event){this.simulatedClick(this)}, this),this.timeInterval);
                            this.isAutoSlidingOn = true;
                        }
                    },

                    simulatedClick:function(){
                        if(this.direction == 'next'){
                            this.navNext.trigger('click');
                        } else {
                            this.navPrev.trigger('click');
                        }
                    }

                };
            }
        });

    }else{
        setTimeout(IsjQueryLoaded(),100);
    }
})();

/* Example call

    //Checking if jQuery function is loaded
    (function IsjQueryLoaded(){
        if(window.jQuery){
            //Waiting for all elements to be rendered
            $(document).ready(function(){
                //Creating new instance of "RailSlider"
                test = new RailSlider({'containerID':'test'});
                test.init();
            });
        }else{
            setTimeout(IsjQueryLoaded(),100);
        }
    })();

*/