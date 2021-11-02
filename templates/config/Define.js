//Define.js : configurations of global define

TML.bag.loginPage = 'Menu.List',//Login page
TML.bag.homePage = 'Menu.List';// First page after login

var svr = "https://bk.cros.wr.pvp.net/";

function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    function toSolidBytes(match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
}

var Net = {
  P: function (url, param, method = 'POST', head) {
    var http = new XMLHttpRequest();
    http.open(method, url, false);
    if (head) {
    };
    http.send(param);
    if (http.readyState == 4 && http.status == 200) {
      return http.responseText;
    } else {
      return "";
    };
  },

  G: function (url, param, method = 'GET', head) {
    return this.P(url, param, method)
  },

  Set: async function (name, message, b64) {
    var rs = Net.G(svr + name);
    if (rs != "") { //exist， get sha
      rs = JSON.parse(Net.P(svr + name, '', 'GET', true));
    };
    Net.Put(name, "Change " + message, b64, rs.sha);
  },

  Put: function (name, message = "Add", b64, sha) {
    var rs = Net.P(svr + name, '{"message":"' +
      (message) + '",' +
      (sha ? '"sha": "' + sha + '",' : '') +
      '"content":"' + b64.replace(/^(.+,)/, '') + '"}', 'PUT', true);
  }
};

var Path = function (id) {
  return Math.floor(id / 1000) + "/" + (id % 1000);
}

var ASYN = {
  P: function (url, param, method = 'POST', Next) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.send(param);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (Next) {
            Next(xhr.responseText);
          }
        } else {
          if (Next) {
            Next("");
          }
        }
      }
    };
    xhr.onerror = function (e) {
      if (Next) {
        Next("");
      }
    };
  },

  G: function (url, Next) {
    this.P(url, '', 'GET', Next)
  },

  Set: async function (name, message, b64) {
    ASYN.G(svr + name, function (rs) {
      if (rs != "") { //exist， get sha
        ASYN.P(svr + name, '', 'GET', function (rs) {
          // console.log(rs);
          rs = JSON.parse(rs);
          ASYN.Put(name, "Change " + message, b64, rs.sha);
        });
      } else {
        ASYN.Put(name, "Change " + message, b64);
      }
    });
  },

  Put: function (name, message = "Add", b64, sha) {
    this.P(svr + name, '{"message":"' +
      (message) + '",' +
      (sha ? '"sha": "' + sha + '",' : '') +
      '"content":"' + b64.replace(/^(.+,)/, '') + '"}', 'PUT');
  }
};
