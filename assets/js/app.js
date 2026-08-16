/* =========================================================
   PRODUCT DATABASE

   EDIT PRODUCTS HERE
========================================================= */

const products = [

    {
        code:"TW-SF-001",
        name:"Luxury Sofa",
        category:"sofa",
        categoryName:"Sofa",
        price:135000,
        oldPrice:150000,
        rating:"4.9 (42)",
        badge:"BEST SELLER",
        image:"img/product/sofaset1.webp",
        material:"Premium Fabric & Wood",
        availability:"In Stock",
        description:
        "Premium luxury sofa designed for modern living rooms with comfortable seating and elegant proportions.",
        featured:true,
        newest:true
    },

    {
        code:"TW-SF-002",
        name:"Single Seater Sofa",
        category:"sofa",
        categoryName:"Sofa",
        price:25000,
        oldPrice:30000,
        rating:"4.8 (28)",
        badge:"POPULAR",
        image:"img/product/sofaset3.webp",
        material:"Fabric & Hardwood",
        availability:"In Stock",
        description:
        "Comfortable three-seater sofa suitable for contemporary homes and apartments.",
        featured:true
    },

    {
        code:"TW-SF-003",
        name:"Modern L Shape Sofa",
        category:"sofa",
        categoryName:"Sofa",
        price:81000,
        oldPrice:90000,
        rating:"4.9 (32)",
        badge:"NEW",
        image:"img/product/sofaset2.webp",
        material:"Premium Fabric",
        availability:"Available",
        description:
        "Spacious L-shaped sofa designed for larger living rooms.",
        newest:true
    },

    {
        code:"TW8317BD",
        name:"Premium King Size Bed",
        category:"bed",
        categoryName:"Bed",
        price:107100,
        oldPrice:119000,
        rating:"4.8 (16)",
        badge:"NEW",
        image:"img/product/bed1.webp",
        material:"Solid Wood",
        availability:"In Stock",
        description:
        "Modern plywood bed with a clean profile and timeless design.",
        featured:true,
        newest:true
    },

    {
        code:"TW-BD-002",
        name:"Premium Bedroom Bed",
        category:"bed",
        categoryName:"Bed",
        price:118800,
        oldPrice:132000,
        rating:"4.8 (21)",
        badge:"POPULAR",
        image:"img/product/bed2.webp",
        material:"Engineered Wood",
        availability:"Available",
        description:
        "Elegant bedroom bed designed for comfortable and stylish interiors."
    },

    {
        code:"Standard",
        name:"4 Seater Dining Set",
        category:"dining",
        categoryName:"Dining",
        price:88000,
        oldPrice:98000,
        rating:"4.9 (35)",
        badge:"BEST SELLER",
        image:"img/product/diningsets1.webp",
        material:"Solid PlyWood",
        availability:"In Stock",
        description:
        "Four-seater dining set designed for family meals and entertaining guests.",
        featured:true
    },

    {
        code:"TW-DT-002",
        name:"Modern 3 Seater Dining Set",
        category:"dining",
        categoryName:"Dining",
        price:21700,
        oldPrice:24955,
        rating:"4.7 (18)",
        badge:"NEW",
        image:"img/product/diningsets2.webp",
        material:"Wood & Veneer",
        availability:"Available",
        description:
        "Compact dining set suitable for modern apartments.",
        newest:true
    },

    {
        code:"TW-CH-001",
        name:"Premium Dining Chair",
        category:"chair",
        categoryName:"Chair",
        price:17100,
        oldPrice:19000,
        rating:"4.7 (21)",
        badge:"SALE",
        image:"img/product/dining1.webp",
        material:"Wood & Fabric",
        availability:"In Stock",
        description:
        "Comfortable dining chair with premium upholstery."
    },

    {
        code:"TW-CH-002",
        name:"Modern Dining Chair",
        category:"chair",
        categoryName:"Chair",
        price:17100,
        oldPrice:19000,
        rating:"4.8 (19)",
        badge:"POPULAR",
        image:"img/product/dining2.webp",
        material:"Wood & Fabric",
        availability:"Available",
        description:
        "Modern dining chair designed for contemporary dining rooms."
    },

    {
        code:"Tulip Royale",
        name:"Cafeteria Seating Chair",
        category:"chair",
        categoryName:"Chair",
        price:7830,
        oldPrice:8700,
        rating:"4.8 (24)",
        badge:"NEW",
        image:"https://qedocafeteriaseating.com/assets/images/products/all-500px/tulip-royale-gray.jpg",
        material:"Fabric & Wood",
        availability:"In Stock",
        description:
        "Stylish cafeteria chair for cafe, Restaurant and lounges.",
        newest:true
    },

    {
        code:"GP-109",
        name:"Executive Office Chair",
        category:"office",
        categoryName:"Office",
        price:33300,
        oldPrice:37000,
        rating:"4.8 (12)",
        badge:"NEW",
        image:"https://geeken.in/storage/1243/GP-133.png",
        material:"PU Leather & Metal",
        availability:"In Stock",
        description:
        "Professional executive office chair designed for comfort and long working hours.",
        newest:true
    },

    {
        code:"TW-OC-002",
        name:"Executive Office Table",
        category:"office",
        categoryName:"Office",
        price:51000,
        oldPrice:60000,
        rating:"4.8 (14)",
        badge:"FEATURED",
        image:"img/product/officetable2.webp",
        material:"Engineered PlyWood",
        availability:"Available",
        description:
        "Professional office desk with generous workspace and modern styling."
    },

    {
        code:"TW-CT-001",
        name:"Cloudy Centre Table",
        category:"table",
        categoryName:"Centre Table",
        price:25000,
        oldPrice:30000,
        rating:"4.8 (25)",
        badge:"FEATURED",
        image:"img/product/centretable2.webp",
        material:"Engineered Wood",
        availability:"In Stock",
        description:
        "Minimal white centre table suitable for modern living rooms.",
        featured:true
    },

    {
        code:"TW-CT-002",
        name:"Modern Coffee Table",
        category:"table",
        categoryName:"Centre Table",
        price:25000,
        oldPrice:30000,
        rating:"4.7 (18)",
        badge:"10% OFF",
        image:"img/product/centretable3.webp",
        material:"PlyWood & Veneer",
        availability:"Available",
        description:
        "Modern coffee table with practical proportions and elegant styling."
    },

    {
        code:"TW-CT-003",
        name:"Premium Centre Table",
        category:"table",
        categoryName:"Centre Table",
        price:27000,
        oldPrice:30000,
        rating:"4.9 (31)",
        badge:"NEW",
        image:"img/product/centretable1.webp",
        material:"Wood & Glass",
        availability:"In Stock",
        description:
        "Premium centre table designed as a statement piece.",
        newest:true
    },

    {
        code:"TW-WR-001",
        name:"Modern Wardrobe",
        category:"wardrobe",
        categoryName:"Wardrobe",
        price:95000,
        oldPrice:105000,
        rating:"4.8 (19)",
        badge:"NEW",
        image:"img/product/wardrobe1.webp",
        material:"Signature PlyWood",
        availability:"Available",
        description:
        "Modern sliding wardrobe with practical storage and contemporary finishes.",
        featured:true
    },

       {
        code:"TW-WR-002",
        name:"Modern Wardrobe",
        category:"wardrobe",
        categoryName:"Wardrobe",
        price:81000,
        oldPrice:90000,
        rating:"4.8 (19)",
        badge:"FEATURED",
        image:"img/product/wardrobe2.webp",
        material:"Signature PlyWood",
        availability:"Available",
        description:
        "Modern sliding wardrobe with practical storage and contemporary finishes.",
        featured:true
    },

    {
        code:"TW-SR-001",
        name:"Modern Shoe Rack",
        category:"shoe",
        categoryName:"Shoe Rack",
        price:12500,
        oldPrice:14000,
        rating:"4.6 (14)",
        badge:"NEW",
        image:"img/product/wardrobe2.webp",
        material:"Laminates | PlyWood",
        availability:"In Stock",
        description:
        "Compact modern shoe rack for organized home entrances.",
        newest:true
    }

];


