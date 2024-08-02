export class LogIn {
    email: string
    password: string
    isAdmin:boolean
    constructor(email: string, password: string, isAdmin:boolean) {
        this.email = email
        this.password = password
        this.isAdmin = isAdmin
    }
}