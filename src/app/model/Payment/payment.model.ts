export interface Payment {
    payment_id?: number,
    cart_id: string,
    payment_method: string,
    payment_amount?: number,
    terms?: number,
    percentage?: number,
    payment_status: string,
}
