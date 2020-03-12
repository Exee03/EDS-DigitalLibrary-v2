export interface User {
    username: string;
    fullName: string;
    avatar: string;
    history: History[];
    trophy: number;
    isAdmin: boolean;
    password: string;
}

export interface History {
    category: string;
    id: string;
    date: string;
    point: number;
    duration: number;
}
