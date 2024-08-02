export class Customer {
    id:string
    userName: string
    userLastName: string
    email: string
    whenRegister:string
    isEmployee:boolean
    position:string
    location:string
    company:string
    isAdmin:boolean
    constructor(id: string, userName: string, userLastName: string, email: string, whenRegister: string, isEmployee: boolean, position: string, company: string, location: string, isAdmin: boolean) {
        this.id = id
        this.userName = userName
        this.userLastName = userLastName
        this.email = email
        this.whenRegister = whenRegister
        this.isEmployee = isEmployee
        this.position = position
        this.location = location
        this.company = company
        this.isAdmin = isAdmin
    }
}