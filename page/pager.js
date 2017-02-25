define(['jquery', 'underscore'], function($, _){
    function Pager(){
        this.page = 0;
        this.bStop = false;
        this.bEnd = false;
    }
    Pager.prototype = {
        init:function(options){
            var that = this;
            this.options = $.extend({
                isMask:false
            }, options);
            if(this.options.isMask){
                this.loadMask();
            }
            this.loadData();
            $(this.options.loadBtn).on('click', function () {
                if(that.bStop && !that.bEnd){
                    that.loadData();
                    that.bStop = false;
                }
            });
        },
        loadData:function(){
            var that = this,
                $container = $(this.options.container);
            $.get(this.options.url, $.extend({
                offset: this.page++ * this.options.pageNum
            }, this.options.data), function(res){
                for(var j=0; j<res.length; j++) {
                    that.bEnd = res[j].isEnd;
                    console.log(res[j]);
                    $container.append(_.template(that.options.template)(res[j]));
                }
                that.bStop = true;
                that.closeMask();
            }, 'json');
        },
        loadMask: function () {
            var $maskContainer = $(this.options.maskContainer);
            $(this.options.maskClass).appendTo($maskContainer);
        },
        closeMask: function(){
            $(this.options.maskClass).remove();
        }
    };
    return Pager;
});
