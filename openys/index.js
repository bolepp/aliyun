var http = require('http');
var https = require('https');
var querystring = require('querystring');
var iconv = require('iconv-lite');
var postData= querystring.stringify({
	
	'accessToken':'at.89rfc4jf5nrapbqv6s5rmuwra8tcjtle-51biy2ki4b-1mg3dwh-3sqv1qxbq',
	'source':'C03753323:1'
	
})

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

// https.get(url,function(res){
// 	res.on('data',function(data){
// 		console.log("获取数据"+data);
// 	})
// });
http
.createServer(function(httpreq,httpres) {

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
       httpres.writeHead(200,{'Content-Type':'text/html'});
        httpres.write(str);
      	 httpres.end();
	})

	
})
req.on('error',function(e){
		console.log('异常'+e);
	})

req.write(postData);

	req.end();

})
.listen(3000);


