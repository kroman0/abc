angular.module('project', ['resources']).
config(function($routeProvider) {
    $routeProvider.
    when('/projects', {
        controller: ProjectsCtrl,
        templateUrl: 'projects.html'
    }).
    otherwise({
        redirectTo: '/projects'
    });
});


function ProjectsCtrl($scope, Projects) {
    $scope.projects = Projects.query();
    $scope.fcompany = 0
    $scope.set_company = function(i){$scope.fcompany = i};
    $scope.fstatus = 'active';
    $scope.set_status = function(i){$scope.fstatus = i};
    $scope.groupBy = _.groupBy;
    $scope.companyName = function(list, id){return _.filter(list, function(item){return item.company.id==id})[0].company.name};
    $scope.groupByStatus = function(list){return _.groupBy(list, 'status')};
    $scope.statuses = function(list){return _.uniq(_.pluck(list, 'status'))};
    $scope.companies = function(list){return _.uniq(_.map(list, function(item){return item.company.id}))};
    $scope.groupByCID = function(list){return _.groupBy(list, function(item){return item.company.id})};
}

function NavCtrl($scope, Me) {
    $scope.me = Me.get();
    $scope.logged = function(me){return _.isFinite(me.id)};
    $scope.navitems = {
        projects: 'Projects',
        companies: 'Companies',
        todos: 'To-Dos',
        time_report: 'Time',
        people: 'People'
    };
    $scope.dropdownitems = {
        me: {icon: 'user', title: 'My profile'},
        todos: {icon: 'tasks', title: 'My todos'},
        time_report: {icon: 'time', title: 'My time'}
    };
}