/* =========================================================
   CART & WISHLIST
========================================================= */

let cart =
    JSON.parse(
        localStorage.getItem("timberwoodCart")
    ) || [];

let wishlist =
    JSON.parse(
        localStorage.getItem("timberwoodWishlist")
    ) || [];


/* =========================================================
   PRICE
========================================================= */

function formatPrice(price){

    return "Rs. " +
        Number(price).toLocaleString("en-IN");

}


/* =========================================================
   SAVE DATA
========================================================= */

function saveCart(){

    localStorage.setItem(
        "timberwoodCart",
        JSON.stringify(cart)
    );

}

function saveWishlist(){

    localStorage.setItem(
        "timberwoodWishlist",
        JSON.stringify(wishlist)
    );

}


/* =========================================================
   PRODUCT CARD
========================================================= */

function productCard(product){

    let active =
        wishlist.includes(product.code)
        ? "active"
        : "";

    let heart =
        wishlist.includes(product.code)
        ? "♥"
        : "♡";

    return `

    <article
        class="card product-item"
        data-category="${product.category}"
        data-price="${product.price}"
        data-name="${product.name}"
        data-code="${product.code}"
    >

        <div class="image">

            ${
                product.badge
                ?
                `<span class="badge ${
                    product.badge==="SALE"
                    ? "sale"
                    :
                    product.badge==="NEW"
                    ? "new"
                    : ""
                }">
                    ${product.badge}
                </span>`
                :
                ""
            }

            <button
                class="wish ${active}"
                onclick="toggleWishlist('${product.code}',this)"
            >
                ${heart}
            </button>

            <img
                src="${product.image}"
                alt="${product.name}"
                onerror="this.src='images/placeholder.jpg'"
            >

        </div>


        <div class="info">

            <div class="category">
                ${product.categoryName}
            </div>

            <div class="name">
                ${product.name}
            </div>

            <div class="code">
                ${product.code}
            </div>

            <div class="rating">
                ★★★★★
                <span>${product.rating}</span>
            </div>

            <div class="price">

                <span class="current">
                    ${formatPrice(product.price)}
                </span>

                ${
                    product.oldPrice
                    ?
                    `<span class="old">
                        ${formatPrice(product.oldPrice)}
                    </span>`
                    :
                    ""
                }

            </div>


            <div class="card-actions">

                <button
                    class="add"
                    onclick="addCartByCode('${product.code}')"
                >
                    Add to Cart
                </button>

                <button
                    class="detail"
                    onclick="openProduct('${product.code}')"
                >
                    View Details
                </button>

            </div>

        </div>

    </article>

    `;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts(){

    let grid =
        document.getElementById("productGrid");

    grid.innerHTML =
        products
        .map(productCard)
        .join("");

}


