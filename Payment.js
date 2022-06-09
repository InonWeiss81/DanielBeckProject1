var cGroup50 = 'Cgroup50-';
var userFavoritesTxt = 'userFavorites';
var userBookingsTxt = 'userBookings';
var loggedInUserTxt = 'loggedInUser';
var tempBookTxt = 'tempBook';

function addToBooking() {

    // get current user id
    var loggedInUserId = localStorage.getItem(cGroup50 + loggedInUserTxt);

    // get bookItem
    var bookItemValue = sessionStorage.getItem(cGroup50 + tempBookTxt);
    if (!bookItemValue || bookItemValue.length == 0) {
        alert('An error occurred, please try again');
        location.href = 'AllApartments.html';
    }

    var bookItem = JSON.parse(bookItemValue);

    // loop through users favs and check if id exists
    var allUsersBookings = [];

    var allUsersBookingsValue = localStorage.getItem(cGroup50 + userBookingsTxt);
    if (allUsersBookingsValue && allUsersBookingsValue.length > 0) {
        allUsersBookings = JSON.parse(allUsersBookingsValue);
        var userBookingsItem = {};
        var isUserBookingsExists = false;
        for (var i = 0; i < allUsersBookings.length; i++) {
            var elem = allUsersBookings[i];
            if (elem.userId == loggedInUserId) {
                userBookingsItem = elem;
                isUserBookingsExists = true;
                break;
            }
        }
        var bookings = [];
        if (isUserBookingsExists) {
            bookings = userBookingsItem.bookings;
            var idExists = false;
            for (var i = 0; i < bookings.length; i++) {
                var elem = bookings[i];
                if (elem.itemId == bookItem.itemId) {
                    idExists = true;
                    break;
                }
            }
            if (!idExists) {
                bookings.push(bookItem);
            }
        }
        else {
            userBookingsItem = { userId: loggedInUserId, bookings: [bookItem] };
            allUsersBookings.push(userBookingsItem);
        }
    }
    else {
        allUsersBookings.push({ userId: loggedInUserId, bookings: [bookItem] });
    }
    localStorage.setItem(cGroup50 + userBookingsTxt, JSON.stringify(allUsersBookings));
    sessionStorage.clear();
    location.href = 'myApartmentBook.html';
}

RemoveFrommyApartment = (id) => {
    alert('Your order canceled');
    sessionStorage.clear();
}
