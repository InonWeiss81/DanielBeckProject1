var cGroup50 = 'Cgroup50-';
var loggedInUserTxt = 'loggedInUser';

$(function () {
    setNavbarItems();
});


function setNavbarItems() {
    var homePageTab = $('#home-page-tab');
    $(homePageTab).removeClass('d-none');
    var loggedInUser = localStorage.getItem(cGroup50 + loggedInUserTxt);
    if (loggedInUser && loggedInUser.length > 0) {
        $('#logout-tab').removeClass('d-none');
        $('#all-appartments-tab').removeClass('d-none');
        $('#my-favorites-tab').removeClass('d-none');
        $('#my-bookings-tab').removeClass('d-none');
    }
    else {
        $('#login-page-tab').removeClass('d-none');
    }

}



function logout() {
    localStorage.setItem(cGroup50 + loggedInUserTxt, '');
    window.location = '/HomePage.html';
}