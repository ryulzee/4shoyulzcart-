// ===============================
// 4shoyulz Cart
// Version 2.0
// ===============================

const loading = document.getElementById("loading");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const results = document.getElementById("results");
const empty = document.getElementById("empty");

const buyerName = document.getElementById("buyerName");
const orderCount = document.getElementById("orderCount");
const ordersContainer = document.getElementById("ordersContainer");

const template = document.getElementById("orderTemplate");

let orders = [];

// --------------------
// Loading Screen
// --------------------

window.addEventListener("load", () => {

    setTimeout(() => {

        loading.style.display = "none";

    }, 1000);

});

// --------------------
// Load JSON
// --------------------

fetch("orders.json")
.then(response => response.json())
.then(data => {

    orders = data;

})
.catch(error => {

    console.error(error);

});

// --------------------
// Search Button
// --------------------

searchBtn.addEventListener("click", searchOrders);

searchInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        searchOrders();

    }

});

// --------------------
// Search Function
// --------------------

function searchOrders(){

    const username = searchInput.value.trim().toLowerCase();

    if(username === ""){

        alert("Please enter your Telegram username.");

        return;

    }

    const filtered = orders.filter(order =>

        order.username.toLowerCase() === username

    );

    ordersContainer.innerHTML = "";

    if(filtered.length === 0){

        results.classList.add("hidden");
        empty.classList.remove("hidden");

        return;

    }

    empty.classList.add("hidden");
    results.classList.remove("hidden");

    buyerName.textContent = `Orders for ${username}`;
    orderCount.textContent = `${filtered.length} Order(s) Found`;

    filtered.forEach(order => {

        createCard(order);

    });

}

// --------------------
// Create Card
// --------------------

function createCard(order){

    const clone = template.content.cloneNode(true);

    clone.querySelector(".tag").textContent = order.tag;

    clone.querySelector(".item").textContent = order.item;

    clone.querySelector(".quantity span").textContent =
        "x" + order.quantity;

    const badge = clone.querySelector(".status");

    badge.textContent = getEmoji(order.status) + " " + order.status;

    badge.style.background = getBadge(order.status);

    const progressFill = clone.querySelector(".progress-fill");
    const progressText = clone.querySelector(".progress-text");

    const percent = getProgress(order.status);

    progressFill.style.width = percent + "%";

    progressText.textContent = percent + "%";

    clone.querySelector(".updated span").textContent =
        order.updated;

    ordersContainer.appendChild(clone);

}

// --------------------
// Progress
// --------------------

function getProgress(status){

    switch(status){

        case "Secured":

            return 20;

        case "OTW to Warehouse":

            return 40;

        case "Arrived at Warehouse":

            return 60;

        case "OTW to Admin":

            return 80;

        case "Arrived at Admin":

            return 100;

        default:

            return 0;

    }

}

// --------------------
// Status Emoji
// --------------------

function getEmoji(status){

    switch(status){

        case "Secured":

            return "🤍";

        case "OTW to Warehouse":

            return "🚚";

        case "Arrived at Warehouse":

            return "📦";

        case "OTW to Admin":

            return "🚛";

        case "Arrived at Admin":

            return "🏠";

        default:

            return "";

    }

}

// --------------------
// Badge Colour
// --------------------

function getBadge(status){

    switch(status){

        case "Secured":

            return "#4a4a4a";

        case "OTW to Warehouse":

            return "#6f4b1d";

        case "Arrived at Warehouse":

            return "#20527d";

        case "OTW to Admin":

            return "#5f3d77";

        case "Arrived at Admin":

            return "#206641";

        default:

            return "#444";

    }

}
