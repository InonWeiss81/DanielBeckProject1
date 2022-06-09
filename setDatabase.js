var cGroup50 = 'Cgroup50-';
var registeredUsersTxt = 'registeredUsers';
var userFavoritesTxt = 'userFavorites';
var userBookingsTxt = 'userBookings';
var loggedInUserTxt = 'loggedInUser';

var registeredUsers = localStorage.getItem(cGroup50 + registeredUsersTxt);
if (!registeredUsers) {
    localStorage.setItem(cGroup50 + registeredUsersTxt, '');
}
var userFavorites = localStorage.getItem(cGroup50 + userFavoritesTxt);
if (!userFavorites) {
    localStorage.setItem(cGroup50 + userFavoritesTxt, '');
}
var userBookings = localStorage.getItem(cGroup50 + userBookingsTxt);
if (!userBookings) {
    localStorage.setItem(cGroup50 + userBookingsTxt, '');
}
var loggedInUser = localStorage.getItem(cGroup50 + loggedInUserTxt);
if (!loggedInUser) {
    localStorage.setItem(cGroup50 + loggedInUserTxt, '');
}
