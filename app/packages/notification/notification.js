var autoHideNotifications, autoClearNotifications, notificationContainer, tempNodeName, duplicateNotificationVar;
var notification = {};
notificationNodesList = new Array();

document.write('<link rel="stylesheet" type="text/css" href="packages/notification/notification.css" />');
document.body.innerHTML = ('<section id="documentContents">'+document.body.innerHTML+'</section>');
document.body.insertAdjacentHTML('afterbegin', '<section id="notificationContainer"></section>');
notificationContainer = document.getElementById('notificationContainer');

notification.count = function () {
  return notificationNodesList.length;
};

notification.create = function (name, content, timeout) {
  clearTimeout(autoClearNotifications);
  clearTimeout(autoHideNotifications);
  tempNodeName = name;
  
  if (notificationNodesList != '') {
    notificationNodesList.forEach(function (element) { if (element == tempNodeName) { duplicateNotificationVar = true; } })
  }
  
  if (duplicateNotificationVar == true) {
    notification.show(tempNodeName);
    return;
  }
  
  var newNotification = document.createElement("p");
  newNotification.classList.add('notification');
  newNotification.setAttribute('notificationID', name);
  newNotification.innerHTML = ('<input type="button" class="closeButton" onClick="notification.clear(\''+name+'\')" style="float: right;" value="X" />'+content);
  newNotification.id = ('notification:'+name);
  
  notificationContainer.appendChild(newNotification);
  notificationNodesList.push(name);
  
  if (timeout != 0) {
    if (timeout == null | timeout == undefined | timeout == "") {
      timeout = 5000;
    }
  newNotification.setAttribute('timeout', timeout);
  autoHideNotifications = setTimeout("notification.hide.all(true)", timeout);
  }
  newNotification.classList.add('shown');
};

notification.hide = function (name) {
  tempNodeName = name;
  notificationNodesList.forEach(function (element) { if (element == tempNodeName) { document.getElementById('notification:'+element).classList.remove('shown'); } });
};

notification.hide.all = function (clear) {
  clearTimeout(autoClearNotifications);
  notificationNodesList.forEach(function (element) { document.getElementById('notification:'+element).classList.remove('shown') } );
  if (clear == true) {
    autoClearNotifications = setTimeout("notification.clear.all()", 1000);
  }
};

notification.show = function (name) {
  clearTimeout(autoHideNotifications);
  tempNodeName = name;
  notificationNodesList.forEach(function (element) { if (element == tempNodeName) { document.getElementById('notification:'+element).classList.add('shown');  autoHideNotifications = setTimeout("notification.hide.all(true)", document.getElementById('notification:'+element).getAttribute('timeout')); } });
};

notification.show.all = function () {
};
  
notification.clear = function (name) {
  clearTimeout(autoClearNotifications);
  tempNodeName = name;
  notificationNodesList.forEach(function (element, index) { if (element == tempNodeName) { document.getElementById('notification:'+element).classList.remove('shown'); notificationNodesList.splice(index); } });
  if (notificationNodesList.length == 0) {
    notification.hide.all(true);
  }
};

notification.clear.all = function () {
  notificationNodesList.forEach(function (element) { document.getElementById('notification:'+element).classList.remove('shown'); } );
  notificationNodesList = new Array();
  clearTimeout(autoClearNotifications);
  notificationContainer.innerHTML = '';
};

function error(name, content, timeout) {
  content = ('<span style="color: #FC6A6A;">'+content+'</span>');
  notification.create(name, content, timeout);
}