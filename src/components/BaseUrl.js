import axios from 'axios'
export function BaseUrl(){
    if(window.location.hostname === 'localhost'){
        return 'http://localhost/wemall/api/';
    }
    else{
        return 'https://wemall.sanctablog.com/api/';
    }
}

export const setDiscount = (product, int_r = false) => {
    if (product.product_discount > 0) {

        let text = "";
        let price = 0;
        switch (product.discount_method) {
            case 'percentage':
                text = `${product.product_price - ((product.product_discount / 100) * product.product_price).toFixed(2)}`;
                price = product.product_price - ((product.product_discount / 100) * product.product_price).toFixed(2);
                // text = text.toFixed(2)

                break;
            case 'price_cut':

                price = (product.product_price - product.product_discount);

                text = `${price}`;
                break;

            default:
                return '';
                break;
        }
        if (int_r) {
            return price.toFixed(2);
        }
        return (
            <span>${text}</span>
        )
    }

}

export async function fetchData(id) {
    // You can await here
    const base = BaseUrl();
    let url = base + 'product/detail/' + id;
    // console.log(url);
    const response = await axios.get(url)
        .then((response) => {
            // console.log(response)
            return response;

        })
        .catch((e) => console.log(e));
    // ...retur
    // console.log(response)
    return new Promise(resolve => {
        return resolve(response.data);
    });
}
export const getStorage = () => {
    if (JSON.parse(localStorage.getItem("orderedProduct")) == undefined) return []
    return JSON.parse(localStorage.getItem("orderedProduct")).items
}
export function deleteStorage(id){
    let newCart = getStorage().filter((value) => {
        return value.product_id != id;
    });
    let items = JSON.stringify({
        items: newCart
    });
    localStorage.setItem("orderedProduct", items);
    return true;
}