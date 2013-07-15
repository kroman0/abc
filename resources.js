angular.module('resources', ['ngResource']).
factory('Projects', function($resource) {
    var Projects = $resource('api/projects.xml');
    return Projects;
}).
factory('People', function($resource) {
    var People = $resource('api/projects.xml');
    return People;
}).
factory('Todos', function($resource) {
    var Todos = $resource('api/projects.xml');
    return Todos;
}).
factory('Companies', function($resource) {
    var Companies = $resource('api/companies.xml');
    return Companies;
}).
factory('Me', function($resource) {
    var Me = $resource('api/me.xml');
    return Me;
});
