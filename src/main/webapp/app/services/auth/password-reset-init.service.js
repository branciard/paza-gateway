(function() {
    'use strict';

    angular
        .module('pazagatewayApp')
        .factory('PasswordResetInit', PasswordResetInit);

    PasswordResetInit.$inject = ['$resource'];

    function PasswordResetInit($resource) {
        var service = $resource('pazauaa/api/account/reset_password/init', {}, {});

        return service;
    }
})();
