// Security

if(sessionStorage.getItem("adminLoggedIn") !== "true"){

    window.location.href = "admin.html";

}

// Logout

document.getElementById("logoutBtn").addEventListener("click",()=>{

    sessionStorage.removeItem("adminLoggedIn");

    window.location.href="admin.html";

});

// Load Orders

fetch("orders.json")

.then(res=>res.json())

.then(data=>{

    const list=document.getElementById("ordersList");

    list.innerHTML="";

    data.forEach(order=>{

        list.innerHTML += `

        <div class="admin-order-card">

            <h3>${order.item}</h3>

            <p>${order.username}</p>

            <p>${order.tag}</p>

            <p>Qty: ${order.quantity}</p>

            <span>${order.status}</span>

        </div>

        `;

    });

});
