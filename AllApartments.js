var cGroup50 = 'Cgroup50-';
var userFavoritesTxt = 'userFavorites';
var userBookingsTxt = 'userBookings';
var loggedInUserTxt = 'loggedInUser';
var tempBookTxt = 'tempBook';


let min_price = 0;
let max_price = 0;
let MIN = 0;
let MAX = 0;
let max_bedrooms = 0;
let bedrooms_number = 0;
let review_scores_rating = 0;
let checkin_date;
let checkout_date;
let myFavourites = [];
let myBookings = [];


$(function () {
    clearSessionStorage();
    setFilters();
    setEvents();
    setModalEvents();
    showAllItems();
});

function clearSessionStorage() {
    sessionStorage.clear();
}

function showAllItems() {
    $("#display-items-div").empty();
    for (let i = 0; i < category_items.length; i++) {
        let key = category_items[i]["id"];
        $("#display-items-div").append(card(category_items[i], key));
    }
}

//
function setFilters() {
    for (let i = 0; i < category_items.length; i++) {
        let floatPrice = parseFloat(
            category_items[i]["price"].replace(" ", "").replace("$", "")
        );
        let bedrooms = parseFloat(category_items[i]["bedrooms"]);

        if (floatPrice < MIN) {
            MIN = floatPrice;
        }
        if (floatPrice > MAX) {
            MAX = floatPrice;
        }
        if (bedrooms > max_bedrooms) {
            max_bedrooms = bedrooms;
        }
    }

    document.getElementById("min-price").min = MIN;
    document.getElementById("min-price").max = MAX / 2;

    document.getElementById("max-price").min = MAX / 2;
    document.getElementById("max-price").max = MAX;

    var step = MAX / 2 > 50 ? 5 : 1;
    document.getElementById("min-price").step = step;
    document.getElementById("max-price").step = step;

    document.getElementById("min-price").value = MIN;
    document.getElementById("max-price").value = MAX;

    document.getElementById("min-price-txt").innerHTML = `$${MIN}`;
    document.getElementById("max-price-txt").innerHTML = `$${MAX}`;

    min_price = MIN;
    max_price = MAX;
    review_scores_rating = 1;
    bedrooms_number = 1;
}

function setModalEvents() {
    document.querySelectorAll(".open-modal").forEach(function (trigger) {
        trigger.addEventListener("click", function () {
            hideAllModalWindows();
            showModalWindow(this);
        });
    });

    document.querySelectorAll(".modal-hide").forEach(function (closeBtn) {
        closeBtn.addEventListener("click", function () {
            hideAllModalWindows();
        });
    });

    document.querySelector(".modal-fader").addEventListener("click", function () {
        hideAllModalWindows();
    });
}

function setEvents() {
    $("#min-price").on("change", function () {
        min_price = parseInt($("#min-price").val());
        $("#min-price-txt").text("$" + min_price);
        showItemsFiltered();
    });

    $("#max-price").on("change", function () {
        max_price = parseInt($("#max-price").val());
        $("#max-price-txt").text("$" + max_price);
        showItemsFiltered();
    });

    $("#rating").on("change", function () {
        review_scores_rating = parseInt($("#rating").val());
        $("#rating-txt").text(review_scores_rating);
        showItemsFiltered();
    });

    document.getElementById("rooms").max = max_bedrooms;

    $("#rooms").on("change", function () {
        bedrooms_number = parseInt($("#rooms").val());
        $("#room-txt").text(bedrooms_number);
        showItemsFiltered();
    });
}

function showItemsFiltered() {
    $("#display-items-div").empty();
    for (let i = 0; i < category_items.length; i++) {
        let key = category_items[i]["id"];
        if (
            parseFloat(category_items[i]["price"].replace(" ", "").replace("$", "")) <= max_price &&
            parseFloat(category_items[i]["price"].replace(" ", "").replace("$", "")) >= min_price &&
            parseFloat(category_items[i]["review_scores_rating"]) >= review_scores_rating &&
            parseFloat(category_items[i]["bedrooms"]) >= bedrooms_number &&
            !isAppartmentTaken(category_items[i])
        ) {
            $("#display-items-div").append(card(category_items[i], key));
        }
    }
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


//                                               ****************** ADD TO FAVORITES *****************
function addToFavourites(id) {

    // check if id exists in user favs
    // get current user id
    var loggedInUserId = localStorage.getItem(cGroup50 + loggedInUserTxt);

    // loop through users favs and check if id exists
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
            var idExists = false;
            for (var i = 0; i < favorites.length; i++) {
                var elem = favorites[i];
                if (elem == id) {
                    idExists = true;
                    break;
                }
            }
            if (!idExists) {
                favorites.push(id);
            }
        }
        else {
            userFavoritesItem = { userId: loggedInUserId, favorites: [id] };
            allUsersFavorites.push(userFavoritesItem);
        }

    }
    else {
        allUsersFavorites.push({ userId: loggedInUserId, favorites: [id] });
    }
    localStorage.setItem(cGroup50 + userFavoritesTxt, JSON.stringify(allUsersFavorites));
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
    showItemsFiltered();
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

function card(category_item, key) {
    let item_content =
        '<div class="col-12 col-md-12 text-center product-card"' +
        "<div><b>" +
        category_item["name"] +
        "<br>" +
        "ID " +
        category_item["id"] +
        "<br>" +
        "Rating " +
        category_item["review_scores_rating"] +
        "<br>" +
        "Rooms " +
        category_item["bedrooms"] +
        `<br>` +
        category_item["price"] +
        `<br>` +
        '</b><br>' +
        '<img src="' +
        category_item["picture_url"] +
        '"alt="picture_url" />' +
        `<p><br>` +
        `<button class="button" onclick={addToFavourites(${key})}>Add to favorites</button>` +
        "</p>" +
        `<p><br>` +
        `<button class="button" onclick={RentApartment(${key})}>Book</button>` + "</p>" +
        "<p>" +
        `<br>` +
        `<button  class="button" onclick={openModal(${key})}>More Details</button>` +
        "</p></div></button>";
    return item_content;
}