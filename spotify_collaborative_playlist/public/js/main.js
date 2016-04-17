$(document).ready(function() {

  // Place JavaScript code here...

});

var app = angular.module('searchApp', []);

app.controller('searchController', function($scope, $http) {

    $scope.getSongs = function() {
        $http.get('/api/search?query=' + $scope.query).success(function (data, status) {
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

    $scope.addSong = function(trackid, partyid) {

        console.log('/party/' + partyid + '/' + trackid);

        $http.post('/party/' + partyid + '/' + trackid).success(function (data, status) {
            $http.get('/api/party/' + partyid).success(function (data, status) {
                $scope.partysongs = data;
                console.log(data);
            });
        });
    };

           // $scope.$broadcast("myEvent", trackid );
           // $window.location.href = '/signin';  -- for redirect
        /*
            $http.get('http://localhost:3000/dowork',{params:{"param1": trackid }}).success(function(data){
                console.log("yay");

            });

        */

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