[//configurations files
  "Define",//configurations for global define
  "iOS+android",//configurations for android and iOS
  "Run",//configurations for android and iOS
  "Say", ////Add multi-language for transation,
  "jszip.min"
].forEach(function(f) {
      document.write('<script charset="UTF-8" src="config/' + f + '.js"></script>');
});

// view files
[ "Menu",
"List",
"Plan"
].forEach(function(f) {
    document.write('<script charset="UTF-8" src="view/' + f + '.js"></script>');
    document.write('<script charset="UTF-8" src="view/' + f + '.htm"></script>');
});