/* =========================================================
   BEST SELLERS
========================================================= */

function renderBestSellers(){

    let grid =
        document.getElementById("bestSellerGrid");

    let items =
        products
        .filter(p=>p.featured)
        .slice(0,4);

    grid.innerHTML =
        items.map(productCard).join("");

}


/* =========================================================
   TABLES
========================================================= */

function renderTables(){

    let grid =
        document.getElementById("tableGrid");

    let items =
        products
        .filter(p=>p.category==="table");

    grid.innerHTML =
        items.map(productCard).join("");

}


/* =========================================================
   CHAIRS
========================================================= */

function renderChairs(){

    let grid =
        document.getElementById("chairGrid");

    let items =
        products
        .filter(p=>p.category==="chair");

    grid.innerHTML =
        items.map(productCard).join("");

}


/* =========================================================
   ADD TO CART
========================================================= */

function addCartByCode(code){

    let product =
        products.find(
            p=>p.code===code
        );

    if(!product) return;

    let item =
        cart.find(
            x=>x.code===code
        );

    if(item){

        item.quantity++;

    }else{

        cart.push({

            code:product.code,

            name:product.name,

            price:product.price,

            image:product.image,

            quantity:1

        });

    }

    saveCart();

    updateCart();

    showToast(
        product.name +
        " added to cart"
    );

}


/* =========================================================
   UPDATE CART
========================================================= */

