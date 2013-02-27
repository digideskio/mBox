var tempParamName, tempParamIndex;

document.location.params = function () {
  tempParamName = name;
  if (document.location.search == '' | document.location.search == '?' | document.location.search == null | document.location.search == undefined) {
    return 'error';
  } else {
    var params = document.location.search.split('?')[1].split('&'); 
    return params;
  } 
};

document.location.params.get = function (name) {
  if (document.location.search == '' | document.location.search == '?' | document.location.search == null | document.location.search == undefined) {
    return 'error';
  } else {
    tempParamName = name;
    var params = document.location.search.split('?')[1].split('&');
    for (var ix = 0; ix < params.length; ix++) { params[ix] = params[ix].split('='); }
    
    return params;
  }
};