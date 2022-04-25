import Product from "./_product";
import axios from "axios";

function ProductManager () {
    this.products = [];
};
ProductManager.prototype.getProduct =  function () {
    return (
    // const result = await 
     axios.get('https://624aa9dd852fe6ebf8898954.mockapi.io/ngoc/product')
    .then((result) =>{this.products = result.data.map((item) => {
        const product = new Product(
            item.name,
            item.price,
            item.screen,
            item.backCamera,
            item.frontCamera,
            item.img,
            item.desc,
            item.type,
            item.id
        )
        return product;
    })
    // resolve();
})
    .catch((error) =>{
        console.log(error.response.data);
        // reject(error)
    })
    )
}
ProductManager.prototype.getProductById = async function (id) {
    const product = await axios.get(`https://624aa9dd852fe6ebf8898954.mockapi.io/ngoc/product/${id}`)
    console.log(product.data)
    return product.data
}
export default ProductManager;