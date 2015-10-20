require('./screencut.js').start({type:'clipboard'}, function(result){
  console.log('screencut result: ' + JSON.stringify(result));
});
