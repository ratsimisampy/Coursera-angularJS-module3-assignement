(function() {
'use strict';

angular.module('NarrowItDownApp',[])

.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('urlPath',"https://davids-restaurant.herokuapp.com/menu_items.json");
// .factory()
// .directive()

NarrowItDownController.$inject = ['MenuSearchService','$scope'];
function NarrowItDownController (MenuSearchService,$scope){
  var list = this;
  $scope.searchString = "";

  $scope.displayFound = function(){

  var promise = MenuSearchService.getAllMenuItems() ;

  promise.then(function(response){
    list.found = response.data;

  })
  .then( //Loop for search
  function(){
    var foundItems = [];

    for(var i=0; i<list.found.menu_items.length; i++ ){
      if (list.found.menu_items[i].description.indexOf($scope.searchString) > 0) {
        foundItems.push(list.found.menu_items[i]) ;
          console.log(list.found.menu_items[i]);
      }
    }
    list.foundFiltered = foundItems;
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });
}
}

//Service
MenuSearchService.$inject = [ '$http','urlPath'];
function MenuSearchService($http, urlPath){
var service = this ;

service.getAllMenuItems = function(){
  var response = $http({
      method: "GET",
      url: (urlPath)
  } );

  return response;
};



}

})();
