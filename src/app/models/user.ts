export interface User {
    username: string;
    fullName: string;
    avatar: string;
    history: History[];
    trophy: number;
    role: RoleType;
}

export interface History {
    category: string;
    id: string;
    date: string;
    point: number;
    duration: number;
}

export enum RoleType {
    Admin,
    Student
}
