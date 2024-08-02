export interface OrderItem {
    id: string
    title: string;
    price: number
    category: string
    details: string
    img: string
    
}

export interface Order {
    [key: string]: OrderItem | string | number
    id: string
    name: string
    address: string;
    tel: string
    sum: number
    status:string
    date: string
}
