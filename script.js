var cGroup50 = 'Cgroup50-';
var userFavoritesTxt = 'userFavorites';
var loggedInUserTxt = 'loggedInUser';


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

document.getElementById("min-price").value = MIN;
document.getElementById("max-price").value = MAX;

document.getElementById("min-price").step = MAX % 4;
document.getElementById("max-price").step = MAX % 4;

document.getElementById("min-price").min = MIN;
document.getElementById("min-price").max = MAX / 2;

document.getElementById("max-price").min = MAX / 2;
document.getElementById("max-price").max = MAX;

document.getElementById("max-price-txt").innerHTML = `$${MIN}`;
document.getElementById("max-price-txt").innerHTML = `$${MAX}`;


$(document).ready(function () {
  showAllItems();
});

$("#min-price").on("change mousemove", function () {
  min_price = parseInt($("#min-price").val());
  $("#min-price-txt").text("$" + min_price);
  showItemsFiltered();
});

$("#max-price").on("change mousemove", function () {
  max_price = parseInt($("#max-price").val());
  $("#max-price-txt").text("$" + max_price);
  showItemsFiltered();
});

$("#rating").on("change mousemove", function () {
  review_scores_rating = parseInt($("#rating").val());
  $("#rating-txt").text(review_scores_rating);
  showItemsFiltered();
});

document.getElementById("rooms").max = max_bedrooms;

$("#rooms").on("change mousemove", function () {
  bedrooms_number = parseInt($("#rooms").val());
  $("#room-txt").text(bedrooms_number);
  showItemsFiltered();
});


function openModal(id) {
  console.log(id);
  const modalItem = category_items.find((item) => item.id == id);
  console.log(modalItem);

  document.querySelector(".modal-fader").className += " active";
  document.querySelector("#modal-1").className += " active";
  function showAll() {
    modalItem.foreach((field) => {
      return "<br>" + "field " + modalItem[field];
    });
  }

  function showAmenities(amenities) {
    let amenitiesToShow = [];
    amenitiesToShow = amenities;
    if (amenitiesToShow && amenitiesToShow.length > 0) {
      amenitiesToShow.forEach((em) => {
        +"<br>" + "em ";
      });
    }
  }
  amenitiesTxt = modalItem["amenities"].replace(/[^ ,a-z0-9]/gi, "");
``
  let item_content =
    '<div class="col-12 col-md-12 text-center product-card"><b>' +
    "Amenities " +
    `<br>` +
    amenitiesTxt +
    `<br>` +
    '<button onClick={hideAllModalWindows()} class="modal-btn modal-hide">Close</button>';
  document.getElementById("modal-1").innerHTML = item_content;
}

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

function addToBooking(id) {
    category_items.map((cItem) => {
        if (cItem.id == id) {
            let doesExist = false;
            for (let i = 0; i < myBookings.length; i++) {
                if (myBookings[i]["id"] == id) doesExist = true;
            }
            if (!doesExist) myBookings.push(cItem);
            console.log(JSON.stringify(cItem));
        }
    });
    const myUser = JSON.parse(localStorage.getItem("Cgroup50-LoggedInUser"));
    console.log(myUser);
    const newUserDetails = {
        "Cgroup50-LoggedInUser": myUser,
        bookingItems: myBookings,
    };
    console.log(newUserDetails);
    localStorage.setItem("Cgroup50-LoggedInUser", JSON.stringify(newUserDetails));
}

function filterCategoryItemsByDate() {
  console.log("hey");
  const checkinDate = document.getElementById("checkin").value;
  console.log(checkinDate);
  // const checkoutDate = document.getElementById("checkout").value;
  //    console.log(document.getElementById("checkin").value);
}
function setDates() {
  console.log("setDates");
  checkin_date = document.getElementById("checkin").value;
  checkout_date = document.getElementById("checkout").value;
  alert("Dates Saved!");
  showItemsFiltered();
}
function showAllItems() {
  $("#display-items-div").empty();
  for (let i = 0; i < category_items.length; i++) {
    let key = category_items[i]["id"];
    $("#display-items-div").append(card(category_items[i], key));
  }
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
      checkAvilabilty(category_items[i])
    ) {
      $("#display-items-div").append(card(category_items[i], key));
    }
  }
}

