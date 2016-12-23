(function() {
    'use strict';
    angular
        .module('pazagatewayApp')
        .factory('Asset', Asset);

    Asset.$inject = ['$resource'];

    function Asset ($resource) {
        var resourceUrl =  'pazaassetbddsrv/' + 'api/assets/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
