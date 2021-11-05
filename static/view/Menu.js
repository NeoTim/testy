$Do('Menu', function($page) {

//$page.title=TML.Say("TodoTit");//.+"("+tim.io.io.uri+")";
$page.bk=TML.bk;
$page.SignOut=function(){
  tim.Logout();
  $page.$Go('Login');
};

// $page.isExpanded = false;
// $page.hasHeaderFabLeft = false;
// $page.hasHeaderFabRight = false;

// $page.GetTable=function(tableName){
//   $page.$$childHead.$$childTail.GetTable(tableName);
//   // console.log($page.$$childHead.$$childTail.GetTable('user'));
// }

// $page.Main=function(Fn,params){
//   $page.$$childHead.$$childTail.$eval(Fn)(params);
// }

// $(".ion-navicon").on('click', function() {
//   this.toggleClass('active');
// });

// var navIcons = document.getElementsByClassName('ion-navicon');
// for (var i = 0; i < navIcons.length; i++) {
//     navIcons.addEventListener('click', function() {
//         this.classList.toggle('active');
//     });
// }

////////////////////////////////////////
// Layout Methods
////////////////////////////////////////

$page.hideNavBar = function() {
  $('ion-nav-bar').hide();
  // document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
};

$page.showNavBar = function() {

    $('ion-nav-bar').show();
  // document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
};

$page.noHeader = function() {

  $("scroll").removeClass('has-header');
  // var content = document.getElementsByTagName('scroll');
  // for (var i = 0; i < content.length; i++) {
  //     if (content[i].classList.contains('has-header')) {
  //         content[i].classList.toggle('has-header');
  //     }
  // }
};

$page.hasHeader = function() {
  $("scroll").addClass('has-header');
  // var content = document.getElementsByTagName('scroll');
  // for (var i = 0; i < content.length; i++) {
  //     if (!content[i].classList.contains('has-header')) {
  //         content[i].classList.toggle('has-header');
  //     }
  // }

};

$page.setExpanded = function(bool) {
  $page.isExpanded = bool;
};

$page.setHeaderFab = function(location) {
  var hasHeaderFabLeft = false;
  var hasHeaderFabRight = false;

  switch (location) {
    case 'left':
      hasHeaderFabLeft = true;
      break;
    case 'right':
      hasHeaderFabRight = true;
      break;
  }

  $page.hasHeaderFabLeft = hasHeaderFabLeft;
  $page.hasHeaderFabRight = hasHeaderFabRight;
};



$page.hideHeader = function() {
  $page.hideNavBar();
  $page.noHeader();
};

$page.showHeader = function() {
  $page.showNavBar();
  $page.hasHeader();
};


    // $page.clearFabs = function() {
    //   $('.button-fab').remove();
    //     // var fabs = document.getElementsByClassName('button-fab');
    //     // if (fabs.length && fabs.length > 1) {
    //     //     fabs[0].remove();
    //     // }
    // };
});
