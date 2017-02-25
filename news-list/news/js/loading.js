define(['zepto', 'underscore'], function($, _){
	//通过定义构造函数使不同页面之间的数据加载不会乱掉
	function Loading(){
		this.index = 0;
	}
	Loading.prototype = {
		//初始化
		init: function(){
			var aImgCon = $('.img-con'),
				aTitle = $('.title'),
				aContent = $('.content');
			//重置图片容器高度	判断标题以及内容是否过长
			function resize(){
			   for(var j=0; j<aImgCon.length; j++){
					aImgCon[j].style.height=aImgCon[j].offsetWidth * 0.75+'px';
					if(parseInt(aTitle[j].offsetHeight) > parseInt($(aTitle[j]).css('line-height').substr(0,2))){
						var see_num = parseInt(aTitle[j].offsetWidth) / parseInt($(aTitle[j]).css('font-size').substr(0,2));
						$(aTitle[j]).html($(aTitle[j]).html().substr(0,see_num-2) + '...');
					}
					var trNum = parseInt(aContent[j].offsetHeight) / parseInt($(aContent[j]).css('line-height').substr(0,2));
					if(trNum > 2){
						var see_num = parseInt(aContent[j].offsetWidth) * 2 / parseInt($(aContent[j]).css('font-size').substr(0,2));
						$(aContent[j]).html($(aContent[j]).html().substr(0,see_num-5) + '...');
					}
				}
			}
			resize();
			//根据窗口大小自动重置图片容器高度
			window.onresize = function(){
				resize();
			};
		},
		//将DOM渲染至页面
		render: function(options){
			var that = this,
				flag = true;//标识数据加载完毕
			$.getJSON(options.dataPath, function(data){
			//创建文档碎片 减少重排次数
				var temp = document.createDocumentFragment(),
					length = that.index + options.page,
					maxLength;
					maxLength = length >= data.length ? data.length : length;
				
				function load(){
					for(var i=that.index; i<maxLength; i++){
						$(_.template(options.template)(data[i])).appendTo(temp);
					}
					$(options.container).append(temp);
					that.init();
					that.index += options.page;
				}
			    if(options.destroy){
			  	  console.log("开始加载新的数据");	  	  
			  	  options.destroy();
			  	  load();
			  	  if(length >= data.length){
			  	  	flag = false;
			  	  }
			  	  options.create(flag);
			    }else{
			  	  console.log("第一次加载数据");
			  	  load();
			  	  options.create(flag);
			    }
			});	
		}
	};
	return 	Loading;
});