(function() {
    'use strict';

    angular
        .module('pazagatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('ownerPaza', {
            parent: 'entity',
            url: '/ownerPaza',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'pazagatewayApp.owner.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/owner/ownersPaza.html',
                    controller: 'OwnerPazaController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('owner');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('ownerPaza-detail', {
            parent: 'entity',
            url: '/ownerPaza/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'pazagatewayApp.owner.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/owner/ownerPaza-detail.html',
                    controller: 'OwnerPazaDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('owner');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Owner', function($stateParams, Owner) {
                    return Owner.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'ownerPaza',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('ownerPaza-detail.edit', {
            parent: 'ownerPaza-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/owner/ownerPaza-dialog.html',
                    controller: 'OwnerPazaDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Owner', function(Owner) {
                            return Owner.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('ownerPaza.new', {
            parent: 'ownerPaza',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/owner/ownerPaza-dialog.html',
                    controller: 'OwnerPazaDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                ecert: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('ownerPaza', null, { reload: 'ownerPaza' });
                }, function() {
                    $state.go('ownerPaza');
                });
            }]
        })
        .state('ownerPaza.edit', {
            parent: 'ownerPaza',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/owner/ownerPaza-dialog.html',
                    controller: 'OwnerPazaDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Owner', function(Owner) {
                            return Owner.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('ownerPaza', null, { reload: 'ownerPaza' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('ownerPaza.delete', {
            parent: 'ownerPaza',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/owner/ownerPaza-delete-dialog.html',
                    controller: 'OwnerPazaDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Owner', function(Owner) {
                            return Owner.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('ownerPaza', null, { reload: 'ownerPaza' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
