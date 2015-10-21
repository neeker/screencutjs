ScreenCutJS
===========
screen cut for nodejs

## start(options, callback)方法

### options
该参数可选，type属性可以设置为以下值：
* clipboard 剪切到剪切板
* file/png 剪切到临时文件（png格式）
* file/jpg 剪切到临时文件（jpg格式）
* file/bmp 剪切到临时文件（bmp格式）

### callback
传入方法callback(result),其中result为一个对象，根据结果不同可能包含属性:
* status 表示状态（save，saveas，error） 其中error时表示调用失败。
* file 如果以文件方式截取，则保存临时文件或另存文件的文件名。
* clipboard 如果为true，表示剪切板里有bitmap格式的图片。

## 调用示例
先安装：
npm install screencutjs
在node中执行：
```
require('screencutjs').start(
  {type:'file/png'}, 
  function(result){
  console.log('screencut result: ' + JSON.stringify(result));
});
```

更新说明
-----------
2015/10/20 为截屏模块添加Windows实现。
2015/10/21 修改低版本的node获取arch不正确而导致找不到截取器的问题。


