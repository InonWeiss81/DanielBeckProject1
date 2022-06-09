var cGroup50 = 'Cgroup50-';
var loggedInUserTxt = 'loggedInUser';

var mapUrltoNavbarItem = [
    { url: 'HomePage', navbarId: 'home-page-tab' },
    { url: 'LoginPage', navbarId: 'login-page-tab' },
    { url: 'AllApartments', navbarId: 'all-appartments-tab' },
    { url: 'myApartmentFavorite', navbarId: 'my-favorites-tab' },
    { url: 'myApartmentBook', navbarId: 'my-bookings-tab' },
];

$(function () {
    setNavbarItems();
    setTimeout(function () {
        setNavbarActiveItem();
    }, 100);
    
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

function setNavbarActiveItem() {
    var pathArray = window.location.pathname.split('/');
    var currentPage = pathArray[pathArray.length - 1];
    var key = currentPage.split('.')[0];
    for (var i = 0; i < mapUrltoNavbarItem.length; i++) {
        var elem = mapUrltoNavbarItem[i];
        var currLinkElement = $(`#${elem.navbarId} a`)[0];
        if (elem.url == key) {
            $(currLinkElement).addClass('active-link');
        }
        else {
            $(currLinkElement).removeClass('active-link');
        }
    }
}



function logout() {
    localStorage.setItem(cGroup50 + loggedInUserTxt, '');
    window.location = '/HomePage.html';
}