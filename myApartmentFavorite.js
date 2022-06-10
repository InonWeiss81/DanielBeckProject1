var cGroup50 = 'Cgroup50-';
var userFavoritesTxt = 'userFavorites';
var loggedInUserTxt = 'loggedInUser';
var tempBookTxt = 'tempBook';
var userBookingsTxt = 'userBookings';

let checkin_date;
let checkout_date;

$(function () {
    clearSessionStorage();
    getFavouriteItems(false);
});

function clearSessionStorage() {
    sessionStorage.clear();
}

function getFavouriteItems(useDatesFilter = false) {
    const myItems = getFavCategoryItems(useDatesFilter);
    $("#display-items-div").empty();
    if (myItems.length == 0) {
        let noFavsMassage1 = 'There are no items in Favorites list. Go to ';
        let noFavsMassage2 = 'All Apartments page';
        let noFavsMassage3 = ' and add some appartments to your Favorites';
        let noFavsMassageElement = '<div class="col-12 col-md-12 text-center">' +
            `${noFavsMassage1}` + '<a href="AllApartments.html">' + `${noFavsMassage2}` + '</a>' + `${noFavsMassage3}` + '</div>';
        $("#display-items-div").append(noFavsMassageElement);
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
            `<button class="button" onclick={RemoveFromFavourites(${key})}>Remove From favorites</button>` + "</p>" + `<br>` + '<p>' +
            `<button class="button" onclick={RentApartment(${key})}>Book</button>` + "</p>" +
            "<p>" +
            `<br>` +
            `<button  class="button" onclick={openModal(${key})}>More Details</button>` +
            "</p></div></button>";
        $("#display-items-div").append(item_content);
    }
}

function getFavCategoryItems(useDatesFilter) {

    var result = [];
    var loggedInUserId = localStorage.getItem(cGroup50 + loggedInUserTxt);

    var allUsersFavorites = [];

    var allUsersFavoritesValue = localStorage.getItem(cGroup50 + userFavoritesTxt);

    if (allUsersFavoritesValue && allUsersFavoritesValue.length > 0) {
        allUsersFavorites = JSON.parse(allUsersFavoritesValue);
        var userFavoritesItem = {};
        var isUserFavoritesExists = false;
        for (var i = 0; i < allUsersFavorites.length; i++) {
            var elem = allUsersFavorites[i];
            if (elem.userId == loggedInUserId) {
                userFavoritesItem = elem;
                isUserFavoritesExists = true;
                break;
            }
        }
        var favorites = [];
        if (isUserFavoritesExists) {
            favorites = userFavoritesItem.favorites;
            for (var i = 0; i < category_items.length; i++) {
                var item = category_items[i];
                for (var j = 0; j < favorites.length; j++) {
                    var favId = favorites[j];
                    if (item.id == favId.toString()) {
                        if (!useDatesFilter || !isAppartmentTaken(item)) {
                            result.push(item);
                        }
                    }
                }
            }
        }
    }
    return result;
}

function isAppartmentTaken(category_item) {

    let result = false;
    // get dates
    const filterCheckinDate = new Date(checkin_date);
    const filterCheckoutDate = new Date(checkout_date);
    var allUsersBookings = [];

    var allUsersBookingsValue = localStorage.getItem(cGroup50 + userBookingsTxt);

    if (allUsersBookingsValue && allUsersBookingsValue.length > 0) {
        allUsersBookings = JSON.parse(allUsersBookingsValue);
        for (var i = 0; i < allUsersBookings.length; i++) {
            var elem = allUsersBookings[i];
            for (var j = 0; j < elem.bookings.length; j++) {
                var book = elem.bookings[j];
                // checkings
                if (category_item.id == book.itemId.toString()) {
                    const bookCheckinDate = new Date(book.fromDate);
                    const bookCheckoutDate = new Date(book.toDate);
                    if (!(filterCheckoutDate < bookCheckinDate || filterCheckinDate > bookCheckoutDate)) {
                        result = true;
                        break;
                    }
                }
            }
            if (result) {
                break;
            }
        }
    }
    return result;
}

function RemoveFromFavourites(id) {
    var loggedInUserId = localStorage.getItem(cGroup50 + loggedInUserTxt);

    var allUsersFavorites = [];

    var allUsersFavoritesValue = localStorage.getItem(cGroup50 + userFavoritesTxt);

    if (allUsersFavoritesValue && allUsersFavoritesValue.length > 0) {
        allUsersFavorites = JSON.parse(allUsersFavoritesValue);
        var userFavoritesItem = {};
        var isUserFavoritesExists = false;
        for (var i = 0; i < allUsersFavorites.length; i++) {
            var elem = allUsersFavorites[i];
            if (elem.userId == loggedInUserId) {
                userFavoritesItem = elem;
                isUserFavoritesExists = true;
                break;
            }
        }
        var favorites = [];
        if (isUserFavoritesExists) {
            favorites = userFavoritesItem.favorites;
            for (var i = 0; i < favorites.length; i++) {
                var favId = favorites[i];
                if (favId == id) {
                    favorites.splice(i, 1);
                    break;
                }
            }
            localStorage.setItem(cGroup50 + userFavoritesTxt, JSON.stringify(allUsersFavorites));
            getFavouriteItems();
        }
    }
}

//                                               ****************** SET DATES *****************
function setDates() {
    checkin_date = document.getElementById("checkin").value;
    checkout_date = document.getElementById("checkout").value;
    if (checkin_date.length == 0 || checkout_date.length == 0) {
        alert('Please select valid dates');
        return;
    }
    var tempBook = {
        itemId: 0,
        fromDate: checkin_date,
        toDate: checkout_date
    }
    sessionStorage.setItem(cGroup50 + tempBookTxt, JSON.stringify(tempBook));
    alert("Dates Saved!");
    getFavouriteItems(true);
}

//                                               ****************** RENT APARTMENT *****************
function RentApartment(id) {
    var tempBookValue = sessionStorage.getItem(cGroup50 + tempBookTxt);
    if (tempBookValue && tempBookValue.length > 0) {
        var tempBook = JSON.parse(tempBookValue);
        // check valid dates
        if (tempBook.fromDate.length == 0 || tempBook.toDate.length == 0) {
            alert('Please set valid dates');
            return;
        }
        tempBook.itemId = id;
        sessionStorage.setItem(cGroup50 + tempBookTxt, JSON.stringify(tempBook));
        location.href = 'Payment.html';
    }
    else {
        alert('Please set valid dates');
    }

}

