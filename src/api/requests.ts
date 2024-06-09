import axios from "axios";
import { IAuth, ICart, ICity, IFavorite, IFeedback, IOrder, IProduct, IProductsResponse, IRegister } from "./models";
import { instance } from "./interceptor";

export const DOMAIN = "http://localhost:8000/";

//auth && tokens
export const registerUser = (data:IRegister) => {
    return axios.post(DOMAIN+"api/v1/register/", data)
}

export const createToken = (data:IAuth) => {
    return axios.post(DOMAIN+"api/v1/token/", data)
}

export const refreshToken = ({refresh}:{refresh:string}) => {
    return axios.post(DOMAIN+"api/v1/token/refresh/", {refresh})
}

export const verifyToken = ({token}:{token:string}) => {
    return axios.post(DOMAIN+"api/v1/token/verify/", {token})
}

// cart
export const getCart = () => {
    return instance.get<ICart>(DOMAIN+"api/v1/cart/")
}

export const addToCart = ({product_id}:{product_id:number}) => {
    return instance.post(DOMAIN+"api/v1/cart/", {product_id})
}

export const deleteFromCart = ({cart_item_id}:{cart_item_id:number}) => {
    return instance.delete(DOMAIN+`api/v1/cartitem/${cart_item_id}/`)
}

export const cartItemDecrement = ({cart_item_id}:{cart_item_id:number}) => {
    return instance.put(DOMAIN+`api/v1/cartitem/decrease/${cart_item_id}/`)
}

export const cartItemIncrement = ({cart_item_id}:{cart_item_id:number}) => {
    return instance.put(DOMAIN+`api/v1/cartitem/increase/${cart_item_id}/`)
}

// favorite

export const getFavorite = () => {
    return instance.get<IFavorite>(DOMAIN+"api/v1/favoritelist/")
}

export const addToFavorite = ({product_id}:{product_id:number}) => {
    return instance.post<IFavorite>(DOMAIN+"api/v1/favoritelist/", {product_id})
}

export const deleteFromFavorite = ({fav_item_id}:{fav_item_id:number}) => {
    return instance.delete<IFavorite>(DOMAIN+`api/v1/favoritelist/${fav_item_id}/`)
}

// orders
export const getOrders = () => {
    return instance.get<IOrder[]>(DOMAIN+"api/v1/orders/")
}

export const createOrder = () => {
    return instance.post(DOMAIN+"api/v1/orders/")
}

// =============
export const getCities = () => {
    return axios.get<ICity[]>(DOMAIN+"api/v1/cities/")
}

export const getProducts = ({page, min_price, max_price, product_name, sorting_value}:{page?:number, min_price?:number, max_price?:number, product_name?:string, sorting_value?:string}) => {
    return instance.get<IProductsResponse>(DOMAIN+`api/v1/products/?${page ? `page=${page}` : ""}${min_price ? `&min_price=${min_price}` : ""}${max_price ? `&max_price=${max_price}` : ""}${product_name ? `&name=${product_name}` : ""}${sorting_value ? `&sorting_value=${sorting_value}` : ""}`)
}

export const getProduct = ({pk}:{pk:string}) => {
    return instance.get<IProduct>(DOMAIN+`api/v1/products/${pk}`)
}

export const getProductsNonAuth = () => {
    return axios.get<IProductsResponse>(DOMAIN+"api/v1/products/")
}

// feedback

export const sendFeedback = ({message}:IFeedback) => {
    return instance.post(DOMAIN+"api/v1/feedback/", {message})
}