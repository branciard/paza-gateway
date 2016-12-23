(function() {
    'use strict';

    angular
        .module('pazagatewayApp')
        .controller('OwnerPazaDeleteController',OwnerPazaDeleteController);

    OwnerPazaDeleteController.$inject = ['$uibModalInstance', 'entity', 'Owner'];

    function OwnerPazaDeleteController($uibModalInstance, entity, Owner) {
        var vm = this;

        vm.owner = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Owner.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
