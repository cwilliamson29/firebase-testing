import {createContext} from "react";

export interface User {
    uid: string;
    displayName: string | null;
    email: string;
    photoUrl: string | null;
}

export const UserContext = createContext<User | undefined>(undefined)