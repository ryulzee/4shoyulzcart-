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

searchBtn.addEventListener("click", () => {

    searchBtn.disabled = true;

    searchBtn.innerHTML = "Searching...";

    setTimeout(() => {

        searchOrders();

        searchBtn.disabled = false;

        searchBtn.innerHTML = "Track Order →";

    },600);

});

searchInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        searchOrders();

    }

});

// --------------------
// Search Function
// --------------------

function searchOrders(){

    const username = searchInput.value
    .trim()
    .toLowerCase()
    .replace(/^@/, "");
    
    localStorage.setItem("lastSearch", username);

    if(username === ""){

        alert("Please enter your Telegram username.");

        return;

    }

    const filtered = orders.filter(order =>

        order.username
    .toLowerCase()
    .replace(/^@/, "") === username

    );

    ordersContainer.innerHTML = "";

    if(filtered.length === 0){

        results.classList.add("hidden");
        empty.classList.remove("hidden");

        return;

    }

    empty.classList.add("hidden");
    results.classList.remove("hidden");

    buyerName.textContent = `@${username}`;

orderCount.textContent =
    `✨ ${filtered.length} Active ${filtered.length > 1 ? "Orders" : "Order"}`;
document.getElementById("statsNumber").textContent = filtered.length;
    filtered.forEach(order=>{

    createCard(order);

});

results.scrollIntoView({

    behavior:"smooth"

});

}

// --------------------
// Create Card
// --------------------

function createCard(order){

    const clone = template.content.cloneNode(true);

    clone.querySelector(".tag").textContent = order.tag;
    const tag = clone.querySelector(".tag");

tag.addEventListener("click", () => {

    navigator.clipboard.writeText(order.tag);

    const oldText = tag.textContent;

    tag.textContent = "✓ Copied!";

    setTimeout(() => {

        tag.textContent = oldText;

    }, 1200);

});

    clone.querySelector(".item").textContent = order.item;

    clone.querySelector(".quantity").textContent =
    order.quantity;

    const badge = clone.querySelector(".status");

    badge.textContent = getEmoji(order.status) + " " + order.status;

    badge.style.background = getBadge(order.status);

badge.style.color = "#fff";

badge.style.boxShadow =
`0 8px 20px ${getBadge(order.status)}55`;

    clone.querySelector(".updated span").textContent =
        order.updated;

    const steps = clone.querySelectorAll(".circle");
    const lines = clone.querySelectorAll(".line");

    const statusMap = {
        "Secured":0,
        "OTW to Warehouse":1,
        "Arrived at Warehouse":2,
        "OTW to Admin":3,
        "Arrived at Admin":4
    };

    const current = statusMap[order.status];

    steps.forEach((step,index)=>{

        if(index<=current){

            step.classList.add("active");

        }

    });

    lines.forEach((line,index)=>{

        if(index<current){

            line.classList.add("active");

        }

    });

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

// --------------------
// Latest Notice
// --------------------

fetch("notices.json")
.then(response => response.json())
.then(data => {

    const latest = data[0];

    const title = document.getElementById("noticeTitle");
    const message = document.getElementById("noticeMessage");
    const date = document.getElementById("noticeDate");

    if(title && message && date){

        title.textContent = latest.title;
        message.textContent = latest.message;
        date.textContent = "Updated • " + latest.date;

    }

});

// --------------------
// Last Search
// --------------------

const lastSearch = localStorage.getItem("lastSearch");

if(lastSearch){

    searchInput.value = "@" + lastSearch;

}

const clearBtn = document.getElementById("clearSearch");

if(clearBtn){

    clearBtn.addEventListener("click", () => {

        localStorage.removeItem("lastSearch");

        searchInput.value = "";

    });

}
