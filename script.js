// ===============================
// 4shoyulz Cart
// Version 1.0
// ===============================

const loadingScreen = document.getElementById("loading-screen");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

const resultSection = document.getElementById("resultSection");
const emptyState = document.getElementById("emptyState");

const buyerTitle = document.getElementById("buyerTitle");
const totalOrders = document.getElementById("totalOrders");
const ordersContainer = document.getElementById("ordersContainer");

let orders = [];

// Hide loading screen
window.addEventListener("load", () => {
    setTimeout(() => {
        loadingScreen.style.display = "none";
    }, 1000);
});

// Load orders.json
fetch("orders.json")
    .then(response => response.json())
    .then(data => {
        orders = data;
    })
    .catch(error => {
        console.error("Failed to load orders:", error);
    });

// Search button
searchBtn.addEventListener("click", searchOrders);

// Press Enter to search
searchInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        searchOrders();
    }
});

function searchOrders(){

    const username = searchInput.value.trim().toLowerCase();

    if(username === ""){
        alert("Please enter your Telegram username.");
        return;
    }

    const results = orders.filter(order =>
        order.username.toLowerCase() === username
    );

    ordersContainer.innerHTML = "";

    if(results.length === 0){

        resultSection.classList.add("hidden");
        emptyState.classList.remove("hidden");

        return;

    }

    emptyState.classList.add("hidden");
    resultSection.classList.remove("hidden");

    buyerTitle.textContent = username;
    totalOrders.textContent = `${results.length} Order(s) Found`;

    results.forEach(order => {

        const card = document.createElement("div");
        card.className = "order-card";

        card.innerHTML = `
            <div class="tag">${order.tag}</div>

            <h3>${order.item}</h3>

            <p><strong>Quantity:</strong> x${order.quantity}</p>

            <div class="status">
                ${order.status}
            </div>

            <div class="progress">
                ${getProgress(order.status)}
            </div>
        `;

        ordersContainer.appendChild(card);

    });

}

function getProgress(status){

    switch(status){

        case "Secured":
            return "●━━━━○━━━━○━━━━○━━━━○";

        case "OTW to Warehouse":
            return "●━━━━●━━━━○━━━━○━━━━○";

        case "Arrived at Warehouse":
            return "●━━━━●━━━━●━━━━○━━━━○";

        case "OTW to Admin":
            return "●━━━━●━━━━●━━━━●━━━━○";

        case "Arrived at Admin":
            return "●━━━━●━━━━●━━━━●━━━━●";

        default:
            return "";

    }

              }
