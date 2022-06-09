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
