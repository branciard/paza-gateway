(function() {
    'use strict';

    angular
        .module('pazagatewayApp')
        .controller('OwnerPazaDetailController', OwnerPazaDetailController);

    OwnerPazaDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Owner'];

    function OwnerPazaDetailController($scope, $rootScope, $stateParams, previousState, entity, Owner) {
        var vm = this;

        vm.owner = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('pazagatewayApp:ownerUpdate', function(event, result) {
            vm.owner = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