function updateCart(){

    let count =
        cart.reduce(
            (sum,item)=>
            sum + item.quantity,
            0
        );

    document.getElementById(
        "cartCount"
    ).innerText=count;


    let html="";


    cart.forEach(
        (item,index)=>{

            html+=`

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    onerror="this.src='images/placeholder.jpg'"
                >

                <div>

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        ${formatPrice(item.price)}
                    </p>


                    <div class="cart-controls">

                        <button
                            class="qty-btn"
                            onclick="changeQuantity(${index},-1)"
                        >
                            −
                        </button>

                        <span class="qty">
                            ${item.quantity}
                        </span>

                        <button
                            class="qty-btn"
                            onclick="changeQuantity(${index},1)"
                        >
                            +
                        </button>

                        <button
                            class="remove"
                            onclick="removeCart(${index})"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            </div>

            `;

        }
    );


    if(!cart.length){

        html=`

        <p
            style="
            text-align:center;
            padding:45px 0;
            color:#777;
            font-size:11px;
            "
        >
            Your cart is empty.
        </p>

        `;

    }


    document.getElementById(
        "cartItems"
    ).innerHTML=html;


    let total =
        cart.reduce(
            (sum,item)=>
            sum +
            item.price *
            item.quantity,
            0
        );


    document.getElementById(
        "total"
    ).innerText =
        formatPrice(total);

}


/* =========================================================
   QUANTITY
========================================================= */

function changeQuantity(index,amount){

    cart[index].quantity += amount;

    if(cart[index].quantity<=0){

        cart.splice(index,1);

    }

    saveCart();

    updateCart();

}


/* =========================================================
   REMOVE
========================================================= */

function removeCart(index){

    cart.splice(index,1);

    saveCart();

    updateCart();

    showToast(
        "Product removed from cart"
    );

}


/* =========================================================
   OPEN CART
========================================================= */

function openCart(){

    document
        .getElementById("cart")
        .classList.add("open");

    document
        .getElementById("overlay")
        .classList.add("show");

}


/* =========================================================
   CLOSE CART
========================================================= */

function closeCart(){

    document
        .getElementById("cart")
        .classList.remove("open");

    document
        .getElementById("overlay")
        .classList.remove("show");

}


/* =========================================================
   WISHLIST
========================================================= */

function toggleWishlist(code,button){

    let index =
        wishlist.indexOf(code);

    if(index===-1){

        wishlist.push(code);

        button.classList.add("active");

        button.innerText="♥";

        showToast(
            "Added to wishlist"
        );

    }else{

        wishlist.splice(index,1);

        button.classList.remove("active");

        button.innerText="♡";

        showToast(
            "Removed from wishlist"
        );

    }

    saveWishlist();

    updateWishlistCount();

}


/* =========================================================
   WISHLIST COUNT
========================================================= */

function updateWishlistCount(){

    document.getElementById(
        "wishlistCount"
    ).innerText =
        wishlist.length;

}


/* =========================================================
   SHOW WISHLIST
========================================================= */

function showWishlist(){

    if(!wishlist.length){

        showToast(
            "Your wishlist is empty"
        );

        return;

    }

    let grid =
        document.getElementById(
            "productGrid"
        );

    let cards =
        grid.querySelectorAll(
            ".product-item"
        );

    cards.forEach(card=>{

        card.classList.toggle(
            "hidden",
            !wishlist.includes(
                card.dataset.code
            )
        );

    });

    document.getElementById(
        "productCount"
    ).innerText =
        wishlist.length +
        " wishlist products";

    scrollToSection(
        "all-products"
    );

}


/* =========================================================
   FILTER CATEGORY
========================================================= */

function filterCategory(
    category,
    button
){

    let cards =
        getProducts();

    let count=0;

    cards.forEach(card=>{

        let show =
            category==="all" ||
            card.dataset.category===category;

        card.classList.toggle(
            "hidden",
            !show
        );

        if(show) count++;

    });


    document
        .querySelectorAll(".filter")
        .forEach(
            x=>x.classList.remove("active")
        );

    if(button){

        button.classList.add("active");

    }


    document.getElementById(
        "productCount"
    ).innerText =
        count +
        " products";


    document
        .getElementById("all-products")
        .scrollIntoView({
            behavior:"smooth"
        });

}


