(function() {
    'use strict';

    angular
        .module('pazagatewayApp')
        .controller('AssetPazaController', AssetPazaController);

    AssetPazaController.$inject = ['$scope', '$state', 'Asset', 'ParseLinks', 'AlertService'];

    function AssetPazaController ($scope, $state, Asset, ParseLinks, AlertService) {
        var vm = this;

        vm.assets = [];
        vm.loadPage = loadPage;
        vm.page = 0;
        vm.links = {
            last: 0
        };
        vm.predicate = 'id';
        vm.reset = reset;
        vm.reverse = true;

        loadAll();

        function loadAll () {
            Asset.query({
                page: vm.page,
                size: 20,
                sort: sort()
            }, onSuccess, onError);
            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }

            function onSuccess(data, headers) {
                //issue TypeError: Cannot read property 'length' of null whith jhipster enties generated
                var linksToParse= headers('link');
                if(!jQuery.isEmptyObject(linksToParse)){
                    vm.links = ParseLinks.parse(linksToParse);
                }
                vm.totalItems = headers('X-Total-Count');
                for (var i = 0; i < data.length; i++) {
                    vm.assets.push(data[i]);
                }
            }

            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

        function reset () {
            vm.page = 0;
            vm.assets = [];
            loadAll();
        }

        function loadPage(page) {
            vm.page = page;
            loadAll();
        }
    }
})();
