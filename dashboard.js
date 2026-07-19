// Security

if(sessionStorage.getItem("adminLoggedIn") !== "true"){

    window.location.href="admin.html";

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

    document.getElementById("totalOrders").textContent=data.length;

    const buyers=new Set(data.map(order=>order.username));

    document.getElementById("totalBuyers").textContent=buyers.size;

    const completed=data.filter(order=>order.status==="Arrived at Admin");

    const completed=data.filter(order=>order.status==="Completed");

    const recent=document.getElementById("recentOrders");

    recent.innerHTML="";

    data.slice(-5).reverse().forEach(order=>{

        recent.innerHTML+=`

        <div class="recent-card">

            <strong>${order.item}</strong>

            <p>${order.tag}</p>

            <span>${order.status}</span>

        </div>

        `;

    });

});
