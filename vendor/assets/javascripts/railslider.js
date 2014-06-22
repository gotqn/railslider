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
                    this.rsCover = $('#' + this.containerID + ' div.rs-cover');
                    this.rsImages = $('#' + this.containerID + ' div.rs-images > img');
                    this.imagesCount = $(this.rsImages).length;
                    this.currentImg = 0;
                    this.navNext = $('#' + this.containerID + ' .rs-next');
                    this.navPrev = $('#' + this.containerID + ' .rs-prev');
                    //holds all animation options
                    this.rsEffect = $('#' + this.containerID + ' .rs-effects');
                    //holds selection animation option
                    this.type= $(this.rsEffect).val();
                    //holds animation option used during transition
                    this.rsTransition = $('#' + this.containerID + ' .rs-transition');
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
                    this.effectSelector = '';
                };

                RailSlider.prototype = {

                    constructor: RailSlider,
                    hasPerspective: Modernizr.csstransforms3d,

                    init: function(){

                        //set transition animation option
                        this.rsTransition.addClass(this.type);

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
                                        this.rsEffect.prop('disabled', true);
                                        return false;
                                    }
                                }, this),
                                'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd': $.proxy(function(event){

                                    //ignoring "play" and "pause" buttons animations
                                    if(event.originalEvent.animationName == 'play-button-in' || event.originalEvent.animationName == 'pause-button-in'){
                                        return false;
                                    }else{

                                        if((this.type === 'rs-unfold01' && event.originalEvent.animationName !== 'rs-unfold1_3Back')||(this.type === 'rs-unfold02' && event.originalEvent.animationName !== 'rs-unfold2_3Back')){
                                            return false;
                                        }

                                        this.rsCover.removeClass('rs-hide');
                                        this.rsTransition.removeClass('rs-show');
                                        this.animated = false;
                                        this.rsEffect.prop('disabled', false);

                                        return false;
                                    }

                                }, this)
                            });
                        }

                        //update "transition" animation option
                        $(this.rsEffect).on('change.RailSlider', $.proxy(function(event) {
                            if(this.animated){
                                $(event.currentTarget).val(this.type);
                            }else{
                                this.type = $(event.currentTarget).val();
                                this.rsTransition.removeClass().addClass('rs-transition').addClass(this.type);
                                this.effectSelector = this.effectsSelector();
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
                        this.rsCover.on('click','.rs-animation-command',$.proxy(function(event) {
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

                        //initializing selector depending on selected effect type
                        this.effectSelector = this.effectsSelector();
                    },

                    changeBullet:function(index){
                        this.bullets.removeClass('shown').eq(index).addClass('shown');
                    },

                    showNext:function(direction){

                        if (this.hasPerspective) {

                            this.rsTransition.addClass('rs-show');
                            this.rsCover.addClass('rs-hide');
                        }

                        this.updateImages(direction);
                    },

                    updateImages:function(direction){

                        // "direction" can be "prev", "next" or number pointing exact image
                        var $last_img = this.rsImages.eq(this.currentImg);

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

                        var $currentImg = this.rsImages.eq(this.currentImg);

                        this.rsTransition.find(this.effectSelector + '.rs-front').empty().append('<img src="' + $last_img.attr('src') + '">');
                        this.rsTransition.find(this.effectSelector + '.rs-back').empty().append('<img src="' + $currentImg.attr('src') + '">');

                        this.rsCover.find('img').attr('src', $currentImg.attr('src'));

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
                    },

                    effectsSelector:function(){
                        var currentGroup = this.rsEffect.find('option:selected').closest('optgroup').prop('label');

                        switch(currentGroup){
                            case 'rs-flips': currentGroup = '.rs-flip ';break;
                            case 'rs-rotations': currentGroup = '.rs-flip ';break;
                            case 'rs-multi-flips': currentGroup = '.rs-multi-flip ';break;
                            case 'rs-cubes': currentGroup = '.rs-cube';break;
                            case 'rs-unfolds': currentGroup = '.rs-unfold';break;
                            case 'rs-others': currentGroup = '';break;
                        }

                        return currentGroup;
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