/* =========================================================
   SHOW CATEGORY
========================================================= */

function showCategory(category){

    let cards =
        getProducts();

    cards.forEach(card=>{

        let show =
            category==="all" ||
            card.dataset.category===category;

        card.classList.toggle(
            "hidden",
            !show
        );

    });


    let count =
        cards.filter(
            card=>
            !card.classList.contains("hidden")
        ).length;


    document.getElementById(
        "productCount"
    ).innerText =
        count +
        " products";


    document
        .getElementById("all-products")
        .scrollIntoView({
            behavior:"smooth"
        });

}


/* =========================================================
   PRICE FILTER
========================================================= */

function filterPrice(
    type,
    button
){

    let cards =
        getProducts();

    let count=0;


    cards.forEach(card=>{

        let price =
            Number(card.dataset.price);

        let show=true;


        if(type==="under10")
            show=price<10000;


        if(type==="10to20")
            show=
                price>=10000 &&
                price<=20000;


        if(type==="over20")
            show=price>20000;


        card.classList.toggle(
            "hidden",
            !show
        );


        if(show) count++;

    });


    document
        .querySelectorAll(".filter")
        .forEach(
            x=>x.classList.remove("active")
        );


    if(button)
        button.classList.add("active");


    document.getElementById(
        "productCount"
    ).innerText =
        count +
        " products";


    document
        .getElementById("all-products")
        .scrollIntoView({
            behavior:"smooth"
        });

}


/* =========================================================
   SEARCH
========================================================= */

function searchProducts(){

    let search =
        document
        .getElementById("search")
        .value
        .toLowerCase()
        .trim();


    let cards =
        getProducts();

    let count=0;


    cards.forEach(card=>{

        let text =
            (
                card.dataset.name +
                " " +
                card.dataset.category +
                " " +
                card.dataset.code
            )
            .toLowerCase();


        let show =
            !search ||
            text.includes(search);


        card.classList.toggle(
            "hidden",
            !show
        );


        if(show) count++;

    });


    document.getElementById(
        "productCount"
    ).innerText =
        search
        ?
        count+" products found"
        :
        "Showing all products";

}


/* =========================================================
   GET PRODUCTS
========================================================= */

function getProducts(){

    return [
        ...document.querySelectorAll(
            "#productGrid .product-item"
        )
    ];

}


/* =========================================================
   SORT
========================================================= */

function sortProducts(){

    let grid =
        document.getElementById(
            "productGrid"
        );

    let cards =
        getProducts();

    let sort =
        document.getElementById(
            "sort"
        ).value;


    if(sort==="low"){

        cards.sort(
            (a,b)=>
            Number(a.dataset.price) -
            Number(b.dataset.price)
        );

    }


    if(sort==="high"){

        cards.sort(
            (a,b)=>
            Number(b.dataset.price) -
            Number(a.dataset.price)
        );

    }


    if(sort==="new"){

        cards.sort(
            (a,b)=>{

                let aProduct =
                    products.find(
                        p=>p.code===
                        a.dataset.code
                    );

                let bProduct =
                    products.find(
                        p=>p.code===
                        b.dataset.code
                    );

                return (
                    Number(!!bProduct.newest) -
                    Number(!!aProduct.newest)
                );

            }
        );

    }


    cards.forEach(
        card=>
        grid.appendChild(card)
    );

}


/* =========================================================
   PRODUCT MODAL
========================================================= */

