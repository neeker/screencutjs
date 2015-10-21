require('./screencut.js').start({type:'file/png'}, function(result){
  console.log('screencut result: ' + JSON.stringify(result));
});
