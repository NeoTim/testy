$Do('Menu.List.NavBtn', angular.noop);

$Do('Menu.List.Main',
  function($page) {

    $Timer(function() {
    var cluster="\u6b27\u6d32datamore\u9884\u53d1\u5e03|欧洲datamore预发布(ssd17.datamore-EU-pre.lgameguigu.db.#50017)|zbintest(test.zbin.lgameguigu.db.#50018)|datamore预发布(ssd16.datamore-pre.lgameguigu.db.#50016)|法兰克福-datamore高配(ssd15.datamore-FKF.lgameguigu.db.#50015)|新加坡-硅谷-datamore应用指标相关(ssd14.datamoreAppSG.lgameguigu.db.#50014)|DataMore新加坡25TBQPS40万(ssd13.datamoreSG.lgameguigu.db.#50013)|gacc-好友关系链(ssd07.gaccchain.lgameguigu.db.#50007)|MSDK-token集群(ssd01.token.lgameguigu.db.#50001)|gacc-个人信息(ssd06.gaccperson.lgameguigu.db.#50006)|MSDK公告白名单集群(ssd03.white.lgameguigu.db.#50003)|MSDK公告集群(ssd02.gonggao.lgameguigu.db.#50002)|MSDK限频集群(ssd05.limit.lgameguigu.db.#50005)|MSDK云控模块(ssd00.yunkong.lgameguigu.db.#50000";
    cluster=cluster.split("|");
    $page.data=cluster;

    UpdateView();
      $page.$broadcast('scroll.refreshComplete');
      $page.$broadcast('scroll.infiniteScrollComplete');
    },1999);

    $page.Get = function(obj) {
      // console.log(obj);
      if (!obj) {
        $page.rs.data = [];
        // console.log($page.rs);
        obj = {};
      }
      if (obj.name) {
        $page.rs.data = [];
      }
      // $.Wait('w');
      // obj.del= {$nin:[true]};
      obj.del=true;
      obj.$sort = {
        ok: 1,
        sort: -1,
        _t: -1
      };
      // obj.$max=3;

    

      // tim.X('Tendis').Get(obj).then(function(rs) {
      //     // console.log(rs);
      //     if (rs.data.length < rs.max) {
      //       $page.rs.end = true;
      //     }
      //     $page.rs.data = $page.rs.data.concat(rs.data); //追加到后面
      //     $page.rs.sum = rs.sum;
          // UpdateView();
          // // $.Ok();
          // $Timer(function() {
          //   $page.$broadcast('scroll.refreshComplete');
          //   $page.$broadcast('scroll.infiniteScrollComplete');
          // });
      //   })
      //   .catch(function(err) {
      //     console.log(err);
      //     $.Err(err.message);
      //   })
    }

    $page.Search = function() {
      // if (Object.keys(tableObj).length>0) {
      //   value=JSON.stringify(tableObj).substr(1)
      //   .replace(/,/g,',\n').replace(/\}/g,',\n');
      // }else {
      //   value='';
      // }
      //
      // value+='"$max":3,\n'+
      // '        "_t": -1\n'+
      // '        },\n'+
      // '"$go":0,\n'+
      // '"$fit":'+JSON.stringify($page.fields)+',\n'+
      // '"$sip":"test"',

      $.Edit({
        title: 'search name',
        // row:Object.keys(tableObj).length+7,
        // value,
        submit: 'Search',
        same: true,
        Call: function(value) {
          // value='{'+value+'}';
          $page.Get({
            name: {
              "$regex": "/" + value + "/"
            }
          });
        }
      });

    };

    $page.rs = {
      data: [],
      Load: function() {
        // console.log($page.rs);
        // $page.rs.end = false;
        $Timer(function() {
          $page.Get({
            $go: $page.rs.data.length
          });

        }, 1e3, 'load');
      }
    };

    $page.CopyUrl = function() {
      $page.pop.hide();
      $.Edit({
        title: 'Task link',
        row: 5,
        value: location.origin + "/?" + $page.rs.data[$page.clickID]._id,
        submit: 'Copy',
        same: true,
        Call: function(value) {
          console.log(value);
        }
      });
    };
    $page.pop = $page.$menu.fromTemplate('<ion-popover-view>' +

      '<a class="item item-icon-left" ng-click=Edit()><i class="G7"> </i> {{"e info"|Say}}</a>' +
      '<a class="item item-icon-left" ng-click=CopyUrl()><i class="P9"> </i> {{"ScaleUp"|Say}}</a>' + 
      '<a class="item item-icon-left" ng-click=CopyUrl()><i class="AU"> </i> {{"ScaleDown"|Say}}</a>' +  
      '<a class="item item-icon-left" ng-click=CopyUrl()><i class="a5"> </i> {{"Decommission"|Say}}</a>' +  
      '</ion-popover-view>'

      , {
        scope: $page
      });

    $page.Menu = function(event, id) {

      if (id == undefined) {
        return;
      }
      $page.clickID = id;

      $page.pop.show(event);
    }


    $page.SetTop = function() {

      $page.pop.hide();
      if ($page.admin) {
        tim.X('task').Set($page.rs.data[$page.clickID]._id, {
          sort: Math.floor((((new Date()).getTime()) % (1e12)) / 1000)
        }).then(function(data) {
          // console.log(data);
        });
      }

      var item = $page.rs.data[$page.clickID];
      $page.rs.data.splice($page.clickID, 1);
      $page.rs.data.splice(0, 0, item);
      //
      // if ($page.top.top == 1) {
      //   tim.X('config').Set($page.top._id, $page.top);
      // } else {
      //   $page.top.top = 1;
      //   tim.X('config').New($page.top);
      // }

    }
 

    $page.CancelTop = function() {

      $page.pop.hide();
      if ($page.admin) {
        // tim.X('task').Set($page.rs.data[$page.clickID]._id, {
        //   sort: undefined
        // }).then(function(data) {
        //    console.log(data);
        // });
        // tim.X('task').ID($page.rs.data[$page.clickID]._id).then(function(data) {
        // console.log(data);
        $page.rs.data[$page.clickID].sort = undefined;
        // delete data.sort;
        // delete data._id;
        console.log($page.rs.data[$page.clickID]);
        tim.X('task').Mix($page.rs.data[$page.clickID]._id, $page.rs.data[$page.clickID]).then(function(data) {
          console.log(1, data);
        });
        // });
      }

      var item = $page.rs.data[$page.clickID];
      $page.rs.data.splice($page.clickID, 1);
      $page.rs.data.splice(10, 0, item);
      //
      // if ($page.top.top == 1) {
      //   tim.X('config').Set($page.top._id, $page.top);
      // } else {
      //   $page.top.top = 1;
      //   tim.X('config').New($page.top);
      // }

    }


    $page.ShowEdit = function(showEdit) {
      // console.log(showEdit);
      if (showEdit) {

        $(".item-options").removeClass("invisible");
      } else {

        $(".item-options").addClass("invisible");
      }
    } 

    // $page.$parent.showHeader();
    // $page.$parent.clearFabs();
    $page.$parent.setExpanded(false);

    $page.ShowReorder = function() {
      $page.showReorder = !$page.showReorder;
    }

    // // Set Motion
    // $page.$motion.fadeSlideInRight();
    //
    // // Set Ink
    // $page.$ink.displayEffect();



    $page.Edit = function() {
      $page.pop.hide();
      $page.$Go("Menu.Task", {
        location: "replace",
        data: $page.rs.data[$page.clickID]
      });
    };

    $page.sel = {
      all: false
    };
    $page.fields = [];



    $page.HideDel = function(value) {
      // $page.$parent.setHeaderFab('right');
      // // Delay expansion
      // $page.$parent.isExpanded = false;
      // $page.$parent.setExpanded(false);
      // $('.a5').removeClass('on');
    }


    $page.ShowDel = function(value) {
      // if (!value) {
      //   $page.sel.all = false;
      //   for (var i = 0; i < $page.rs.data.length; i++) {
      //     if ($page.rs.data[i]._check_box) {
      //       value = true;
      //       break;
      //     }
      //   }
      // } else {
      //   $page.sel.all = true;
      //   for (var i = 0; i < $page.rs.data.length; i++) {
      //     if (!$page.rs.data[i]._check_box) {
      //       $page.sel.all = false;
      //       break;
      //     }
      //   }
      // }
      // // console.log(value);
      // if (value) {
      //   // $page.sel.all = true;
      //   $page.$parent.setHeaderFab('left');
      //   // Delay expansion
      //   $page.$parent.isExpanded = true;
      //   $page.$parent.setExpanded(true);
      //   $('.a5').addClass('on');
      //
      //   // }, 900);
      // } else {
      //   $page.sel.all = false;
      //   $page.HideDel();
      // }
    }

    $page.SelectAll = function(value) {
      // console.log(value);
      $page.rs.data.map(function(e) {
        e.ok = value;
        // console.log(e);
        $page.Done(e)
      });
      // $page.ShowDel(value);
    }


    $page.Delete = function() {
      $page.pop.hide();


          // $.Wait('w');
          if ($page.admin) {
            console.log(1);
            //tim.X('task').Del($page.rs.data[$page.clickID]._id); //.then(function(){
            tim.X('task').Set($page.rs.data[$page.clickID]._id, {
              del: false
            }).then(function(d){
              console.log(d);
            });

          }
          // $.Ok();  });
          $page.rs.sum--;
          $page.rs.data.splice($page.clickID, 1);


          $page.HideDel();
    };

    $page.sel = {
      showTime: false
    };

    $page.ShowTime = function(e) {
      if ($page.sel.showTime) {

        return ("(" + $Sub(e._t) + ' - ' + (e.end ? $Sub(e.end) : TML.Say('present')) + ")");
      }
      // console.log(e.time?"aa":"ss");
      // console.log($Sub(e._t)+' - '+(e.time?$Sub(e.time):TML.Say('present')));
    }

    $page.Done = function(e) {
       console.log(e);
      // e.done=e.done?false:(new Date().getTime());
      if (!$page.admin) {
        //  $.Err("onlyadmin");
        return;
      }

      if (e.ok) {
        if (!e.end) {
          e.end = (new Date().getTime());
        }
      }
      //  else {
      //   e.end = undefined;
      // }

      tim.X('task').Set(e._id, {
        ok: e.ok,
        end: e.end
      })
    }

    // $page.MoveItem = function(item, fromIndex, toIndex) {
    //   // console.log(item, fromIndex, toIndex);
    //   $page.rs.data.splice(fromIndex, 1);
    //   $page.rs.data.splice(toIndex, 0, item);
    //   for (var i = 0; i < $page.rs.data.length; i++) {
    //     if ($page.rs.data[i].sort != i * 10) {
    //       tim.X('task').Set($page.rs.data[i]._id, {
    //         sort: i * 10
    //       })
    //     }
    //   }
    // };

    //    $page.Sub =  function (str,length) {
    //      // str=str.toString();
    //      length=length||20;
    //
    //      if (typeof str == 'object') {
    //        str = JSON.stringify(str);
    //      }
    //
    //      if ((str && str.length > length) ||(((typeof str == 'number')&&(str>1e10)))){
    //        var date = new Date(str).toLocaleDateString();
    // // console.log(str,date);
    //        if (date !== 'Invalid Date') {
    //          return date;
    //        }else {
    //          return str.substr(0, length) + "..."
    //        }
    //      }
    //        return str;
    //    };



    $page.Add = function() {

      $.Edit({
        title: 'new task name',
        // value,
        // row:Object.keys(tableObj).length,
        // same:true,
        // submit:'Add record',
        Call: function(value) {
          // value='{'+value+'}';
          $.Wait('w');
          try {
            // console.log(value);
            // value=JSON.parse(value);



            tim.X('task').New({
                name: value,
                work: (TML.bag._ == "work")
                //,user:TML.bag.id
              }).then(function(data) {
                console.log(data);
                $page.rs.data.unshift(data);
                $page.rs.sum++;
                // console.log(data);
                $.Ok();
                UpdateView();
                $page.$Go("Menu.Task", {
                  location: "replace",
                  data
                });
              })
              .catch(function(err) {
                $.Err(err.message);
              });
          } catch (e) {
            $.Err('tml072 . \n\n' + e.message);
            //
          }
        }
      });

      //$page.$Go("Menu.Task");
      //
      //
      // var value='',row=0;
      //
      // for (var i = 0; i < $page.fields.length; i++) {
      //
      //   if ($page.fields[i][0]=='_') {
      //     continue;
      //   }
      //
      //   if (row>0) {
      //     value+=',\n';
      //   }
      //
      //   row++;
      //
      //   value+='"'+$page.fields[i]+'":';
      //
      //   var v='';
      //   if ($page.rs.data.length>0) {
      //     console.log(0,$page.rs.data[0],$page.fields[i],$page.rs.data[0][$page.fields[i]]);
      //     if ($page.rs.data[0][$page.fields[i]]) {
      //       if ($page.rs.data[0][$page.fields[i]].length) {
      //         v=$Sub($page.rs.data[0][$page.fields[i]]);
      //         console.log(1,v);
      //       }else {
      //         v=$page.rs.data[0][$page.fields[i]];
      //         console.log(2,v);
      //       }
      //     }
      //   }
      //
      //   if (isNaN(v)) {
      //     v='"'+v+'"';
      //   }
      //   value+=v;
      //
      //
      // }



      // if (Object.keys(tableObj).length>0) {
      //   value=JSON.stringify(tableObj).substr(1)
      //   .replace(/,/g,',\n').replace(/\}/g,',\n');
      // }else {
      //   value='"_t":'+(new Date().getTime());
      // }



    };







    function UpdateView() {
      $Timer(function() {
        // Set Motion
        // $page.$motion.fadeSlideInRight();
        //
        // // Set Ink
        $page.$ink.displayEffect();
        $('ion-nav-bar').show();
        $('ion-nav-bar').hide();
        $('ion-nav-bar').fadeIn();
        $('ion-nav-bar').show();
        $('ion-nav-bar').hide();
        $('ion-nav-bar').fadeIn();
        $page.$motion.fadeSlideIn({
          selector: '.animate-fade-slide-in .item'
        });

        $('.GreenG').addClass('on');
      }, "view");
    }
    UpdateView();

    // $page.Get();

  });
