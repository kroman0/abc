angular.module('resources', ['ngResource']).
factory('Projects', function($resource) {
    var Projects = $resource('api/projects.xml');
    return Projects;
}).
factory('Me', function($resource) {
    var Me = $resource('api/me.xml');
    return Me;
});
