var app = angular.module('StarterApp', ['ngMaterial', 'firebase','angularMoment']);

app.controller('AppCtrl', ['$scope', '$firebaseArray', '$mdToast',  function($scope, $firebaseArray, $mdToast) {
  var ref = new Firebase("https://nutraiohit.firebaseIO.com/workouts");
  $scope.orderByField = '-published_at';
  $scope.reverseSort = false;
  $scope.loaded = false;
  $scope.add = false;
  var list = $firebaseArray(ref);
                           
// Set any value to account and save
// account.name = 'changed name';
  list.$loaded()
    .then(function(result) {
      $scope.list = result;
      $scope.loaded = true;
      $mdToast.show(
        $mdToast.simple()
        .content("List Loaded")
        .hideDelay(3000)
      );                           
    })
    .catch(function(error) {
      $mdToast.show(
        $mdToast.simple()
        .content("Error:", error)
        .hideDelay(3000)
      );
    });

  $scope.deleteFromList = function(item) {
    $scope.list.$remove(item).then(function(record) {
      $mdToast.show(
        $mdToast.simple()
        .content(item.data + ' was deleted from the list')
        .hideDelay(3000)
      );
    });
  }

                           
  $scope.addToList = function(item) {
    $scope.list.$add(item).then(function(record) {
      $scope.add = false;
      $mdToast.show(
        $mdToast.simple()
        .content(item.data + ' was added to the list')
        .hideDelay(3000)
      );
    });
  }
                           ref.on('value', function(dataSnapshot) {
$mdToast.show(
        //$mdToast.simple()
        //.content("List just updated")
        //.hideDelay(3000)
      ); 
});
ref.on('child_added', function(childSnapshot, prevChildKey) {
        $scope.orderByField = '-published_at';                       
        $mdToast.show(                           
        $mdToast.simple()
        .content("New Tag Added")
        .hideDelay(3000)
      ); 
});
ref.on('child_removed', function(childSnapshot, prevChildKey) {
$mdToast.show(                           
        $mdToast.simple()
        .content("Tag removed")
        .hideDelay(3000)
      ); 
});  
}]);