function checkAvilabilty(category_item) {
    let isRoomAvilable = true;
    const checkinDate = new Date(checkin_date);
    const checkoutDate = new Date(checkout_date);
    if(category_item["reserved_dates"] && category_item["reserved_dates"].length > 0 ){
        category_item["reserved_dates"].forEach(bookingDates=>{
                const bookingCheckinDate = new Date(bookingDates.checkin_date)
                const bookingCheckoutDate = new Date(bookingDates.checkout_date)
                if(bookingCheckinDate >= checkinDate && bookingCheckinDate <= checkoutDate){
                    isRoomAvilable = false;
                }
                if(bookingCheckoutDate >= checkinDate && bookingCheckoutDate <= checkoutDate){
                    isRoomAvilaÅble = false;
                }
        })
    } 
    return isRoomAvilable;
}



(function () {
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
})();

function hideAllModalWindows() {
  var modalFader = document.querySelector(".modal-fader");
  var modalWindows = document.querySelectorAll(".modal-window");

  if (modalFader.className.indexOf("active") !== -1) {
    modalFader.className = modalFader.className.replace("active", "");
  }

  modalWindows.forEach(function (modalWindow) {
    if (modalWindow.className.indexOf("active") !== -1) {
      modalWindow.className = modalWindow.className.replace("active", "");
    }
  });
}

function addBooking(id) {
  console.log("addBooking");
  const bookingItem = category_items.find((item) => item.id == id);
  if (bookingItem) {
    if (!bookingItem["reserved_dates"]) {
      bookingItem["reserved_dates"] = [];
    }
    if (!checkin_date || !checkout_date) {
      alert("Please select dates");
      return;
    }
    const choosenDates = {
      checkin_date,
      checkout_date,
    };
    bookingItem["reserved_dates"].push(choosenDates);
    myBookings.push(bookingItem);
    console.log(JSON.stringify(bookingItem));

    // const myUser = JSON.parse(localStorage.getItem("Cgroup50-LoggedInUser"));
    // console.log(myUser);
    // if (!myUser) {
    //   const newUser = {
    //     myFavourites,
    //     myBookings,
    //   };
    //   localStorage.setItem("Cgroup50-LoggedInUser", JSON.stringify(newUser));
    // } else {
    //   myUser.myBookings = myBookings;
    //   localStorage.setItem("Cgroup50-LoggedInUser", JSON.stringify(myUser));
    // }
    
    const myUser = JSON.parse(localStorage.getItem("Cgroup50-LoggedInUser"));
    console.log(myUser);
    const newUserDetails = {
      "Cgroup50-LoggedInUser": myUser,
      favouriteItems: myFavourites,
      myBookings,
    };
    console.log(newUserDetails);
    localStorage.setItem("Cgroup50-LoggedInUser", JSON.stringify(newUserDetails));
    alert('Book Success!')
  }
}

function RentApartment(id) {
    myApartment = [];
    category_items.map((cItem) => {
        if (cItem.id == id) {
            let doesExist = false;
            for (let i = 0; i < myApartment.length; i++) {
                if (myApartment[i]["id"] == id)
                    doesExist = true;
            }
            if (!doesExist)
                myApartment.push(cItem)
            console.log(JSON.stringify(cItem))
        }

    })
    const myUser = JSON.parse(localStorage.getItem("Cgroup50-LoggedInUser"));
    console.log(myUser)
    const newUserDetails = { "Cgroup50-LoggedInUser": myUser, "myApartment": myApartment };
    console.log(newUserDetails)
    localStorage.setItem("Cgroup50-LoggedInUser", JSON.stringify(newUserDetails));
    localStorage.setItem("booked-apartment-id", id);
    location.href = 'Payment.html';
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
    '</b><br>'+
    '<img src="' +
    category_item["picture_url"] +
    '"alt="picture_url" />' +
      `<p><br>` +
      `<button class="button" onclick={addToFavourites(${key})}>Add to favorites</button>` +
    "</p>" +
    `<p><br>` +
      `<button class="button" onclick={RentApartment(${key})}>Book</button>` +"</p>" +
      "<p>" +
    `<br>` +
    `<button  class="button" onclick={openModal(${key})}>More Details</button>` +
    "</p></div></button>";
  return item_content;
}