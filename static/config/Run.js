//Run.js : Automatically run after all things done
angular.module('TML').run(["$ionicPlatform", "$ionicHistory", function($ionicPlatform, $ionicHistory) {
  // $scope.$on('$ionicView.enter', function() {    });
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    // Check if the user uses mobile
    // If yes, hide the accessory bar by default
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    // Check if browser has status bar
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    };
    // $ionicHistory.clearCache();
  });
}]);
