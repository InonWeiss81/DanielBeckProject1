get = () => {
    const myItems = JSON.parse(localStorage.getItem("Cgroup50-LoggedInUser")).favouriteItems;
    $("#ph").empty();
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
            `<button class="button" onclick={RemoveFromFavourites(${key}),location.reload()}>Remove From favorites</button>` + "</p>" + `<br>` + '<p>' +
            `<button class="button" onclick={RentApartment(${key})}>Rent apartment</button> ` + "</p>" +
            + '<p>' + `<br>` + `<button  class="button" onclick={openModal(${key})}>More Details</button>` +
            "</p></div></button>";
        $("#ph").append(item_content);
    }
}

RemoveFromFavourites = (id) => {
    const favorite = JSON.parse(localStorage.getItem("Cgroup50-LoggedInUser")).favouriteItems;
    const Newfavorite = [];
    favorite.forEach(cItem => {
        if (cItem.id != id) {
            Newfavorite.push(cItem)
        };
    });
    const oldUserDetail = JSON.parse(localStorage.getItem("Cgroup50-LoggedInUser"));
    localStorage.removeItem("Cgroup50-LoggedInUser");
    const newUserDetails = { "Cgroup50-LoggedInUser": oldUserDetail["Cgroup50 - LoggedInUser"], "favouriteItems": Newfavorite };
    localStorage.setItem("Cgroup50-LoggedInUser", JSON.stringify(newUserDetails))


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
    location.href = 'Payment.html';
}