var express=require('express');
var app =express();
var https = require('https');
var querystring = require('querystring');
var iconv = require('iconv-lite');
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

var options={
	hostname:'open.ys7.com',	
	path:'/api/lapp/live/address/get',
	method:'POST',
	headers:{
		'POST':'/api/lapp/device/info HTTP/1.1',
		'Host':'open.ys7.com',
		'Content-Type':'application/x-www-form-urlencoded',
		'accessToken':'at.89rfc4jf5nrapbqv6s5rmuwra8tcjtle-51biy2ki4b-1mg3dwh-3sqv1qxbq'
	}
}
//设置跨域访问
app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   res.header("Content-Type", "application/json;charset=utf-8");
   next();
});

function myRequest(postData,exres){
var req= https.request(options,function (res) {			
		console.log('Status:'+res.statusCode);
		var datas = [];
	    var size = 0;
		res.on('data',function (data) {
			datas.push(data);
	     	size += data.length;		
		})
			res.on('end',function(){
				var buff = Buffer.concat(datas, size);
		        var str = iconv.decode(buff,'utf-8');
		        console.log(str);
		    	 exres.status(200),
				//exres.json(buff.toString());
				 exres.send(str);
			})
	})
	req.on('error',function(e){
			console.log('异常'+e);
		})
		var queryData=querystring.stringify(postData);
		req.write(queryData);
		req.end();
}

//获取直播流接口
app.post('/openys',function(exreq,openys){
	var postData= {};
	console.log('直播流'+new Date(),exreq.body);
	postData.accessToken=exreq.body.accessToken;
	postData.source=exreq.body.sourceEquNum+':'+exreq.body.sourcePass;
	options.path='/api/lapp/live/address/get';
	myRequest(postData,openys);
	
});

//获取获取accessToken接口
app.post('/token',function(exreq,token){
	var postData= {};
	console.log('获取accessToken'+new Date(),exreq.body);
	postData.appKey=exreq.body.appKey;
	postData.appSecret=exreq.body.appSecret;
	options.path='/api/lapp/token/get';
	myRequest(postData,token);
	
});





//配置服务端口
var server = app.listen(3000, function () {
var host = server.address().address;
 var port = server.address().port;
    console.log('listening at http://%s:%s', host, port);
})