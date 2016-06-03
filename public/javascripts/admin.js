angular.module('admin', ['ui.router', 'controllers', 'services'])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: '/admin/templates/login',
        controller: 'LoginController'
    }).state('admin', {
        url: '/',
        abstract: true,
        templateUrl: '/admin/templates/panel',
        controller: 'MainController'
    }).state('admin.home', {
        url: '',
        templateUrl: '/admin/templates/home',
        controller: 'HomeController'
    }).state('admin.posts', {
        url: 'posts',
        templateUrl: '/admin/templates/posts',
        controller: 'PostsController'
    }).state('admin.edit', {
        url: 'posts/:postid',
        templateUrl: '/admin/templates/post-edit',
        controller: 'EditPostController'
    }).state('admin.media', {
        url: 'media',
        templateUrl: '/admin/templates/media',
        controller: 'MediaController'
    }).state('admin.settings', {
        url: 'settings',
        templateUrl: '/admin/templates/settings',
        controller: 'SettingsController'
    });
}])
.run(['$rootScope', '$state', 'StorageService', 'SessionService', 'APIService', function ($rootScope, $state, StorageService, SessionService, APIService) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {
        if (SessionService.isLoggedIn()) {
            if (toState.name === 'login') {
                event.preventDefault();
                $state.go('admin.home');
            }
        } else {
            if (toState.name !== 'login') {
                event.preventDefault();
                $state.go('login');
            }
        }
    });
    var token = StorageService.getItem('token');
    var userid = StorageService.getItem('userid');
    console.log(token + ' ' + userid);
    if (token.length > 0 && userid.length > 0) {
        console.log('logged');
        APIService.setToken(token);
        APIService.setUserid(userid);
        SessionService.setState(SessionService.LOGGED_IN);
        $state.go('admin.home');
    }
}]);
