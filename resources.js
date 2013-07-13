angular.module('resources', ['ngResource']).
factory('Projects', function($resource) {
    var Projects = $resource('api/projects.xml');
    return Projects;
}).
factory('Companies', function($resource) {
    var Companies = $resource('api/companies.xml');
    return Companies;
}).
factory('Me', function($resource) {
    var Me = $resource('api/me.xml');
    return Me;
});
