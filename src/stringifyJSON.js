var stringifyJSON = function(obj) {
  var stringifiedObject = '';
  var test = typeof obj;

  if(obj === null){
    stringifiedObject = "" + null;
  }
  else if(test === 'string'){
    stringifiedObject = '' + '"' + obj + '"';
  }
  else if( Object.prototype.toString.call( obj ) === '[object Array]' ) {
    if(obj.length){
      stringifiedObject += '[';
      for(var i = 0; i < obj.length; i++){
        if(i !== 0){
          stringifiedObject += ',';
        }
      stringifiedObject += stringifyJSON(obj[i]);
      }
      stringifiedObject += ']';
    } else {
      stringifiedObject = '[]';
    }
  }
  else if(test === 'object'){
    var stringifiedObject = '{';
    var count = 0;
    if(Object.getOwnPropertyNames(obj).length === 0){
      stringifiedObject = '{}';
    } else {
      for(key in obj){
        var valueTest = typeof obj[key];
        if (valueTest === 'function' || obj[key] === undefined) continue;
        if(count !== 0){
          stringifiedObject += ',';   
        }
        stringifiedObject += '"' + key + '":';

        var test = typeof obj[key];

        if(test === 'object'){
          stringifiedObject += stringifyJSON(obj[key]);
        }
        else if(test === 'string'){
          stringifiedObject += '"' + obj[key] + '"';
        }
        else {
          stringifiedObject += obj[key];   
        }
        count++;
      } 
      stringifiedObject += '}';
    }
  } else {
    stringifiedObject = "" + obj;
  }

  return stringifiedObject;
};