// Front => Back
export interface Task{
    id?:number;
    title:string;
    description:string;
    subtasks:Subtask[];
}

export interface Subtask{
    id?:number;
    title:string;
    isDone:boolean;
    position?:number;
}