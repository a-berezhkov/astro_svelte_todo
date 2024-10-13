export interface TaskType {
    title: string;
    isDone: boolean;
    id: number;
    userId: number;
}

export type TaskArray = TaskType[];