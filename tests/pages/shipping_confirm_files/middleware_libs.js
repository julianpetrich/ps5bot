$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}

var http = {
  	baseUrl: ['https://store.sony.co.th', 'apps/middleware_api'].join('/'),
  	sendReq: function(url, method, content) {
    	var reqOpt = {
            type: method,
          	url: [this.baseUrl, url].join('/'),
          	headers: {
              'Token': 'u8yXXMCf3GoFpBHJ9wCIagnQ5whpKL9M'
          	},
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        };

        if (method.toLowerCase() !== 'get')
            reqOpt['data'] = JSON.stringify(content);

        var def = $.Deferred();
        $.ajax(reqOpt).done(function (res) {
            def.resolve(res);
        }).fail(function (ex) {
            console.log(ex);
        });

        return def.promise();
  	},
    get: function (url) {
//       	console.log(url);
        return this.sendReq(url, 'get');
    },
    post: function (url, content) {
        return this.sendReq(url, 'post', content);
    },
    put: function (url, content) {
        return this.sendReq(url, 'put', content);
    },
    delete: function (url, content) {
        return this.sendReq(url, 'delete', content);
    }
}