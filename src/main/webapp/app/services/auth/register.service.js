(function () {
    'use strict';

    angular
        .module('pazagatewayApp')
        .factory('Register', Register);

    Register.$inject = ['$resource'];

    function Register ($resource) {
        return $resource('pazauaa/api/register', {}, {});
    }
})();
