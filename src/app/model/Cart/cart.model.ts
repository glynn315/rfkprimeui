export interface Cart {
    id?: number,
    product_id: string,
    cart_id?: string,
    quantity: number,
    product_price: number,
    cart_status: string,
    discount?: number,
    vat: number,
    product?:{
        product_name?:string,
    }
}

export interface product{
    product_name?: string
}

