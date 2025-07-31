export interface Order {
    order_id?: string,
    customer_id: string,
    payment_method: string,
    terms: number,
    percentage: number,
    cart_id: string,
    
}
