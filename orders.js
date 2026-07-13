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

    list.innerHTML += `

<div class="admin-order-card">

    <h3>${order.item}</h3>

    <p>👤 ${order.username}</p>

    <p>🏷 ${order.tag}</p>

    <p>📦 Qty ×${order.quantity}</p>

    <span class="status-pill">${order.status}</span>

    <p class="updated">
        Updated • ${order.updated}
    </p>

    <div class="order-actions">

        <button class="copyBtn"
            data-order='${JSON.stringify(order)}'>
            📋 Copy JSON
        </button>

    </div>

</div>

`;

    });

});

document.addEventListener("click",(e)=>{

    if(e.target.classList.contains("copyBtn")){

        const order = JSON.parse(e.target.dataset.order);

        navigator.clipboard.writeText(

            JSON.stringify(order,null,4)

        );

        e.target.textContent = "✅ Copied!";

        setTimeout(()=>{

            e.target.textContent = "📋 Copy JSON";

        },1500);

    }

});
