(function() {
    'use strict';

    angular
        .module('pazagatewayApp')
        .controller('AssetPazaDeleteController',AssetPazaDeleteController);

    AssetPazaDeleteController.$inject = ['$uibModalInstance', 'entity', 'Asset'];

    function AssetPazaDeleteController($uibModalInstance, entity, Asset) {
        var vm = this;

        vm.asset = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Asset.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
