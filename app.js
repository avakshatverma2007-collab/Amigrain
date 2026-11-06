const PRODUCTS = [
 {id:1,name:"Whole Wheat Atta",category:"Atta",emoji:"🌾",desc:"Everyday wheat flour for soft rotis and homemade meals.",prices:{"5 kg":100,"10 kg":175}},
 {id:2,name:"Multigrain Atta",category:"Atta",emoji:"🌿",desc:"A blend concept featuring wheat and selected grains.",prices:{"5 kg":140,"10 kg":260}},
 {id:3,name:"Bajra Atta",category:"Atta",emoji:"🌾",desc:"Traditional pearl millet flour for wholesome recipes.",prices:{"5 kg":160,"10 kg":300}},
 {id:4,name:"Madua / Ragi Atta",category:"Atta",emoji:"🌱",desc:"Finger millet flour for a variety of traditional dishes.",prices:{"5 kg":180,"10 kg":340}},
 {id:5,name:"Rice Flour",category:"Flour",emoji:"🍚",desc:"Fine rice flour for snacks, batters and everyday cooking.",prices:{"1 kg":55,"5 kg":250}},
 {id:6,name:"Besan",category:"Flour",emoji:"🥣",desc:"Gram flour for pakoras, chillas and Indian favourites.",prices:{"1 kg":90,"5 kg":420}},
 {id:7,name:"Traditional Sweets",category:"Sweets",emoji:"🍬",desc:"A sample sweets listing. Add actual varieties and weights before launch.",prices:{"500 g":180,"1 kg":340}}
];
const CART_KEY="ab_cart_v1", USER_KEY="ab_user_v1", ORDERS_KEY="ab_orders_v1";
let cart=JSON.parse(localStorage.getItem(CART_KEY)||"[]");
const $=id=>document.getElementById(id);
const money=n=>"₹"+Number(n).toLocaleString("en-IN");
function saveCart(){localStorage.setItem(CART_KEY,JSON.stringify(cart));updateCount()}
function updateCount(){$("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0)}
function toast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function renderProducts(filter="All"){
 $("productGrid").innerHTML=PRODUCTS.filter(p=>filter==="All"||p.category===filter).map(p=>`
 <article class="product-card"><div class="product-art">${p.emoji}<span>AMIGRAIN</span></div><div class="product-info"><h3>${p.name}</h3><p>${p.desc}</p><div class="price-row"><b>${money(Object.values(p.prices)[0])}</b><select id="size-${p.id}" aria-label="Choose pack size">${Object.entries(p.prices).map(([s,v])=>`<option value="${s}">${s} · ${money(v)}</option>`).join("")}</select></div><button class="add-btn" data-add="${p.id}">＋ Add to cart</button></div></article>`).join("");
}
function addProduct(id){const p=PRODUCTS.find(x=>x.id===id),size=$("size-"+id).value,price=p.prices[size],key=id+"-"+size;let item=cart.find(x=>x.key===key);if(item)item.qty++;else cart.push({key,id,name:p.name,size,price,qty:1});saveCart();renderCart();toast("Added to your cart")}
function total(){return cart.reduce((s,x)=>s+x.price*x.qty,0)}
function renderCart(){
 $("cartItems").innerHTML=cart.length?cart.map(x=>`<div class="cart-item"><div><b>${x.name}</b><small>${x.size} · ${money(x.price)} each</small><small>${money(x.price*x.qty)}</small></div><div class="qty-controls"><button data-qty="${x.key}" data-delta="-1">−</button><b>${x.qty}</b><button data-qty="${x.key}" data-delta="1">+</button></div></div>`).join(""):'<p class="muted">Your cart is empty. Add something delicious!</p>';
 $("cartTotal").textContent=money(total());updateCount();
}
function showLayer(id){$("overlay").classList.remove("hidden");$(id).classList.remove("hidden")}
function closeLayers(){ $("overlay").classList.add("hidden");["cartDrawer","authModal","checkoutModal","ordersModal"].forEach(id=>$(id).classList.add("hidden"))}
function openCart(){renderCart();showLayer("cartDrawer")}
function currentUser(){try{return JSON.parse(localStorage.getItem(USER_KEY)||"null")}catch{return null}}
function openAuth() {
  const u = currentUser();

  $("authName").value = u?.name || "";
  $("authPhone").value = u?.phone || "";
  $("otpSection").classList.add("hidden");
  $("authMessage").textContent = "";

  showLayer("authModal");
}
function openOrders(){
 const u=currentUser();if(!u){openAuth();toast("Please register or login first");return}
 const orders=JSON.parse(localStorage.getItem(ORDERS_KEY)||"[]").filter(o=>o.identity===u.identity);
 $("ordersList").innerHTML=orders.length?orders.slice().reverse().map(o=>`<div class="order-card"><b>Order ${o.id}</b> · ${o.date}<p>${o.items.map(i=>`${i.name} (${i.size}) × ${i.qty}`).join("<br>")}</p><b>${money(o.total)}</b><p>Payment: ${o.payment} · Status: ${o.status}</p><p>Delivery: ${o.address}</p></div>`).join(""):"<p class='muted'>No orders found on this device yet.</p>";
 showLayer("ordersModal");
}
function checkout(){
 if(!cart.length){toast("Your cart is empty");return}
 const u=currentUser();if(!u){openAuth();toast("Please register or login to continue");return}
 $("customerName").value=u.name||"";$("customerPhone").value=/^\d{10}$/.test(u.identity)?u.identity:"";
 $("checkoutSummary").innerHTML=cart.map(x=>`<div class="summary-item"><span>${x.name} · ${x.size} × ${x.qty}</span><b>${money(x.price*x.qty)}</b></div>`).join("");
 $("checkoutTotal").textContent=money(total());showLayer("checkoutModal");
}
function placeOrder(){
 const name=$("customerName").value.trim(),phone=$("customerPhone").value.trim(),address=$("customerAddress").value.trim();
 if(!name||!/^\d{10}$/.test(phone)||address.length<10){toast("Enter name, valid 10-digit phone and full address");return}
 const method=document.querySelector('input[name="payment"]:checked').value;
 const u=currentUser(),orders=JSON.parse(localStorage.getItem(ORDERS_KEY)||"[]");
 const order={id:"AB"+Date.now().toString().slice(-7),date:new Date().toLocaleString("en-IN"),identity:u.identity,name,phone,address,items:cart.map(x=>({...x})),total:total(),payment:method,status:method==="COD"?"Order placed – Cash on Delivery":"Payment pending – confirm with payment provider"};
 orders.push(order);localStorage.setItem(ORDERS_KEY,JSON.stringify(orders));
 cart=[];saveCart();closeLayers();toast("Order saved on this device");
 if(method==="UPI"){
   // Replace the placeholder UPI ID in app.js before enabling real payments.
   const upiId="YOUR_UPI_ID@okaxis";
   const upiUrl=`upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent("AMIGRAIN")}&am=${order.total.toFixed(2)}&cu=INR&tn=${encodeURIComponent("Order "+order.id)}`;
   setTimeout(()=>{if(upiId.includes("YOUR_UPI_ID")){alert("Demo setup: replace YOUR_UPI_ID@okaxis in app.js with the merchant's verified UPI ID before accepting payments.");}else{location.href=upiUrl;}},250);
 } else {alert("Thank you! Your demo order "+order.id+" has been saved. Contact AMIGRAIN to confirm delivery.");}
}
$("productGrid").addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)addProduct(Number(b.dataset.add))});
$("filters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderProducts(b.dataset.filter)});
$("cartBtn").onclick=openCart;$("ordersBtn").onclick=openOrders;$("menuOrders").onclick=()=>{ $("menuPanel").classList.add("hidden");openOrders()};$("loginMenu").onclick=()=>{ $("menuPanel").classList.add("hidden");openAuth()};
$("menuBtn").onclick=()=>$("menuPanel").classList.toggle("hidden");
$("checkoutBtn").onclick=checkout;$("placeOrderBtn").onclick=placeOrder;

$("cartItems").addEventListener("click",e=>{const b=e.target.closest("[data-qty]");if(!b)return;const item=cart.find(x=>x.key===b.dataset.qty);if(item){item.qty+=Number(b.dataset.delta);if(item.qty<=0)cart=cart.filter(x=>x.key!==item.key);saveCart();renderCart()}});
$("customerAddress").addEventListener("input",()=>{const q=encodeURIComponent($("customerAddress").value.trim());$("mapLink").href=q?`https://www.google.com/maps/search/?api=1&query=${q}`:"https://maps.google.com"});
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=closeLayers);$("overlay").onclick=closeLayers;
$("year").textContent=new Date().getFullYear();renderProducts();updateCount();
// AMIGRAIN - Google Authentication
const googleSignInBtn = $("googleSignInBtn");

googleSignInBtn.addEventListener("click", async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  } catch (error) {
    console.error("Google login error:", error);
    toast("Google login failed: " + error.code + " - " + error.message);
  }
});

// Keep customer login saved
auth.onAuthStateChanged(user => {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify({
      name: user.displayName || "Customer",
      identity: user.email || user.uid,
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL
    }));

    closeLayers();
    toast("Welcome to AMIGRAIN!");
  }
});
