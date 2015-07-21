/* EXAMPLE PLUGIN IMPLEMENTATION HERE
$(function(){
    $('#apostrophe').apostrophe({
        content: ['slides/slide_0.html','slides/slide_1.html','slides/slide_2.html','slides/slide_3.html','slides/slide_4.html','slides/slide_5.html','slides/slide_6.html','slides/slide_7.html','slides/slide_8.html','slides/slide_9.html','slides/slide_10.html','slides/slide_11.html','slides/slide_12.html','slides/slide_13.html','slides/slide_14.html','slides/slide_15.html','slides/slide_16.html','slides/slide_17.html','slides/slide_18.html','slides/slide_19.html','slides/slide_20.html','slides/slide_21.html','slides/slide_22.html','slides/slide_23.html','slides/slide_24.html','slides/slide_25.html','slides/slide_26.html','slides/slide_27.html','slides/slide_28.html','slides/slide_29.html','slides/slide_30.html','slides/slide_31.html','slides/slide_32.html','slides/slide_33.html','slides/slide_34.html','slides/slide_35.html','slides/slide_36.html','slides/slide_37.html','slides/slide_38.html','slides/slide_39.html','slides/slide_40.html','slides/slide_41.html','slides/slide_42.html','slides/slide_43.html','slides/slide_44.html','slides/slide_45.html','slides/slide_46.html','slides/slide_47.html','slides/slide_48.html','slides/slide_49.html','slides/slide_50.html','slides/slide_51.html','slides/slide_52.html','slides/slide_53.html','slides/slide_54.html','slides/slide_55.html','slides/slide_56.html','slides/slide_57.html','slides/slide_58.html','slides/slide_59.html','slides/slide_60.html','slides/slide_61.html'],
        prev: '.nav-prev',
        next: '.nav-next',
        pagination: '.pager'
    });
});
*/
(function($){
    $.apostrophe = function(el, options, parameter){ 
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        
        // no need to initiate plugin more than once
        if (base.$el.data("apostrophe") != undefined){
            return;
        }
        
        // Add a reverse reference to the DOM object
        base.$el.data("apostrophe", base);
        
        base.init = function(){
        
            if( typeof( parameter ) === "undefined" || parameter === null ) parameter = "value";
            
            base.parameter = parameter;
            
            base.options = $.extend({},$.apostrophe.defaultOptions, options);

            // content of slides
            base.cache = [];
            base.content = base.options.content;

            $(base.options.next).on("click", function(){
                mySwipe.next();
            });
            $(base.options.prev).on("click", function(){
                mySwipe.prev();
            })
            //Create blank slides as placeholders
            base.$loading = "<i class=\"icon-spinner icon-spin icon-large\"></i>";
            base.$aposWrap = base.$el.find('.apostrophe-wrap');
            base.$pager = $(base.options.pager);
            for (var i=1;i<base.options.content.length;i++){ 
                base.$aposWrap.append( "<div class='apos-slide'>"+base.$loading+"</div>" );
            }
            // Put your initialization code here
            base.apostropheInIt();    
        };

        // Init Function
        base.apostropheInIt = function(){
        
            window.mySwipe = new Swipe(document.getElementById('apostrophe'), {
                startSlide: base.getHash(),
                callback: function(index, element) {base.getContent(index);base.updateHashandPager(index);},
            });
            base.getContent(base.getHash());
        };
        base.getContent = function(i){
        
            var index = i;
            // if($(".apos-slide").eq(index+1).find('i').hasClass('icon-spinner')){
            //     $(".apos-slide").eq(index+1).load(base.options.content[index+1]);
            // }
            if($(".apos-slide").eq(index).find('i').hasClass('icon-spinner')){
                $(".apos-slide").eq(index).load(base.options.content[index]);
            }
            // if($(".apos-slide").eq(index-1).find('i').hasClass('icon-spinner')){
            //     $(".apos-slide").eq(index-1).load(base.options.content[index-1]);
            // }
            base.stopVids(index);
            var curSlide = (mySwipe.getPos()+1);
            $(base.options.pagination).html(curSlide+ " / "+ mySwipe.getNumSlides());
        }
        base.updateHashandPager = function(i){
            window.location.hash = "slideNum="+i;
            base.$pager.html(i+" / "+base.options.content.length);
        }
        function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }
        base.getHash = function(){
            if(window.location.hash) {
                var hashValue = window.location.hash.replace('#slideNum=', '');
                if(isNumber(hashValue) && hashValue<base.options.content.length){
                    return hashValue;
                }else{return 0;};
                
            }else{
                return 0;    
            }
        }
        base.stopVids = function(index){
            $(".apos-slide").eq(index+1).html(base.$loading);
            $(".apos-slide").eq(index-1).html(base.$loading);

            if($('iframe').length>0){
                $(".apos-slide").eq(index+1).find('iframe').each(function(){
                    startSrc = $(this).attr('src');
                    $(this).attr('src', startSrc);
                });
                $(".apos-slide").eq(index-1).find('iframe').each(function(){
                    startSrc = $(this).attr('src');
                    $(this).attr('src', startSrc);
                });
            }
        }
        // Run initializer
        base.init();
        if ("onhashchange" in window) {
            function locationHashChanged() {
                var index = base.getHash();
            
                mySwipe.slide(index);
            }
            window.onhashchange = locationHashChanged;
        }       
    };

    $.apostrophe.defaultOptions = {
        content: [],
        next: '.nav-next',
        prev: '.nav-prev',
        pagination: '.cycle-pager',
    };
 
    $.apostrophe.methods = { goto: function(arg){
            var data = $(this).data('apostrophe');
            data.cycleGo(arg);
        }
    };
    $(document).keydown(function(e){
        if (e.keyCode == 37) {
            mySwipe.prev()
            return false;
        }
        if (e.keyCode == 39) {
            mySwipe.next()
            return false;
        }
    });
    $.fn.apostrophe = function(options, parameter){
        var args = arguments;
        return this.each(function(){
            // direct method calls ie.
            if ($.apostrophe.methods[options]){
                return $.apostrophe.methods[options].apply(this, Array.prototype.slice.call( args, 1 ));
            }
            
            if($(this).data('apostrophe')){
                return $(this).data('apostrophe');
            }
            
            // regular initialization
            if (typeof options == 'object'){
                (new $.apostrophe(this,options, parameter));
            }
        });
    };
})(jQuery);