export interface Payment {
    payment_id?: number,
    cart_id: string,
    payment_method: string,
    payment_amount?: number,
    payment_status: string,
}
