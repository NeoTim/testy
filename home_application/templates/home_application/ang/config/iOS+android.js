//iOS+android.js : configurations of android and iOS, Define default platform configurations
// angular.module is a global place for creating, registering and retrieving Angular modules
// create the module   add the modules  depends on

angular.module('TML').config([
  //"$httpProvider",
  // Ionic automatically takes platform configurations into account to adjust things like what transition style to use and whether tab icons should show on the top or bottom.
  "$ionicConfigProvider",
  function(
    //$httpProvider,
    $ionicConfigProvider) {
    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);
    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */
    // if none of the above states are matched, use this as the fallback
    // $urlRouterProvider.otherwise('/app/login');

    // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    // $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript, */*; q=0.01';//no need
    // $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';//no need

    //$httpProvider.defaults.timeout = 10000;
    // Maximum number of view elements to cache in the DOM.
    // $ionicConfigProvider.views.maxCache(5);
    // Back button text.
    $ionicConfigProvider.backButton.text('Return');
    $ionicConfigProvider.backButton.previousTitleText("");

    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');

  }
]);



/*
TML.Config(function(config){

  $ionicConfigProvider.views.maxCache(0);
  $ionicConfigProvider.backButton.text('Return');
  $ionicConfigProvider.backButton.previousTitleText("");

  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');

  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');
});

TML.Config=function(f){
  angular.module('TML').config(["$ionicConfigProvider",
    function(
      $ionicConfigProvider) {
        f($ionicConfigProvider);
      }]);
};


*/
