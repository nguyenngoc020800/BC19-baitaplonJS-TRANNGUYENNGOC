// import Product from "./_product";
// const test = new Product();
import axios from "axios";
import CartItem from "./_cartItem";

function CartManager() {
};

CartManager.prototype.getToCart = async function (productId){
    const result = await axios.get(`https://624aa9dd852fe6ebf8898954.mockapi.io/ngoc/product/${productId}`);
    const product = result.data;
    const cartItem = new CartItem(product.id,product.name,product.img,product.price,1,product.price);
    return cartItem
    // const areadyCart = this.items.filter((item)=>item.id == product.id);
    // if(!areadyCart){
    //     this.items = [...this.items,areadyCart]
    // }
}
// CartManager.prototype.

export default CartManager;