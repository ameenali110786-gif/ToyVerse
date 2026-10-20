/* TOYVERSE demo storefront. Edit STORE below to customise the brand and contact details. */
const STORE = {
  brand: "TOYVERSE",
  currency: "PKR",
  whatsappNumber: "", // Add international digits only, e.g. 923001234567. Do not include + or spaces.
  contactEmail: "hello@example.com"
};
const products = [
  {id:1,name:"Turbo Mini Racer",category:"RC Cars",price:7499,oldPrice:8999,rating:4.8,reviews:126,badge:"BESTSELLER",color:"#f0d2c8",image:"https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=800&q=85",description:"A pocket-sized speed machine for big-time racing adventures. Demo listing: verify features and age guidance before publishing."},
  {id:2,name:"Cloud Nine Teddy",category:"Plush Toys",price:3299,oldPrice:null,rating:4.9,reviews:84,badge:"SOFT FAVOURITE",color:"#f2dfaa",image:"https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=800&q=85",description:"A soft, snuggly companion for story time, nap time and every little adventure in between."},
  {id:3,name:"Build-It Big Blocks",category:"Building Blocks",price:4599,oldPrice:5299,rating:4.7,reviews:67,badge:"−13%",color:"#cbdfe8",image:"https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=85",description:"A colourful construction set for open-ended building, imaginative worlds and proud little makers."},
  {id:4,name:"Curiosity Lab Kit",category:"Educational",price:5899,oldPrice:null,rating:4.8,reviews:53,badge:"BRAINY PICK",color:"#dcd0eb",image:"https://images.unsplash.com/photo-1560961911-ba7ef651a56c?auto=format&fit=crop&w=800&q=85",description:"A playful starter for curious minds. Confirm the exact kit contents, safety details and recommended age before sale."},
  {id:5,name:"Robo Buddy Junior",category:"Robots",price:6299,oldPrice:6999,rating:4.6,reviews:42,badge:"NEW",color:"#cde0d2",image:"https://images.unsplash.com/photo-1535378620166-273708d44e4c?auto=format&fit=crop&w=800&q=85",description:"A futuristic friend for pretend missions and imaginative play. Product specifications shown here are illustrative."},
  {id:6,name:"Sky Hopper Plane",category:"Toy Airplanes",price:2799,oldPrice:null,rating:4.5,reviews:31,badge:"FLY HIGH",color:"#d4e5ec",image:"https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=800&q=85",description:"Take make-believe missions to the skies with a classic aircraft-inspired toy."},
  {id:7,name:"Action Hero: Nova",category:"Action Figures",price:3899,oldPrice:null,rating:4.7,reviews:58,badge:"FAN FAVOURITE",color:"#e8d0c8",image:"https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=800&q=85",description:"A hero for epic stories, dramatic rescues and adventures that go wherever imagination leads."},
  {id:8,name:"Rotor Rush Heli",category:"RC Helicopters",price:9999,oldPrice:11499,rating:4.6,reviews:29,badge:"−13%",color:"#e5d5ee",image:"https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=85",description:"An exciting remote-control-inspired pick for aspiring pilots. Verify control type, battery and safety specs before publishing."}
];
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const money = n => `Rs ${Number(n).toLocaleString("en-PK")}`;
let activeFilter = "All", searchTerm = "", sortMode = "featured";
let cart = {}, wishlist = new Set(), toastTimer;
const productGrid = $("#productGrid"), cartDrawer=$("#cartDrawer"), overlay=$("#overlay"), quickViewWrap=$("#quickViewWrap");

