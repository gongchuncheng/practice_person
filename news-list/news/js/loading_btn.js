define(['zepto', 'loading'], function($, Loading){
	var load = new Loading();
	return lb = {
		//判断数据加载完毕禁止滚动
		flag: true,
		//初始化加载按钮
		init: function(options){
			console.log("初始化数据");
			//设置调用接口
			lb.options = $.extend({
				dataPath: 'mock/data.json', //数据路径
				container: '#container', //容器名称
				btnClass: '.load-more', //按钮名称
				page: 6, //一次加载数据个数
				btnRefresh: '↑上拉加载更多...',
				btnUpdate: '↓释放加载',
				btnLoad: '加载中...',
				btnNoData: '暂无数据'
			},options);
		},
		//创建加载按钮
		create: function(option){
			console.log("创建新的按钮");
			if(option){
				$(lb.options.container).append('<div class="'+lb.options.btnClass.substr(1)+'">'+lb.options.btnRefresh+'</div>');
			}else{
				lb.flag = false;
				$(lb.options.container).append('<div class="'+lb.options.btnClass.substr(1)+'">'+lb.options.btnNoData+'</div>');
			}
			
		},
		//按钮自毁
		destroy: function(){
			console.log("按钮自毁");
			$(lb.options.btnClass).remove();
		},
		//手势状态
		state: {
			//屏幕滑动
			move: function(){
				console.log("滑动屏幕");
				$(lb.options.btnClass).html(lb.options.btnUpdate);
			},
			//离开屏幕
			end: function(){
				$(lb.options.btnClass).html('<img class="loding-icon" src="" alt="">'+lb.options.btnLoad);
				//图片预加载
				var img = new Image();
				img.onload = function(){
					$('.loding-icon')[0].src=img.src;
					setTimeout(function(){
						load.render({
							page: lb.options.page,
							dataPath: lb.options.dataPath,
							container: lb.options.container,
							destroy: lb.destroy,
							create: lb.create,
							template: lb.options.template
						});
					}, 1000);
					//删除无用对象  防止内存泄漏
					img = null;
				};
				img.src="img/loding.png";
			}
		},
		loadData: function(){
			//第一次加载数据
			load.render({
				page: lb.options.page,
				dataPath: lb.options.dataPath,
				container: lb.options.container,
				create: lb.create,
				template: lb.options.template
			});
		}
	};	
});	
