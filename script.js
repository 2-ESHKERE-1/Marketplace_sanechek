let productsGrid = document.getElementById("products-grid");
let productsArray = [];

let xhr = new XMLHttpRequest();

let url = "https://my-json-server.typicode.com/2-ESHKERE-1/WebMidSun14_Sanechek"

xhr.open("GET", url + "/producs");
xhr.responseType = "json";

xhr.onload = function(){
    productsArray = xhr.response;
    productsGrid.innerHTML = null;

    productsArray.forEach(p => {
    let pElem = document.createElement("div");
    pElem.classList.add("product");

    pElem.innerHTML = `
        <h2 class="product-name">${p.name}</h2>
        <img class="product-photo" src="${p.photo}" alt="${p.name}">
        <p class="product-price"><b>${p.price} BYN</b></p>
        <p class="product-desc"><b>${p.desk}</b></p>
        <button onclick="addProductToCard(${p.id})">Buy</button>
    `


    productsGrid.append(pElem) //append добавить дочерние элементы

    });
}

xhr.send();

function addProductToCard(id) {
    xhr.open("GET", `${url}/producs/${id}`);
    xhr.responseType = "json"; //responseType = "json"; задаёт типа ответа который придёт на запрос
    xhr.onload = function(){
        
    }
}

let cartProd = document.getElementById("cart-products");
let cart = [];

if (localStorage.getItem("cart")){
    cart=JSON.parse(localStorage.getItem("cart"));

    drawCardProducts()
}

function addProductToCard(id){
    let product = productsArray.find(function(p){
        return p.id == id;
    })
    cart.push(product);


 drawCardProducts();

 localStorage.setItem("cart", JSON.stringify(cart));

 document.getElementById("cart-button").classList.add('active');
 setTimeout(function(){
    document.getElementById("cart-button").classList.remove('active');
 },500);
};

function drawCardProducts(){

    if (cart.length === 0) return cartProd.innerHTML = "Cart is empty";//если 0 продуктов пишем карт бла бла

    cartProd.innerHTML = null;
    let sum = 0;

    cart.forEach(function(p){
        cartProd.innerHTML +=`
        <p><img src="${p.photo}"> ${p.name} | ${p.price}</p>
        `;
        sum += p.price;
    })// эта функция добовляет цену и картинку товара который мы купили
cartProd.innerHTML +=`
    <p><b>Total price: ${sum}</b></p>
    <button onclick="BuyAll()">Buy all</button>
`;
}

function BuyAll(){
    cart = [];
    cartProd.innerHTML = "ВЫ ПОПАЛИСЬ Хаха ТЕПЕРЬ ВЫ ДОЛЖНЫ МНЕ 1000000$ МУГАГАГАГА";
    localStorage.setItem('cart', '[]');
}

function openCart(){
    cartProd.classList.toggle("hide");

}