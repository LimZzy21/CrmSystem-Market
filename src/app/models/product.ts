export class Product {
    id?:string
    title:string
    price:number
    details:string
    img:string
    constructor(title: string, price: number, details:string, img:string){
        this.title = title
        this.price = price
        this.details = details
        this.img = img
    }
}