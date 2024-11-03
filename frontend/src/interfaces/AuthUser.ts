import { Project } from "./Project";

export interface AuthUser {
    id: string;
    email: string;
    token: string;
    projects: Project[];
}