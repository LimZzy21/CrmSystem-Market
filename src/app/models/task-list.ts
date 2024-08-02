export class TaskList {
    id:string
    title:string
    desc:string
    deadline:string
    isDone:boolean
    projectName:string
    constructor(id: string, title: string, desc: string, deadline: string, isDone: boolean, projectName:string){
        this.id = id
        this.title = title
        this.desc = desc
        this.deadline = deadline
        this.isDone = isDone
        this.projectName = projectName
    }
}
