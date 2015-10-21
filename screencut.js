'user strict'
module.exports = function() {
  var proc = require('child_process');
  var path = require('path');
  var os = require('os');
  var fs = require('fs');
  var util = require('util');
  return {
    start: function () {
      if (arguments.length < 1 || arguments.length > 2) {
        throw new Error("args error");
      }
      var cb = function(){}, options = {};
      if (arguments.length == 1) {
        cb = arguments[0];
      } else if (arguments.length == 2) {
        options = arguments[0];
        cb = arguments[1];
      }
      options = util._extend(options, {});
      if (typeof(options.type) == 'undefined') {
        options.filetype = 'file/png';
      }

      var screencut_executor_path = path.join(
        path.dirname(__filename),
        os.platform(),
        'screencut' + (os.platform() === 'win32' ? '.exe' : '')
      );
      fs.exists(screencut_executor_path, function(exists) {
        if (exists) {
          var screencut_result = "";
          var screencut_proc = proc.spawn(
            screencut_executor_path,
            [options.type],
            {
              stdio: ['pipe', null, null],
              encoding: 'utf8'
            }
          );
          screencut_proc.stdout.on('data', function(chunk) {
            screencut_result += chunk;
          });
          screencut_proc.on('exit',function(exit_code) {
            var result = {};
            if (exit_code == 0) {
              result = JSON.parse(screencut_result);
            } else {
              result = {'status':'error'};
            }
            typeof(cb) != 'undefined' && cb(result);
          });
        } else {
          throw new Error("sorry, screencut not support " + os.platform() + "(" + os.arch() + ")");
        }
      });
    }
  };
}();
