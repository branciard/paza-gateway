(function() {
    'use strict';

    angular
        .module('pazagatewayApp')
        .controller('AssetPazaDetailController', AssetPazaDetailController);

    AssetPazaDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Asset'];

    function AssetPazaDetailController($scope, $rootScope, $stateParams, previousState, entity, Asset) {
        var vm = this;

        vm.asset = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('pazagatewayApp:assetUpdate', function(event, result) {
            vm.asset = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
