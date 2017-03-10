$(function(){
	$.fn.extend({
	    webuploader:function(config){
	    	var uploader,

	    		// 配置项
	    		config = config,

			  	// 进度条
			  	percentageDiv,

			  	// 上传成功文件的response数据缓存
			  	responseCache = [],

			  	// webuploader
			  	_this = this;

	    	// 实例化
			uploader = WebUploader.create({
			    pick: config.pick?config.pick:{},
			    formData: config.formData?config.formData:{},
			    swf: config.swf?config.swf:'../../dist/Uploader.swf',
			    chunked: config.chunked?config.chunked:false,
			    chunkSize: config.chunkSize?config.chunkSize:512 * 1024,
			    server: config.server?config.server:'../../server/v2.php',
			    disableGlobalDnd: true,
			    fileNumLimit: 300,
			    fileSizeLimit: 200 * 1024 * 1024,    // 200 M
			    fileSingleSizeLimit: 50 * 1024 * 1024    // 50 M
			});

			/**
			 * input发生变化时
			 * @param  {[type]} file [description]
			 * @return {[type]}      [description]
			 */
	        uploader.onFileQueued = function( file ) {
	        	responseCache.splice(0, responseCache.length); // 清空数组
	        	$(percentageDiv).find("span").css('width','0%');
	        	$(percentageDiv).show();
	        	$(config.pick.id).find("input").attr("disabled",true);
			    uploader.upload();
			};

			/**
			 * 上传进度监听
			 * @param  {[type]} file       [description]
			 * @param  {[type]} percentage [description]
			 * @return {[type]}            [description]
			 */
			uploader.onUploadProgress = function( file, percentage ) {
	            $(percentageDiv).find("span").css( 'width', percentage * 100 + '%' );
	        };

	        /**
	         * 文件上传错误
	         * @param  {[type]} code [description]
	         * @return {[type]}      [description]
	         */
	        uploader.onError = function( code ) {
	        	if(config.error){
	        		config.error(code);
	        	}else{
	        		alert( 'Eroor: ' + code );
	        	}
	        };

	        /**
	         * 上传成功后执行
	         * @param  {[type]} file     [description]
	         * @param  {[type]} response [description]
	         * @return {[type]}          [description]
	         */
	        uploader.onUploadSuccess = function(file, response){
	        	if(response.status == 200 && response.data){
	        		responseCache.push(response.data);
	        	}
	        }

	        /**
	         * 当所有文件上传完成后执行操作
	         * @return {[type]} [description]
	         */
	        uploader.onUploadFinished = function(){
	        	setTimeout(function(){
	        		$(config.pick.id).find("input").attr("disabled",false);    
	            	if(config.success){
	            		config.success(responseCache);
	            		console.log(responseCache);
	            	}else{
	            		alert('上传成功');
	            	}
	            	$(percentageDiv).hide();
	            },1000);
	        }

	        /**
	         * 初始化上传所需要的辅助程序
	         * @param  {[type]} config [description]
	         * @return {[type]}        [description]
	         */
			this.init = function(config){
				// 上传进度
				percentageDiv = document.createElement("div");
				percentageDiv.setAttribute("style","height:5px;width:300px;border-radius:5px;background:#eee;position:relative;overflow:hidden;display:none;");
				percentageDiv.className = "webuploader-percentage";
				percentageDiv.innerHTML = '<span style="width:0%;height:5px;position:absolute;background:#333;border-radius:5px;display:block;transition: width 1s;-moz-transition: width 1s;-webkit-transition: width 1s;-o-transition: width 1s;"></span>';
				$(config.pick.id).after(percentageDiv);
			}

			this.init(config);
	    }
	});
})