function applyBrand(){
  $$("[data-brand]").forEach(el=>el.textContent=STORE.brand);
  document.title=`${STORE.brand} — A Little Magic in Every Toy`;
  $("#year").textContent=new Date().getFullYear();
  $("#contactEmailLink").href=`mailto:${STORE.contactEmail}`;
}
function renderProducts(){
  let list=products.filter(p=>(activeFilter==="All"||p.category===activeFilter)&&`${p.name} ${p.category}`.toLowerCase().includes(searchTerm.toLowerCase()));
  if(sortMode==="low")list.sort((a,b)=>a.price-b.price);
  if(sortMode==="high")list.sort((a,b)=>b.price-a.price);
  if(sortMode==="name")list.sort((a,b)=>a.name.localeCompare(b.name));
  productGrid.innerHTML=list.map((p,i)=>`<article class="product-card" style="--card-bg:${p.color};animation-delay:${i*45}ms">
    <div class="product-image-wrap"><span class="product-badge ${p.oldPrice?'sale':''}">${p.badge}</span><button class="wish-btn ${wishlist.has(p.id)?'wished':''}" data-wish="${p.id}" aria-label="${wishlist.has(p.id)?'Remove from':'Add to'} wishlist">${wishlist.has(p.id)?'♥':'♡'}</button><img src="${p.image}" alt="${escapeHTML(p.name)}" loading="lazy"><button class="quick-btn" data-quick="${p.id}">QUICK VIEW ↗</button></div>
    <div class="product-info"><div class="product-category">${escapeHTML(p.category)}</div><div class="product-title-row"><h3 class="product-title">${escapeHTML(p.name)}</h3><div class="product-price">${p.oldPrice?`<span class="old-price">${money(p.oldPrice)}</span>`:''}${money(p.price)}</div></div><div class="rating" aria-label="Demo rating ${p.rating} out of 5">★★★★★ <span>${p.rating} · ${p.reviews} demo reviews</span></div><button class="add-btn" data-add="${p.id}">Add to bag <span>＋</span></button></div></article>`).join("");
  $("#emptyResults").classList.toggle("hidden",list.length!==0);
  productGrid.classList.toggle("hidden",list.length===0);
}
function escapeHTML(str){return String(str).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function showToast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2400);}
function addToCart(id){cart[id]=(cart[id]||0)+1;renderCart();showToast(`${products.find(p=>p.id===id).name} added to your bag ✦`);}
function setQty(id,qty){if(qty<=0)delete cart[id];else cart[id]=qty;renderCart();}
function renderCart(){
  const items=Object.entries(cart).map(([id,qty])=>({p:products.find(p=>p.id===Number(id)),qty})).filter(x=>x.p);
  const count=items.reduce((s,x)=>s+x.qty,0), subtotal=items.reduce((s,x)=>s+x.p.price*x.qty,0);
  $("#cartCount").textContent=count;$("#drawerCount").textContent=`(${count})`;$("#cartSubtotal").textContent=money(subtotal);
  $("#cartItems").innerHTML=items.map(({p,qty})=>`<div class="cart-line"><img src="${p.image}" alt="${escapeHTML(p.name)}"><div><div class="line-category">${escapeHTML(p.category)}</div><h3>${escapeHTML(p.name)}</h3><div class="line-price">${money(p.price)}</div><div class="qty-controls"><button data-qty="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${qty}</span><button data-qty="${p.id}" data-delta="1" aria-label="Increase quantity">+</button></div></div><button class="remove-line" data-remove="${p.id}" aria-label="Remove ${escapeHTML(p.name)}">×</button></div>`).join("");
  $("#cartEmpty").classList.toggle("visible",items.length===0);$("#cartFooter").classList.toggle("hidden",items.length===0);
}
function openCart(){cartDrawer.classList.add("open");cartDrawer.setAttribute("aria-hidden","false");overlay.classList.add("active");document.body.classList.add("locked");$("#closeCart").focus();}
function closeCart(){cartDrawer.classList.remove("open");cartDrawer.setAttribute("aria-hidden","true");overlay.classList.remove("active");document.body.classList.remove("locked");}
function showQuickView(id){
  const p=products.find(x=>x.id===Number(id));if(!p)return;
  $("#quickView").innerHTML=`<button class="quick-close" id="quickClose" aria-label="Close quick view">×</button><div class="quick-image" style="background:${p.color}"><img src="${p.image}" alt="${escapeHTML(p.name)}"></div><div class="quick-copy"><div class="eyebrow">${escapeHTML(p.category)} · DEMO PRODUCT</div><h2>${escapeHTML(p.name)}</h2><div class="rating">★★★★★ <span>${p.rating} · ${p.reviews} demo reviews</span></div><div class="quick-price">${money(p.price)} ${p.oldPrice?`<span class="old-price">${money(p.oldPrice)}</span>`:''}</div><p>${escapeHTML(p.description)}</p><p>Demo listing: confirm price, availability, age guidance and specifications before publishing.</p><button class="btn btn-dark" id="quickAdd" data-id="${p.id}">Add to bag <span>＋</span></button></div>`;
  quickViewWrap.classList.add("active");document.body.classList.add("locked");$("#quickClose").focus();
}
function closeQuickView(){quickViewWrap.classList.remove("active");if(!cartDrawer.classList.contains("open"))document.body.classList.remove("locked");}
function toggleWishlist(id){id=Number(id);if(wishlist.has(id)){wishlist.delete(id);showToast("Removed from your wishlist");}else{wishlist.add(id);showToast("Saved to your wishlist ♥");}$("#wishCount").textContent=wishlist.size;renderProducts();}
function whatsappMessage(){
  if(!STORE.whatsappNumber){showToast("Store WhatsApp number isn't configured yet. Edit STORE in app.js.");return;}
  const lines=Object.entries(cart).map(([id,qty])=>{const p=products.find(x=>x.id===Number(id));return `${p.name} × ${qty} — ${money(p.price*qty)}`;});
  const total=Object.entries(cart).reduce((sum,[id,qty])=>sum+products.find(p=>p.id===Number(id)).price*qty,0);
  const message=`Hello ${STORE.brand}! I'd like to ask about these toys:\n${lines.join("\n")}\nDemo subtotal: ${money(total)}\nPlease confirm current prices, stock and delivery details.`;
  window.open(`https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(message)}`,"_blank","noopener,noreferrer");
}
$("#filterPills").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;activeFilter=b.dataset.filter;$$(".filter-pill").forEach(x=>x.classList.toggle("active",x===b));renderProducts();});
$("#productSearch").addEventListener("input",e=>{searchTerm=e.target.value;renderProducts();});
$("#sortSelect").addEventListener("change",e=>{sortMode=e.target.value;renderProducts();});
productGrid.addEventListener("click",e=>{const add=e.target.closest("[data-add]"),quick=e.target.closest("[data-quick]"),wish=e.target.closest("[data-wish]");if(add)addToCart(Number(add.dataset.add));if(quick)showQuickView(quick.dataset.quick);if(wish)toggleWishlist(wish.dataset.wish);});
$("#emptyResults").addEventListener("click",e=>{if(e.target.id==="resetFilters"){activeFilter="All";searchTerm="";$("#productSearch").value="";$$(".filter-pill").forEach(x=>x.classList.toggle("active",x.dataset.filter==="All"));renderProducts();}});
$("#openCart").addEventListener("click",openCart);$("#closeCart").addEventListener("click",closeCart);$("#continueShopping").addEventListener("click",()=>{closeCart();$("#shop").scrollIntoView({behavior:"smooth"});});overlay.addEventListener("click",closeCart);
$("#cartItems").addEventListener("click",e=>{const q=e.target.closest("[data-qty]"),r=e.target.closest("[data-remove]");if(q)setQty(Number(q.dataset.qty),cart[q.dataset.qty]+Number(q.dataset.delta));if(r)setQty(Number(r.dataset.remove),0);});
$("#whatsappCheckout").addEventListener("click",whatsappMessage);
$("#quickView").addEventListener("click",e=>{if(e.target.closest("#quickClose"))closeQuickView();const b=e.target.closest("#quickAdd");if(b){addToCart(Number(b.dataset.id));closeQuickView();}});
quickViewWrap.addEventListener("click",e=>{if(e.target===quickViewWrap)closeQuickView();});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeCart();closeQuickView();$("#mobileNav").classList.remove("open");$("#mobileMenuBtn").setAttribute("aria-expanded","false");}});
$("#searchFocus").addEventListener("click",()=>{$("#productSearch").focus();$("#shop").scrollIntoView({behavior:"smooth"});});
$("#wishlistJump").addEventListener("click",()=>{if(wishlist.size===0){showToast("Tap a heart on any toy to save it here ♥");return;}activeFilter="All";searchTerm="";$("#productSearch").value="";$$(".filter-pill").forEach(x=>x.classList.toggle("active",x.dataset.filter==="All"));renderProducts();const ids=[...wishlist];productGrid.innerHTML=products.filter(p=>ids.includes(p.id)).map(p=>`<article class="product-card" style="--card-bg:${p.color}"><div class="product-image-wrap"><span class="product-badge">WISHLIST</span><button class="wish-btn wished" data-wish="${p.id}" aria-label="Remove from wishlist">♥</button><img src="${p.image}" alt="${escapeHTML(p.name)}"><button class="quick-btn" data-quick="${p.id}">QUICK VIEW ↗</button></div><div class="product-info"><div class="product-category">${p.category}</div><div class="product-title-row"><h3 class="product-title">${p.name}</h3><div class="product-price">${money(p.price)}</div></div><button class="add-btn" data-add="${p.id}">Add to bag <span>＋</span></button></div></article>`).join("");$("#shop").scrollIntoView({behavior:"smooth"});});
$("#mobileMenuBtn").addEventListener("click",()=>{const nav=$("#mobileNav"),open=nav.classList.toggle("open");$("#mobileMenuBtn").setAttribute("aria-expanded",String(open));$("#mobileMenuBtn").textContent=open?"×":"☰";});
$("#mobileNav").addEventListener("click",e=>{if(e.target.closest("a")){$("#mobileNav").classList.remove("open");$("#mobileMenuBtn").setAttribute("aria-expanded","false");$("#mobileMenuBtn").textContent="☰";}});
$$("[data-category-link]").forEach(link=>link.addEventListener("click",e=>{e.preventDefault();activeFilter=link.dataset.categoryLink;const filter=$(`[data-filter="${CSS.escape(activeFilter)}"]`);if(filter){$$(".filter-pill").forEach(x=>x.classList.toggle("active",x===filter));}else{activeFilter="All";$$(".filter-pill").forEach(x=>x.classList.toggle("active",x.dataset.filter==="All"));}renderProducts();$("#shop").scrollIntoView({behavior:"smooth"});}));
$("#newsletterForm").addEventListener("submit",e=>{e.preventDefault();const email=$("#newsletterEmail");if(!email.checkValidity()){email.reportValidity();return;}$("#newsletterMessage").textContent="Thanks! This demo form doesn't send or store email addresses.";showToast("Thanks for stopping by ✦");email.value="";});
applyBrand();renderProducts();renderCart();
if("IntersectionObserver"in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}}),{threshold:.12});$$(".reveal").forEach(el=>observer.observe(el));}else{$$(".reveal").forEach(el=>el.classList.add("visible"));}
