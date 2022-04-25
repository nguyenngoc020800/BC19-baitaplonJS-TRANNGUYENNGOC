

import "./_layout";
import axios from "axios";
import Product from "./_product";
import ProductManager from "./_productManager";
import CartManager from "./_cartManager";
import CartItem from "./_cartItem";
const productList = new ProductManager();
const cartList = new CartManager();
let cart = [];
init()
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
                <button class="btn-outline-light btn addToCart" data-type="createCartItem" data-id="${product.id}" >
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
    console.log(productList.products)
})



function setChangeIncart(product){
    for(let i = 0;i < cart.length;i++){
        if(cart[i].product.id==product.product.id){
            cart[i].qty = Number(cart[i].qty) + 1,
            cart[i].total = Number(cart[i].product.price) * Number(cart[i].qty)
            console.log(cart);
            return;
        }
    }
    cart.push(product);
    console.log(cart)
}

function renderCart(cartList){
    const html = cartList.reduce((result,item) =>{
        return ( result + 
            ` <table class="table table-dark">
                               
            <tbody>
              <tr>
              <th scope="row">
                    <img src=${item.product.img} alt="" width="100">
                </th>
                <td>${item.product.name}</td>
                <td>
                    <div class="changer-number cartItem" >
                        <button class="btn-outline-light btn" data-id="${item.product.id}" data-type="giam">-</button>
                        <span id="${item.product.id}">${item.qty}</span>
                        <button class="btn-outline-light btn" data-id="${item.product.id}" data-type="tang" >+</button>
                    </div>
                </td>
                <td>${item.total}</td>
                <td>
                <button class="btn-outline-light btn" >
                <i class="fa fa-trash" data-id="${item.product.id}" data-type="delete"></i>
                </button>
                </td>
                
              </tr>
              
            </tbody>
          </table>`
        )
    },'')
    document.getElementById("cart").innerHTML = html;
    
}
// document.getElementById('mainCard').addEventListener('click',(event) => {
//     const targetEl = event.target;
//     const id = targetEl.getAttribute("data-id")
//     if(!id){
//         return;
//     }
//     cartList.getToCart(id).then((result) => {
//         setChangeIncart(result)      
//         renderCart(cart);   
//         return cart;
//     }).then((result)=>{
//         renderTotalNumberCart(result)
//     })
// })

// nút clearcart
document.getElementById("clearCart").addEventListener('click',(event) =>{
    const btnClearEl = event.target;
    // console.log(btnClearEl)
    clearCart()
})
//clearCart
function clearCart(){
    cart = []
    renderCart(cart);
    renderTotalNumberCart(cart)
    renderTotal(cart)
}

// xử lí các nút tăng giảm số lượng sản phẩm 

function decreaseItem(id) {
    cartList.getToCart(id).then((result) =>{
        const id = result.product.id;
        for( let i=0;i<cart.length;i++){
            if(cart[i].product.id===id){
                if(cart[i].qty==1){
                    cart.splice(i,1)
                    renderCart(cart)
                    renderTotalNumberCart(cart)
                    renderTotal(cart)
                    return
                }
                cart[i].qty = Number(cart[i].qty) - 1;
                cart[i].total = Number(cart[i].product.price) * Number(cart[i].qty)
                renderCart(cart)
                renderTotalNumberCart(cart);
                renderTotal(cart)
            }
        }
    })
}
function increaseItem(id) {
    cartList.getToCart(id).then((result) =>{
        const id = result.product.id;
        for( let i=0;i<cart.length;i++){
            if(cart[i].product.id===id){
                cart[i].qty = Number(cart[i].qty) + 1;
                cart[i].total = Number(cart[i].product.price) * Number(cart[i].qty)

                renderCart(cart);
                renderTotalNumberCart(cart)
                renderTotal(cart)
            }
        }
    })
}

function deleteItem(cartItem){
    const idItem = cartItem.product.id;
    for(let i = 0;i<cart.length;i++){
        if(cart[i].product.id === idItem){
            cart.splice(i,1);
                renderCart(cart)
                renderTotalNumberCart(cart)
                renderTotal(cart)
                return;
        }
    }
}
// increaseItem(1)
// hiển thị tổng số lượng ở nút giỏ hàng
function renderTotalNumberCart(cart){
    let n = 0
    for(i = 0;i<cart.length;i++){
        n += Number(cart[i].qty)
    }
    document.getElementById("totalNumber").innerHTML = n
}

document.getElementById("mainCard").addEventListener('click',event =>{
    // console.log(event.target);
    const type = event.target.getAttribute("data-type");
    const id = event.target.getAttribute("data-id")
    if(!id){
        return;
    }
    if(type === "createCartItem"){
        cartList.getToCart(id).then((result) => {
            setChangeIncart(result)      
            renderCart(cart);   
            return cart;
        }).then((result)=>{
            renderTotalNumberCart(result)
            renderTotal(result)
        })
    }
    if(type === "giam"){
        cartList.getToCart(id).then(result =>{
            decreaseItem(result.product.id)
        })
    }
    if(type ==="tang"){
        cartList.getToCart(id).then(result =>{
            increaseItem(result.product.id)
            
        })
    }        
})

document.getElementById("cart").addEventListener('click',event =>{
    // console.log(event.target);
    const type = event.target.getAttribute("data-type");
    const id = event.target.getAttribute("data-id")
    if(!id){
        return;
    }
    if(type === "giam"){
        cartList.getToCart(id).then(result =>{
            decreaseItem(result.product.id)
        })
    }
    if(type ==="tang"){
        cartList.getToCart(id).then(result =>{
            increaseItem(result.product.id)
            
        })
    }
    if(type ==="delete"){
        cartList.getToCart(id).then(result =>{
            deleteItem(result)
        })
    }           
})


function renderTotal(cart) {
    let totalChart = 0;
    for(let i = 0; i<cart.length;i++){
        totalChart+= Number(cart[i].total)
    }
    document.getElementById("total").innerHTML = totalChart
    return totalChart
}

document.getElementById("purchase").addEventListener('click',()=>{
    const result = renderTotal(cart);
    if(!result){
        alert(` chưa có sản phẩm nào để thanh toán `);
        return
    }
    alert(`thanh toán:${result}`);
    clearCart()
})




