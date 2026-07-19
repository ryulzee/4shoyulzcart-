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

    document.getElementById("totalCount").textContent = data.length;

    document.getElementById("securedCount").textContent =
    data.filter(o=>o.status==="Secured").length;

    document.getElementById("warehouseCount").textContent =
    data.filter(o=>o.status==="OTW to Warehouse").length;

    document.getElementById("arrivedCount").textContent =
    data.filter(o=>o.status==="Arrived at Warehouse").length;

    document.getElementById("adminCount").textContent =
    data.filter(o=>o.status==="Arrived at Admin").length;

    document.getElementById("doneCount").textContent =
    data.filter(o => o.status === "Done").length;

    const list=document.getElementById("ordersList");

    list.innerHTML="";

    data.forEach(order=>{

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

        <button
            class="copyBtn"
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

const modal = document.getElementById("orderModal");

function today(){

    const options={

        day:"numeric",

        month:"short",

        year:"numeric"

    };

    return new Date().toLocaleDateString(

        "en-GB",

        options

    );

}

document.getElementById("addOrderBtn").onclick=()=>{

    document.getElementById("newUpdated").value=today();

    modal.classList.remove("hidden");

};

document.getElementById("closeModal").onclick = () => {

    modal.classList.add("hidden");

};

document.getElementById("generateBtn").onclick = () => {

    const order = {

        username: document.getElementById("newUsername").value,

        item: document.getElementById("newItem").value,

        tag: document.getElementById("newTag").value,

        quantity: Number(document.getElementById("newQty").value),

        status: document.getElementById("newStatus").value,

        updated: document.getElementById("newUpdated").value

    };

    document.getElementById("generatedJson").value = JSON.stringify(order,null,4);

};

document.getElementById("copyGenerated").onclick = ()=>{

    const textarea = document.getElementById("generatedJson");

    if(textarea.value===""){

        alert("Generate JSON first.");

        return;

    }

    navigator.clipboard.writeText(textarea.value);

    const btn = document.getElementById("copyGenerated");

    btn.textContent="✅ Copied!";

    setTimeout(()=>{

        btn.textContent="Copy";

    },1500);

})
