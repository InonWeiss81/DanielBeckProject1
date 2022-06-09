var cGroup50 = 'Cgroup50-';
var registeredUsersTxt = 'registeredUsers';
var loggedInUserTxt = 'loggedInUser';

function storeToLS() {

    // get data from UI
    var user = {
        id: 1,
        username: document.getElementById("login").value,
        password: document.getElementById("password").value
    }

    // check if username is available
    var registeredUsers = [];
    var registeredUsersValue = localStorage.getItem(cGroup50 + registeredUsersTxt); 
    if (registeredUsersValue && registeredUsersValue.length > 0) {
        registeredUsers = JSON.parse(registeredUsersValue);
        var maxId = 0;
        for (var i = 0; i < registeredUsers.length; i++) {
            var elem = registeredUsers[i];
            if (elem.id > maxId) {
                maxId = elem.id;
            }
            if (elem.username == user.username) {
                alert('Username is already taken');
                return;
            }
        }
        user.id = maxId + 1;
    }
    // insert to LS
    registeredUsers.push(user);
    localStorage.setItem(cGroup50 + registeredUsersTxt, JSON.stringify(registeredUsers));

    // log new user in
    localStorage.setItem(cGroup50 + loggedInUserTxt, JSON.stringify(user.id));

    // redirect to home
    window.location = '/HomePage.html';
}
