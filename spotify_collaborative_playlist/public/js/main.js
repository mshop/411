$(document).ready(function() {

  // Place JavaScript code here...

});

var app = angular.module('searchApp', []);

app.controller('searchController', function($scope, $http) {
    // get songs in queue
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
    // add song to queue
    $scope.addSong = function(trackid, partyid) {

        console.log('/party/' + partyid + '/' + trackid);

        $http.post('/party/' + partyid + '/' + trackid).success(function (data, status) {
            $http.get('/api/party/' + partyid).success(function (data, status) {
                $scope.partysongs = data;
                console.log(data);
            });
        });
    };

    //**NOTE: Something is wrong here possibly; once you press a button to upvote/downvote, it keeps calling get to itself,
    // causing it to keep updating and saving the field (even if no one clicks on it afterward)!
    // Not sure what the issue is; fix is needed...
    
    // vote up song in queue
    $scope.UpSong = function(trackid, partyid) {
        //console.log('/party/' + partyid + '/' + trackid);
        //console.log("VOTE UP");

        $http.get('/party/' + partyid + '/' + trackid+ '/' + '1').success(function (data, status) {
                $scope.partysongs = data;
                //console.log(data);

        });

    };

    // vote down song in queue
    $scope.DownSong = function(trackid, partyid) {
        //console.log('/party/' + partyid + '/' + trackid);
       // console.log("VOTE DOWN");

        $http.get('/party/' + partyid + '/' + trackid+ '/' + '-1').success(function (data, status) {
            $scope.partysongs = data;
            //console.log(data);

        });

    };

    // ** Bug: **
    // ** attendParty currently does not get called for some reason!
    $scope.attendParty = function(query) {

        console.log("query" + query);
        /*
        $http.post('/party/' + partyid + '/' + trackid).success(function (data, status) {
            $http.get('/api/party/' + partyid).success(function (data, status) {
                $scope.partysongs = data;
                console.log(data);
            });
        });
        */
        res.redirect('/party/' + query);
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