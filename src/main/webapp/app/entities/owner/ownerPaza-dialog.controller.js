(function() {
    'use strict';

    angular
        .module('pazagatewayApp')
        .controller('OwnerPazaDialogController', OwnerPazaDialogController);

    OwnerPazaDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Owner'];

    function OwnerPazaDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Owner) {
        var vm = this;

        vm.owner = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.owner.id !== null) {
                Owner.update(vm.owner, onSaveSuccess, onSaveError);
            } else {
                Owner.save(vm.owner, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('pazagatewayApp:ownerUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
