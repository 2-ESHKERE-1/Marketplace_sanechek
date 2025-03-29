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
        <p class="product-price"><b>${p.price}</b></p>
        <p class="product-desc"><b>${p.desk}</b></p>
        <button onclick="addProductToCard(${p.id})">Buy</button>
    `


    productsGrid.append(pElem) //append добавить дочерние элементы

    });
}

xhr.send();