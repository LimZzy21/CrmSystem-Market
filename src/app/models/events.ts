export class Event{
    title:string
    date:number
    month:number
    year:number
    constructor(date:number, month:number, year:number, title:string){
        this.date = date
        this.month = month
        this.year = year
        this.title = title
    }
}