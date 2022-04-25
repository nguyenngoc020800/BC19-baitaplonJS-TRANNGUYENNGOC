function CartItem(id,name,img,price,qty,total){
    this.total = total,
    this.qty = qty,
    this.product = {id,name,img,price}
    
}
export default CartItem
// const demo = new CartItem(1,"ngoc","xxx",2000,1)
// console.log(demo);