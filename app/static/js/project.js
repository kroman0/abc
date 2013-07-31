angular.module('project', ['ngRoute', 'resources']).
config(function($routeProvider) {
    $routeProvider.
    when('/projects', {
        controller: ProjectsCtrl,
        templateUrl: 'projects.html'
    }).
    when('/projects-:filter', {
        controller: ProjectsCtrl,
        templateUrl: 'projects.html'
    }).
    when('/companies', {
        controller: CompaniesCtrl,
        templateUrl: 'companies.html'
    }).
    when('/companies/:id', {
        controller: CompanyCtrl,
        templateUrl: 'company.html'
    }).
    when('/todos', {
        controller: TodosCtrl,
        templateUrl: 'todos.html'
    }).
    when('/time_report', {
        controller: TimeReportCtrl,
        templateUrl: 'time-report.html'
    }).
    when('/people', {
        controller: PeopleCtrl,
        templateUrl: 'people.html'
    }).
    when('/people_c:fcompany', {
        controller: PeopleCtrl,
        templateUrl: 'people.html'
    }).
    otherwise({
        redirectTo: '/projects'
    });
}).run(function($rootScope, Me, Projects, Companies, People) {
    $rootScope.TITLE = '';
    $rootScope.me = Me.get();
    $rootScope.projects = Projects.query();
    $rootScope.companies = Companies.query();
    $rootScope.people = People.query();
});


function ProjectsCtrl($scope, $routeParams) {
    var filter = $routeParams.filter,
        pfilter = filter && filter.split('-');
    $scope.$root.TITLE = 'Projects';
    $scope.fcompany = pfilter ? pfilter[1] : $scope.projects[0].company.id;
    $scope.fstatus = pfilter ? pfilter[0] : $scope.projects[0].status;
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

function CompaniesCtrl($scope) {
    $scope.$root.TITLE = 'Companies';
}

function CompanyCtrl($scope, $routeParams) {
    var id = $scope.cid = parseInt($routeParams.id, 10),
        fcompany = _.where($scope.companies, {id: id}),
        company = $scope.model = fcompany ? fcompany[0] : $scope.companies[id];
    $scope.$root.TITLE = $scope.title = company && company.name;
}

function PeopleCtrl($scope, $routeParams) {
    $scope.$root.TITLE = 'People';
    $scope.fcompany = $routeParams.fcompany ? $routeParams.fcompany : $scope.people[0]['company-id']
}

function TodosCtrl($scope, Todos) {
    $scope.$root.TITLE = 'Todos';
    $scope.todos = Todos.query();
    $scope.party = _.first(_.filter($scope.people, function(i){return i.id==$scope.$root.me.id}));
    $scope.projectids = function(list) {
        return _.uniq(_.pluck(list, 'project-id'));
    };
    $scope.title = function(party) {
        var tt = 'To-dos';
        if (party) {
            tt = party['first-name']+' '+party['last-name'] + "'s to-dos";
        }
        if (party && party.id == $scope.$root.me.id) {
            tt = 'My to-dos';
        }
        if (!party) {
            tt = 'Unassigned to-dos';
        }
        $scope.$root.TITLE = tt;
        return tt;
    };
    $scope.description = function(party) {
        if (party && party.id == $scope.$root.me.id) {
            return 'My';
        }
        if (party) {
            return party['first-name']+' '+party['last-name']+"'s";
        }
        if (!party) {
            return 'Unassigned';
        }
        return 'All';
    };
}

function TimeReportCtrl($scope, TimeReport) {
    $scope.$root.TITLE = 'Time report';
    $scope.timereport = TimeReport.query();
    $scope.filter = {};
    $scope.times = function(list, id) {
        return _.reduce(_.map(_.where(list, {"project-id":id}),function(i){return i.hours;}),function(memo, num) { return memo + num; }, 0);
    };
}

function NavCtrl($scope) {
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
