import { Category } from "./Category";

export interface Project {
    id: number;
    title: string;
    description: string | null;
    userId: string;
    categories: Category[];
}