import Product from "./_product";
import axios from "axios";

function ProductManager () {
    this.products = [];
};
ProductManager.prototype.getProduct = async function () {
    const result = await axios.get('https://624aa9dd852fe6ebf8898954.mockapi.io/ngoc/product');
    this.products = result.data.map((item) => {
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

}
export default ProductManager;