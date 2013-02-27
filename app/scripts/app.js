/*--------------------------------------*/
/*                  INFO                */
/*    mBox was made by Joshua Smith     */
/* Contact me at micovision@verizon.net */
/*--------------------------------------*/

var loggedIn = false;
var loggedInName;
var main_container = document.getElementById('contentContainer');
var rootURL = new Array();
var temporaryRecipientName, duplicateMessageVar;
var messageList = new Array();

window.addEventListener('load', function loadStart() {
  if (loggedIn == false) {
    // not logged in
    if (document.location.search != '') {
      document.location.hash = 'home';
      loggedIn = true;
    } else {
      document.location.hash = 'login';
    }
    document.location.search == '';
    return;
  }
  document.location.hash = 'home';
});  

function checkLogin() {
  if (loggedIn == true) {
    document.location.hash = 'home'; 
  } else {
    document.location.hash = 'login';
  }
}

function sendMessage(content, recipientNumber, recipientName) {
  if (content == null | content == undefined | content == "") {
    content = document.getElementById('message_box').value;
    if (content == null | content == undefined | content == "") {
      error('No Message', 'No message to send :D'); 
      return;
    }
  }
  if (recipientName == null | recipientName == undefined | recipientName == "") {
    recipientName = document.getElementById('recipientName').textContent;
    if (recipientName == null | recipientName == undefined | recipientName == "") {
      recipientName = "Unknown";
    }
  }
  if (recipientNumber == null | recipientNumber == undefined | recipientNumber == "") {
    recipientNumber = document.getElementById('recipientNumber').textContent;
    if (recipientNumber == null | recipientNumber == undefined | recipientNumber == "") {
      error('No Contact Method', 'Contact method is not available.'); 
      return;
    }
  }
  notification.create('sending', 'Sending a message to <span style="color: #428eff;">'+recipientName+' ('+recipientNumber+')</span> with content "<span style="color: #428eff;">'+content+'</span>"');
}

function goFullScreen() {
  body = document.body;
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
    if (document.body.requestFullscreen) {
      document.body.requestFullscreen();
    } else if (document.body.mozRequestFullScreen) {
      document.body.mozRequestFullScreen();
    } else if (document.body.webkitRequestFullscreen) {
      document.body.webkitRequestFullscreen();
    }
    var fs_button = document.getElementById('fs_button')
    fs_button.setAttribute('src', 'style/images/efs.png');
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
    var fs_button = document.getElementById('fs_button')
    fs_button.setAttribute('src', 'style/images/fs.png');
  }
}

function login(username, password) {
  if (username == null | username == undefined | username == "") {
    username = document.getElementById('userNameBox').value;
  } 
  if (password == null | password == undefined | password == "") {
    password = document.getElementById('passwordBox').value;
  }
  if (username == 'admin', password == 'w8c3aV1SFpyz1F') {
    loggedIn = true;
  } else {
    error('No Account', 'That account does not exist');
  }
  if (loggedIn == true) {
    loggedInName = username;
    document.location = ('?loggedin=true&un='+loggedInName); 
    notification.create('Welcome', 'Welcome <span style="color: #428eff;">'+username+'</span>!');
    document.getElementById('loginPageForm').style.display = 'none';
    var loggedInNotifyH = document.createElement("h1");
    loggedInNotifyH.innerHTML = '<br />You are already logged in :)';
    document.getElementById('loginBox').appendChild(loggedInNotifyH);
  }
}

function navigate(location, reason, parent) {
  rootURL.push(document.location.hash);      
  if (parent == null | parent == undefined | parent == '' | parent == "none") {
    rootURL.push(document.location.hash);  
    rootURL.forEach(function (element) { document.getElementById(element.slice(1)).setAttribute('is_parent', 'false'); });
  } else if (parent == 'self') {
    var tempURLVar = rootURL.pop()
    document.getElementById(tempURLVar.slice(1)).setAttribute('is_parent', 'true');
    rootURL.push(document.location.hash);
    rootURL.push(document.location.hash);
  } else {
    document.getElementById(parent).setAttribute('is_parent', 'true'); 
    rootURL.push(parent); 
  }
  document.location.hash = location;
}

function navBack() {
  if (rootURL == null | rootURL == undefined | rootURL == '') {
    error('undefined root', 'The previous page cannot be found.&nbsp; Please click this <a href="">link</a> to reload.', 0);
    return;    
  }
  var tempURLVar = rootURL.pop()
  document.getElementById(tempURLVar.slice(1)).setAttribute('is_parent', 'false');
  document.location.hash = rootURL.pop();
}

