var loggedIn = false;
var loggedInName;

function checkLogin() {
  if (loggedIn == true) {
    document.location = 'app/index.html?loggedin=true'; 
  } else {
    document.location.hash = 'login';
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
    document.location = ('app/index.html?loggedin=true&un='+loggedInName); 
  }
}