function openProduct(code){

    let product =
        products.find(
            p=>p.code===code
        );

    if(!product) return;


    document.getElementById(
        "modalImage"
    ).src =
        product.image;


    document.getElementById(
        "modalImage"
    ).alt =
        product.name;


    document.getElementById(
        "modalCategory"
    ).innerText =
        product.categoryName;


    document.getElementById(
        "modalName"
    ).innerText =
        product.name;


    document.getElementById(
        "modalCode"
    ).innerText =
        product.code;


    document.getElementById(
        "modalRating"
    ).innerText =
        product.rating;


    document.getElementById(
        "modalPrice"
    ).innerText =
        formatPrice(product.price);


    document.getElementById(
        "modalOldPrice"
    ).innerText =
        product.oldPrice
        ?
        formatPrice(product.oldPrice)
        :
        "";


    document.getElementById(
        "modalDescription"
    ).innerText =
        product.description;


    document.getElementById(
        "modalMaterial"
    ).innerText =
        " " + product.material;


    document.getElementById(
        "modalAvailability"
    ).innerText =
        " " + product.availability;


    document.getElementById(
        "modalAdd"
    ).onclick =
        function(){

            addCartByCode(
                product.code
            );

        };


    document
        .getElementById("productModal")
        .classList.add("show");

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeProductModal(){

    document
        .getElementById("productModal")
        .classList.remove("show");

}


/* =========================================================
   MODAL BACKGROUND
========================================================= */

function closeModal(event){

    if(
        event.target.id===
        "productModal"
    ){

        closeProductModal();

    }

}


/* =========================================================
   NAVIGATION
========================================================= */

function scrollToSection(
    id,
    button
){

    let el =
        document.getElementById(id);

    if(el){

        el.scrollIntoView({
            behavior:"smooth"
        });

    }


    if(button){

        document
            .querySelectorAll(
                ".nav-list button"
            )
            .forEach(
                x=>
                x.classList.remove(
                    "active"
                )
            );

        button.classList.add(
            "active"
        );

    }

}


/* =========================================================
   WHATSAPP
========================================================= */

function orderWhatsApp(){

    if(!cart.length){

        showToast(
            "Your cart is empty"
        );

        return;

    }


    let message =
        "Hello TimberWood,%0A%0A" +
        "I would like to order:%0A%0A";


    cart.forEach(item=>{

        message +=
            "• " +
            item.name +
            " (" +
            item.code +
            ")" +
            " × " +
            item.quantity +
            " - " +
            formatPrice(
                item.price *
                item.quantity
            ) +
            "%0A";

    });


    let total =
        cart.reduce(
            (sum,item)=>
            sum +
            item.price *
            item.quantity,
            0
        );


    message +=
        "%0ATotal: " +
        formatPrice(total) +
        "%0A%0A" +
        "Please provide availability and delivery details.";


    /*
       CHANGE THIS NUMBER
       TO YOUR TIMBERWOOD
       WHATSAPP NUMBER.

       Nepal example:
       97798XXXXXXXX
    */

    let phone =
        "9779829312825";


    window.open(
        "https://wa.me/" +
        phone +
        "?text=" +
        message,
        "_blank"
    );

}


/* =========================================================
   REQUEST QUOTE
========================================================= */

function requestQuote(){

    let message =
        "Hello TimberWood,%0A%0A" +
        "I would like to request a furniture/interior quotation.%0A%0A" +
        "Please contact me with more details.";


    let phone =
        "9779829312825";


    window.open(
        "https://wa.me/" +
        phone +
        "?text=" +
        message,
        "_blank"
    );

}


/* =========================================================
   CHECKOUT
========================================================= */

function checkout(){

    if(!cart.length){

        showToast(
            "Your cart is empty"
        );

        return;

    }


    orderWhatsApp();

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message){

    let toast =
        document.getElementById(
            "toast"
        );


    toast.innerText =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.toastTimer
    );


    window.toastTimer =
        setTimeout(
            ()=>{
                toast.classList.remove(
                    "show"
                );
            },
            2000
        );

}


/* =========================================================
   INITIALIZE
========================================================= */

renderProducts();

renderBestSellers();

renderTables();

renderChairs();

updateCart();

updateWishlistCount();


/* =========================================================
   SEARCH ENTER KEY
========================================================= */

document
    .getElementById("search")
    .addEventListener(
        "keydown",
        function(event){

            if(
                event.key==="Enter"
            ){

                searchProducts();

                scrollToSection(
                    "all-products"
                );

            }

        }
    );


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    function(event){

        if(event.key==="Escape"){

            closeCart();

            closeProductModal();

        }

    }
);
