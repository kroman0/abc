angular.module('project', ['resources']).
config(function($routeProvider) {
    $routeProvider.
    when('/projects', {
        controller: ProjectsCtrl,
        templateUrl: 'projects.html'
    }).
    when('/companies', {
        controller: CompaniesCtrl,
        templateUrl: 'companies.html'
    }).
    otherwise({
        redirectTo: '/projects'
    });
}).run(function($rootScope) {
    $rootScope.TITLE = '';
});


function ProjectsCtrl($scope, Projects) {
    $scope.$root.TITLE = 'Projects';
    $scope.projects = Projects.query();
    $scope.fcompany = 0;
    $scope.set_company = function(i) {$scope.fcompany = i};
    $scope.fstatus = 'active';
    $scope.set_status = function(i) {$scope.fstatus = i};
    $scope.companyName = function(list, id) {
        return _.first(_.filter(list, function(item) {
            return item.company.id == id;
        })).company.name;
    };
    $scope.statuses = function(list) {
        return _.uniq(_.pluck(list, 'status'));
    };
    $scope.companies = function(list) {
        return _.uniq(_.map(list, function(item) {
            return item.company.id;
        }));
    };
}

function CompaniesCtrl($scope, Companies) {
    $scope.$root.TITLE = 'Companies';
    $scope.companies = Companies.query();
}

function NavCtrl($scope, Me) {
    $scope.me = Me.get();
    $scope.logged = function(me) {return _.isFinite(me.id)};
    $scope.navitems = [
        {id: 'projects', title: 'Projects'},
        {id: 'companies', title: 'Companies'},
        {id: 'todos', title: 'To-Dos'},
        {id: 'time_report', title: 'Time'},
        {id: 'people', title: 'People'}
    ];
    $scope.dropdownitems = [
        {id: 'me', icon: 'user', title: 'My profile'},
        {id: 'todos', icon: 'tasks', title: 'My todos'},
        {id: 'time_report', icon: 'time', title: 'My time'}
    ];
}
