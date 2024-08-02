export class Orders {
    total:number
    success:number
    inProgress:number
    canselled:number
    constructor(total: number, success: number, inProgress: number, canselled:number){
        this.total = total
        this.success = success
        this.inProgress = inProgress
        this.canselled = canselled
    }
}
