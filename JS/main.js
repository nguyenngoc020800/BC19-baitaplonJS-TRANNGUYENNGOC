

import "./_layout";
import axios from "axios";
import Product from "./_product";
import ProductManager from "./_productManager";
import CartManager from "./_cartManager";
const productList = new ProductManager();
const cartList = new CartManager();
init();
// lấy danh sách sản phẩm và in ra màn hình 
function init(){
    productList.getProduct().then(() =>{
        display(productList.products);
    })
}
// hiển thị danh sách sản phẩm
function display(products){
    const html = products.reduce((result, product) =>{
        return(
        result + `
        <div class="card">
        <div class="card-top">
            <i class="fab fa-apple"></i>
            <span>In Stock</span>
        </div>
        <img class="card-img" src="${product.img}" alt="">
        <div class="card-body">
            <h4 class="card-title">${product.name}</h4>
            <h5 class="card-text">Wireless Noise Cancelling Earphones</h5>
            <span class="card-decr">${product.desc} </span>
            <div class="card-price">
                <div class="price">$${product.price}</div>
                <button class="btn-outline-light btn ">
                    Add
                </button>
            </div>
            <div class="icon">
                <i class="fa fa-heart"></i>
            </div>
        </div>
    </div>
        `);
    },"")
    document.getElementById('mainCard').innerHTML = html;}
// lọc sản phẩm theo type điện thoại 
document.getElementById('typeSelect').addEventListener('change',(event) =>{
    const type = event.target.value;
    let passProduct = [];
    if(type =='samsung'){
         passProduct =  productList.products.filter((item) => item.type =="Samsung")
        display(passProduct)
    }else if(type == "iphone"){
        passProduct =  productList.products.filter((item) => item.type =="Iphone")
        display(passProduct)
    }else{
        display(productList.products)
    }
})

console.log(productList.products)