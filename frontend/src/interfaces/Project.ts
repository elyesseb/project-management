import { Category } from "./Category";

export interface Project {
    id: number;
    title: string;
    description: string | null;
    userId: string;
    categories: Category[]
}

export type NewProject = {
    title: string;
    description: string | null;
    categoryIds: number[];
};

export interface UpdateProjectData {
    title: string;
    description: string | null;
    categoryIds: number[];
}