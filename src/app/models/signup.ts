export class SignUp{
    userName:string
    userLastName:string
    email:string
    password:string
    whenRegister:string
    isEmployee:boolean
    isAdmin:boolean
    constructor(userName:string,userLastName:string, email:string, password:string,whenRegister:string, isEmployee:boolean, isAdmin:boolean){
        this.userName = userName
        this.userLastName = userLastName
        this.email = email
        this.password = password
        this.whenRegister = whenRegister
        this.isEmployee= isEmployee
        this.isAdmin = isAdmin
    }
}