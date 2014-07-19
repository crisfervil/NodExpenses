define(function (require) {

    var http = require('plugins/http');

    return {
        getExpenses: function (period, skip) {
            if (!skip) skip = 0;
            var url = '/expenses?skip=' + skip + '&period=' + period;
            return http.jsonp(url, null, 'callback').then(function (data) {
                return data;
            });
        },
        getById: function (id) {
            var url = '/expenses/' + id;
            return http.jsonp(url, null, 'callback').then(function (data) {
                var item = data? (data[0]?data[0]:null):null;
                return item;
            });
        }
    };
});