function createMbox(recipientNumber, recipientName, recipientEmail) {
  duplicateMessageVar = false;
  temporaryRecipientName = '';
  var contact_method;
  if (recipientNumber == null | recipientNumber == undefined | recipientNumber == "" && recipientEmail == null | recipientEmail == undefined | recipientEmail == '') {
    navigate('add','Add mBox', 'self');
    return;
  }
  if (recipientNumber == null | recipientNumber == undefined | recipientNumber == '') {
    contact_method = recipientEmail;
    recipientNumber = 'None Given';
  } else {
    contact_method = recipientNumber.replace(/[()\-\s]+/g, '');
  }
  if (recipientEmail == null | recipientEmail == undefined | recipientEmail == '') {
    recipientEmail = 'None Given';
  }
  if (recipientName == null | recipientName == undefined | recipientName == "") {
    temporaryRecipientName = recipientNumber;
    recipientName = 'None Given';
  } else {
    temporaryRecipientName = recipientName;
  }
  
  messageList.forEach(function displayMessageList(element) { if (element == temporaryRecipientName) { error('','You are already messaging <span type="a" onClick="navigate(\'#message:'+element+'\', \'\', \'none\')">'+element+'</span>!'); duplicateMessageVar = true; } });
  
  if (duplicateMessageVar == false) {
    if (recipientName == recipientNumber | recipientName == recipientEmail) {
      recipientTempTitleVar = (temporaryRecipientName);
    } else {
      recipientTempTitleVar = (temporaryRecipientName+' ('+contact_method+')');
    }
    main_container = document.getElementById('contentContainer');
    main_container.insertAdjacentHTML('afterbegin', '<section role="dialog" id="info:'+temporaryRecipientName+'"></section>');
    document.getElementById('info:'+temporaryRecipientName).insertAdjacentHTML('beforeend', '<header position="fixed"><span type="button" style="float: left;" onClick="navBack()">Back</span><span class="title">'+temporaryRecipientName+'</span></header>');
    document.getElementById('info:'+temporaryRecipientName).insertAdjacentHTML('beforeend', '<section class="content"><h2>Info</h2>Name: '+recipientName+'<br />Default Contact: '+contact_method+'<br /><br />Phone #: '+recipientNumber+'<br />Email: '+recipientEmail+'</section>');
    main_container.insertAdjacentHTML('afterbegin', '<section role="region" id="message:'+temporaryRecipientName+'"></section>');
    document.getElementById('message:'+temporaryRecipientName).insertAdjacentHTML('beforeend', '<header position="fixed"><span type="button" style="float: left;" onClick="navigate(\'about\', \'Show About\', \'none\')">About</span><span class="title"><span id="recipientName" onClick="navigate(\'info:'+temporaryRecipientName+'\', \'User Info\', \'self\')">'+recipientTempTitleVar+'</span></span><span type="button" style="float: right;" onClick="createMbox()">+</span><img id="fs_button" src="style/images/fs.png" alt="Fullscreen" height="18" type="button" style="float: right; padding: 3px;" onClick="goFullScreen()" /></header>');
    document.getElementById('message:'+temporaryRecipientName).insertAdjacentHTML('beforeend', '<section class="content" size="scroll"></section><form class="c_bar" action="javascript: sendMessage()"><input type="text" title="message content" id="message_box" class="message_box" placeholder="Message" /><input type="submit" class="send" title="send message" value="Send" /></form>');
    document.getElementById('message:'+temporaryRecipientName).insertAdjacentHTML('beforeend', '<hidden id="recipientNumber" style="display: none;">'+contact_method+'</hidden>');
    navigate('message:'+temporaryRecipientName, '', 'none');
    messageList.push(temporaryRecipientName);
  }
}

function getMessageList() {
  document.getElementById('myMessageList').innerHTML = "<h3>I am messaging</h3>";
  messageList.forEach(function displayMessageList(element) { document.getElementById('myMessageList').insertAdjacentHTML('beforeend', '<br /><a href="#message:'+element+'">'+element+'</a>'); });
  if (messageList.length == 0) {
    document.getElementById('myMessageList').insertAdjacentHTML('beforeend', 'You are not messaging anyone.&nbsp;&nbsp;<input type="button" value="Add mBox" onClick="createMbox()" />');
  }
}

function showContacts() {
  error('Not Implemented', 'This feature has not been implemented ;(');
}

function addContact(number, name, email, messageNow) {
  if (name == null | name == undefined | name == '') {
    name = document.getElementById('newContactNameBox').value;
    if (name == null | name == undefined | name == '') {
      name = '';
    }
  }
  if (email == null | email == undefined | email == '') {
    email = document.getElementById('newContactEmailBox').value;
    if (email == null | email == undefined | email == '') {
      email = '';
    }
  }
  if (number == null | number == undefined | number == '') {
    number = document.getElementById('newContactNumberBox').value;
    if  (number == null | number == undefined | number == '') {
      number = email;
      if (number == null | number == undefined | number == '') {
        error('No contact method', 'Contact method not given.');
        return;
      }
    }
  }
  // Some code to add contact to list.
  if (messageNow == true) {
    createMbox(number, name, email);
  }
}

// Code to send SMS/Email without reloading page
function Ajax() {
    try {
        if(window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else if(window.ActiveXObject) {
            try {
                return new ActiveXObject('Msxml2.XMLHTTP');
            } catch(try_again) {
                return new ActiveXObject('Microsoft.XMLHTTP');
            }
        }
    } catch(fail) {
        return null;
    }
}
 
// function sendMail(to, subject) {
//      var rq;
//      if(rq = new Ajax()) {
//          // Success; attempt to use an Ajax request to a PHP script to send the e-mail
//          try {
//              rq.open('GET', 'sendmail.php?to=' + encodeURIComponent(to) + '&subject=' + encodeURIComponent(subject) + '&d=' + new Date().getTime().toString(), true);
//              rq.onreadystatechange = function() {
//                  if(this.readyState === 4) {
//                      if(this.status < 200 || this.status >= 400) {
//                          // The request failed; fall back to e-mail client
//                          window.open('mailto:' + to + '?subject=' + encodeURIComponent(subject));
//                      }
//                  }
//              }
//              rq.send(null);
//          } catch(fail) {
//              // Failed to open the request; fall back to e-mail client
//              window.open('mailto:' + to + '?subject=' + encodeURIComponent(subject));
//          }
//      } else {
//          // Failed to create the request; fall back to e-mail client
//          window.open('mailto:' + to + '?subject=' + encodeURIComponent(subject));
//      }
// }