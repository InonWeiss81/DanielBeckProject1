var cGroup50 = 'Cgroup50-';
var userBookingsTxt = 'userBookings';
var loggedInUserTxt = 'loggedInUser';

$(function () {
    getBookItems();
});

getBookItems = () => {
    const myItems = getBookCategoryItems();
    $("#ph").empty();
    if (myItems.length == 0) {
        let noBooksMassage = 'There are no items in Bookings list';
        let noBooksMassageElement = '<div class="col-12 col-md-12 text-center">' + `${noBooksMassage}` + '</div>';
        $("#ph").append(noBooksMassageElement);
    }
    for (let i = 0; i < myItems.length; i++) {
        let key = myItems[i]["id"];

        let item_content =
            '<div class="col-12 col-md-12 text-center product-card"' +
            '<div><b>' +
            myItems[i]["name"] +
            '<br>' +
            'ID ' + myItems[i]["id"] +
            '<br>' +
            'Rating ' + myItems[i]["review_scores_rating"] +
            '<br>' +
            'Rooms ' + myItems[i]["bedrooms"] + `<br>` + myItems[i]["price"] + `<br>` +
            '</b><br><img src="' +
            myItems[i]["picture_url"] +
            '"alt="picture_url"><p>' + `<br>` + '<p>' +
            `<button class="button" onclick={RemoveFromBookings(${key})}>Remove From bookings</button>` + "</p>" +
            "<p>" +
            `<br>` +
            `<button  class="button" onclick={openModal(${key})}>More Details</button>` +
            "</p></div></button>";
        $("#ph").append(item_content);
    }
}

function getBookCategoryItems() {
    var result = [];
    var loggedInUserId = localStorage.getItem(cGroup50 + loggedInUserTxt);

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
            for (var i = 0; i < category_items.length; i++) {
                var item = category_items[i];
                for (var j = 0; j < bookings.length; j++) {
                    var book = bookings[j];
                    if (item.id == book.itemId.toString()) {
                        result.push(item);
                    }
                }
            }
        }
        else {

        }
    }
    else {

    }
    return result;
}

RemoveFromBookings = (id) => {
    var loggedInUserId = localStorage.getItem(cGroup50 + loggedInUserTxt);

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
            for (var i = 0; i < bookings.length; i++) {
                var book = bookings[i];
                if (book.itemId == id) {
                    bookings.splice(i, 1);
                    break;
                }
            }
            localStorage.setItem(cGroup50 + userBookingsTxt, JSON.stringify(allUsersBookings));
            getBookItems();
        }
    }
}
