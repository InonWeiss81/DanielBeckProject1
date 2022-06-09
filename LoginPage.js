var cGroup50 = 'Cgroup50-';
var registeredUsersTxt = 'registeredUsers';
var loggedInUserTxt = 'loggedInUser';


function userLogin() {
    // get data from UI
    const username = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    // check if user exits in registered users
    var registeredUsers = [];
    var registeredUsersValue = localStorage.getItem(cGroup50 + registeredUsersTxt);
    if (registeredUsersValue && registeredUsersValue.length > 0) {
        registeredUsers = JSON.parse(registeredUsersValue);
        isExits = false;
        var user = {};
        for (var i = 0; i < registeredUsers.length; i++) {
            var elem = registeredUsers[i];
            if (elem.username == username && elem.password == password) {
                isExits = true;
                user = elem;
                break;
            }
        }

        if (isExits) {
            // if true - log user in, redirect -> home
            localStorage.setItem(cGroup50 + loggedInUserTxt, JSON.stringify(user.id));
            window.location = '/HomePage.html';
            return;
        }
    }
    alert("Invalid username or password");
}
