(function() {
    'use strict';

    angular
        .module('pazagatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('assetPaza', {
            parent: 'entity',
            url: '/assetPaza',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'pazagatewayApp.asset.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/asset/assetsPaza.html',
                    controller: 'AssetPazaController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('asset');
                    $translatePartialLoader.addPart('assetStatus');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('assetPaza-detail', {
            parent: 'entity',
            url: '/assetPaza/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'pazagatewayApp.asset.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/asset/assetPaza-detail.html',
                    controller: 'AssetPazaDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('asset');
                    $translatePartialLoader.addPart('assetStatus');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Asset', function($stateParams, Asset) {
                    return Asset.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'assetPaza',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('assetPaza-detail.edit', {
            parent: 'assetPaza-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/asset/assetPaza-dialog.html',
                    controller: 'AssetPazaDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Asset', function(Asset) {
                            return Asset.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('assetPaza.new', {
            parent: 'assetPaza',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/asset/assetPaza-dialog.html',
                    controller: 'AssetPazaDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                status: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('assetPaza', null, { reload: 'assetPaza' });
                }, function() {
                    $state.go('assetPaza');
                });
            }]
        })
        .state('assetPaza.edit', {
            parent: 'assetPaza',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/asset/assetPaza-dialog.html',
                    controller: 'AssetPazaDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Asset', function(Asset) {
                            return Asset.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('assetPaza', null, { reload: 'assetPaza' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('assetPaza.delete', {
            parent: 'assetPaza',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/asset/assetPaza-delete-dialog.html',
                    controller: 'AssetPazaDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Asset', function(Asset) {
                            return Asset.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('assetPaza', null, { reload: 'assetPaza' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
