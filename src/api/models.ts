export interface IRegister {
    city: number,
    username: string,
    password: string,
    password2: string,
    email: string,
    first_name: string,
    last_name: string
}

export interface IAuth {
    username: string,
    password: string
}
export interface ICity {
    id: number,
    name: string
}
export interface IPhoto {
    photo: string
}

export interface IProduct {
    id: number,
    category: {
        id: number,
        name: string,
        slug: string
    },
    photos: IPhoto[],
    in_favorite: boolean,
    in_cart: boolean,
    fav_item_id: null | number,
    title: string,
    desc: string,
    slug: string,
    old_price: number,
    price: number,
    filler: string,
    material: string,
    knitting_type: string,
    is_hard_materials: boolean,
}

export interface IProductsResponse{
    count: number,
    next: any,
    previous: any,
    results: IProduct[],
    total_pages: number
}

export interface IOrderItem{
    id:number,
    product:IProduct,
    amount: number,
    order: number
}

export interface IOrder{
    id: number,
    items: IOrderItem[],
    total: number,
    info: string,
    status: "NW" | "RD" | "IN",
    user: number
}

export interface ICartItem{
    id: number,
    product: IProduct,
    amount: number,
    cart: number
}

export interface ICart{
    id: number,
    items: ICartItem[],
    total: number,
    user: number
}

export interface IFavoriteItem{
    id: number,
    product: IProduct,
    favoritelist: number
}

export interface IFavorite{
    id: number,
    items: IFavoriteItem[],
    user: number
}





// export interface IProductCard {
//     id: number,
//     title: string,
//     price: number,
//     photos: {
//         image: string
//     }[]
// }

// export interface IReview {
//     username: string,
//     creation_date: string,
//     description: string,
//     rating: number
// }

// export interface IProduct extends IProductCard {
//     description: string,
// }

