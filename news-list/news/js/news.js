require(['zepto', 'loading_btn'], function($, lb){
	//初始化接口
	lb.init({
		dataPath: 'mock/data.json', //数据路径
		container: '#container', //容器名称
		btnClass: '.load-more', //按钮名称
		page: 7, //一次加载数据个数,
		template: $('#myNew').html()//自定义模版
	});
	//加载第一批数据
	lb.loadData();
	var loadBtn = $('.load-more'),
		//开始位置
		startPosition,
		//结束位置
		endPosition,
		//移动距离
		moveLength,
		doc = $(document),
		win = $(window),
		handlerstart = function (e) {
			event.preventDefault();
            var touch = e.touches[0];
            startPosition = touch.pageY;
            doc[0].removeEventListener('touchstart', handlerstart, false);
        },
        handlermove =  function (e) {
            var touch = e.touches[0];
            endPosition = touch.pageY;
            moveLength = endPosition - startPosition;
            if(moveLength <= -70){
            	lb.state.move();
            	doc[0].removeEventListener('touchmove', handlermove, false);
            }
        },
		handlerend = function () {
            if(moveLength <= -70){
            	lb.state.end();
            	doc[0].removeEventListener('touchend', handlerend, false);
            }
        };
	win.scroll(function(){
		if((win.scrollTop() >= doc.height() - win.height()) && lb.flag){
	        doc[0].addEventListener('touchstart', handlerstart, false);
	        doc[0].addEventListener('touchmove', handlermove, false);
	        doc[0].addEventListener('touchend', handlerend, false);
		}else{
			doc[0].removeEventListener('touchstart', handlerstart, false);
	        doc[0].removeEventListener('touchmove', handlermove, false);
	        doc[0].removeEventListener('touchend', handlerend, false);
		}
	});
});