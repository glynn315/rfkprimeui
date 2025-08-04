export interface Terms {
    id?:number,
    amount: number,
    schedule_date: Date,
    payment_date: Date,
    payment_status: string,
    order_id: string,
    terms:number,
    initial_date: Date,
}
