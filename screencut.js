'user strict'
module.exports = function() {
  var proc = require('child_process');
  var path = require('path');
  var os = require('os');
  var fs = require('fs');
  return {
    start: function (cb) {
      var screencut_executor_path = path.join(
        path.dirname(__filename),
        os.platform(),
        os.arch(),
        'screencut' + (os.platform() === 'win32' ? '.exe' : '')
      );
      fs.exists(screencut_executor_path, function(exists){
        if (exists) {
          var screencut_proc = proc.spawn(screencut_executor_path);
          screencut_proc.on('exit',function(exit_code) {
            typeof cb === 'object' && cb();
          });
        } else {
          throw "sorry, screencut not support " + os.platform() + "(" + os.arch() + ")";
        }
      });
    }
  };
}();
