export class Tasks {
    completed:number
    inProgress:number
    overdue:number
    constructor(completed:number, inProgress:number, overdue:number){
        this.completed = completed
        this.inProgress = inProgress
        this.overdue = overdue
    }
}
