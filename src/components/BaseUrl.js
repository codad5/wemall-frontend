import axios from 'axios'
import { useNavigate } from 'react-router-dom';


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
export function emptyCart(){
    let items = JSON.stringify({
        items: []
    });
    localStorage.setItem("orderedProduct", items);
    return true;
}

export async function SignupController(data = {
    name:false,
    phone: false,
    email:false,
    password:false
}){
    let returnData = await axios.post(BaseUrl() + '/auth/signup', JSON.stringify(data))
    .then((response) => {
        // console.log(response)
        return response.data; 
    })
    .catch((error) => console.log(error))

    return new Promise(resolve => {
        return resolve(returnData);
    });

}

export async function LoginController(data = {
    username : false,
    password : false,
}, move = false){
    // let navigate = useNavigate();

    // console.log(data)
    console.log(BaseUrl() + '/auth/login');
    let returnData = await axios.post(BaseUrl() + '/auth/login', JSON.stringify(data))
    .then((response) => {
        // console.log(response)
        return response.data; 
    })
    .catch((error) => console.log(error))
    if(!returnData.error){

        localStorage.setItem("loggedUser", JSON.stringify(returnData));
    }

    return new Promise(resolve => {
        return resolve(returnData);
    });

}


export function sumItemArray(items){
    let i = 0;
    items.forEach((item) => {
        i += setDiscount(item.data, true) * item.quantity;
    })

    return i;

}

export async function submitOrder(data = {
    login_detail:{

    },
    cart:{

    },
    payment_method:""

}){
    let returnData = await axios.post(BaseUrl() + '/api/order', JSON.stringify(data))
        .then((response) => {
            console.log(response)
            return response.data;
        })
        .catch((error) => console.log(error))

    return new Promise(resolve => {
        return resolve(returnData);
    });
}