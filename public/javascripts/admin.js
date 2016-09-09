angular.module('admin', ['ui.router', 'controllers', 'services'])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: '/templates/login',
        controller: 'LoginController'
    }).state('admin', {
        url: '/',
        abstract: true,
        templateUrl: '/templates/panel',
        controller: 'MainController'
    }).state('admin.home', {
        url: '',
        templateUrl: '/templates/home',
        controller: 'HomeController'
    }).state('admin.posts', {
        url: 'posts',
        templateUrl: '/templates/posts',
        controller: 'PostsController'
    }).state('admin.edit', {
        url: 'posts/:postid',
        templateUrl: '/templates/post-edit',
        controller: 'EditPostController'
    }).state('admin.media', {
        url: 'media',
        templateUrl: '/templates/media',
        controller: 'MediaController'
    }).state('admin.settings', {
        url: 'settings',
        templateUrl: '/templates/settings',
        controller: 'SettingsController'
    }).state('admin.user', {
        url: 'user',
        templateUrl: '/templates/user-edit',
        controller: 'UserEditController'
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
    var role = StorageService.getItem('role');
    if (token.length > 0 && userid.length > 0 && role.length > 0 && role === 'admin') {
        APIService.setToken(token);
        APIService.setUserid(userid);
        SessionService.setState(SessionService.LOGGED_IN);
        $state.go('admin.home');
    }
}]);
