(function() {
    'use strict';
    angular
        .module('pazagatewayApp')
        .factory('Owner', Owner);

    Owner.$inject = ['$resource'];

    function Owner ($resource) {
        var resourceUrl =  'pazauaa/' + 'api/owners/:id';

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
