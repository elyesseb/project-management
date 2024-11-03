import { Project } from '../interfaces/Project';
import { createFetchOptions } from '../utils/createFetchOptions';

const API_URL = 'http://localhost:3000/projects';

const getAllProjects = async (): Promise<Project[]> => {
    const response = await fetch(API_URL);
    return await response.json();
};

const getProjectById = async (id: number): Promise<Project> => {
    const response = await fetch(`${API_URL}/${id}`);
    return await response.json();
};

const getProjectsByCategory = async (categoryId: number): Promise<Project[]> => {
    const response = await fetch(`${API_URL}/filter?categoryId=${categoryId}`);
    return await response.json();
};

const addProject = async (projectData: Omit<Project, 'id'>): Promise<Project> => {
    const response = await fetch(API_URL, createFetchOptions('POST', projectData));
    return await response.json();
};

const updateProject = async (id: number, projectData: Omit<Project, 'id'>): Promise<Project> => {
    const response = await fetch(`${API_URL}/${id}`, createFetchOptions('PUT', projectData));
    return await response.json();
};

const deleteProject = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, createFetchOptions('DELETE'));

    if (!response.ok) {
        throw new Error(`Error while deleting project with id : ${id}`);
    }
};

export { getAllProjects, getProjectById, getProjectsByCategory, addProject, updateProject, deleteProject };
