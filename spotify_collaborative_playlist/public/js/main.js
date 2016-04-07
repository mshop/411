$(document).ready(function() {

  // Place JavaScript code here...

});

var app = angular.module('searchApp', []);

app.controller('searchController', function($scope, $http) {

    $scope.getSongs = function() {
        $http.get('/search?query=' + $scope.query).success(function (data, status) {
            $scope.tracks = data;
        }).error( function(data, status) {
            $scope.tracks = "Error";
        });
    };

    $scope.$watch("query", function(){
        if ($scope.query.length > 0) {
            $scope.getSongs();
        }
    });

    // $scope.getResutls = function () {
    //     var request = {
    //         method: 'post',
    //         url: '/',
    //         data: {
    //             query: $scope.query
    //         }
    //     }
    // };
    // $http(request)
    //     .then(function (response) {
    //         $scope.tracks = response.data;
    //     });
});