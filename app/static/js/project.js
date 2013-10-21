angular.module('project', ['ngRoute', 'resources']).
config(function($routeProvider) {
    $routeProvider.
    when('/projects', {
        controller: ProjectsCtrl,
        templateUrl: '/static/templates/projects.html'
    }).
    when('/companies', {
        controller: CompaniesCtrl,
        templateUrl: '/static/templates/companies.html'
    }).
    when('/companies/:id', {
        controller: CompanyCtrl,
        templateUrl: '/static/templates/company.html'
    }).
    when('/todos', {
        controller: TodosCtrl,
        templateUrl: '/static/templates/todos.html'
    }).
    when('/time_report', {
        controller: TimeReportCtrl,
        templateUrl: '/static/templates/time-report.html'
    }).
    when('/people', {
        controller: PeopleCtrl,
        templateUrl: '/static/templates/people.html'
    }).
    when('/people/:id', {
        controller: PersonCtrl,
        templateUrl: '/static/templates/person.html'
    }).
    when('/me', {
        controller: MeCtrl,
        templateUrl: '/static/templates/person.html'
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
    $scope.$root.TITLE = 'Projects';
    $scope.fcompany = $scope.projects.length ? $scope.projects[0].company.id : 0;
    $scope.fstatus = $scope.projects.length ? $scope.projects[0].status : 'active';
    $scope.companyName = function(list, id) {
        return _.first(_.filter(list, function(item) {
            return item.company.id == id;
        })).company.name;
    };
    $scope.setfs = function(status) {
        $scope.fstatus = status
    };
    $scope.setfc = function(cid) {
        $scope.fcompany = cid
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
    $scope.$root.TITLE = $scope.title = company && company.name + ' - Companies';
}

function PeopleCtrl($scope, $routeParams) {
    $scope.$root.TITLE = 'People';
    $scope.fcompany = $scope.people.length ? $scope.people[0]['company-id'] : 0;
    $scope.setfc = function(cid) {
        $scope.fcompany = cid
    };
}

function PersonCtrl($scope, $routeParams) {
    var id = $scope.cid = parseInt($routeParams.id, 10),
        fperson = _.where($scope.people, {id: id}),
        person = $scope.item = fperson ? fperson[0] : $scope.people[id];
    $scope.$root.TITLE = $scope.title = person && person['first-name'] + ' ' + person['last-name'] + ' - People';
}

function MeCtrl($scope, $routeParams) {
    var person = $scope.item = $scope.me;
    $scope.$root.TITLE = $scope.title = person && person['first-name'] + ' ' + person['last-name'] + ' - People';
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
