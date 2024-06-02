import axios from "axios";
import { IAuth, ICity, IOrder, IProduct, IProductsResponse, IRegister } from "./models";
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



export const getCities = () => {
    return axios.get<ICity[]>(DOMAIN+"api/v1/cities/")
}

export const getProducts = () => {
    return instance.get<IProductsResponse>(DOMAIN+"api/v1/products/")
}

export const getProductsNonAuth = () => {
    return axios.get<IProductsResponse>(DOMAIN+"api/v1/products/")
}

export const getOrders = () => {
    return instance.get<IOrder[]>(DOMAIN+"api/v1/orders/")
}