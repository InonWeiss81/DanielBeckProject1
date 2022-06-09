var cGroup50 = 'Cgroup50-';
var userFavoritesTxt = 'userFavorites';
var loggedInUserTxt = 'loggedInUser';

$(function () {
    getFavouriteItems();
});

getFavouriteItems = () => {
    const myItems = getFavCategoryItems();
    $("#ph").empty();
    if (myItems.length == 0) {
        let noFavsMassage1 = 'There are no items in Favorites list. Go to ';
        let noFavsMassage2 = 'All Apartments page';
        let noFavsMassage3 = ' and add some appartments to your Favorites';
        let noFavsMassageElement = '<div class="col-12 col-md-12 text-center">' +
            `${noFavsMassage1}` + '<a href="AllApartments.html">' + `${noFavsMassage2}` + '</a>' + `${noFavsMassage3}` + '</div>';
        $("#ph").append(noFavsMassageElement);
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
        $("#ph").append(item_content);
    }
}

function getFavCategoryItems() {
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

RemoveFromFavourites = (id) => {
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
