import { Project } from '../interfaces/Project';
import { createFetchOptions } from '../utils/createFetchOptions';
import { throwExceptionError } from '../utils/throwError';

const API_URL = 'http://localhost:3000/projects';

const getAllProjects = async (): Promise<Project[]> => {
    const response = await fetch(API_URL);
    throwExceptionError(response, 'Error while fetching projects');
    return await response.json();
};

const getProjectById = async (id: number): Promise<Project> => {
    const response = await fetch(`${API_URL}/${id}`);
    throwExceptionError(response, 'Error while fetching project id');
    return await response.json();
};

const getProjectsByCategory = async (categoryId: number): Promise<Project[]> => {
    const response = await fetch(`${API_URL}/filter?categoryId=${categoryId}`);
    throwExceptionError(response, 'Error while fetching project by category');
    return await response.json();
};

const addProject = async (projectData: Omit<Project, 'id'>): Promise<Project> => {
    const response = await fetch(API_URL, createFetchOptions('POST', projectData));
    throwExceptionError(response, 'Error while create project');
    return await response.json();
};

const updateProject = async (id: number, projectData: Omit<Project, 'id'>): Promise<Project> => {
    const response = await fetch(`${API_URL}/${id}`, createFetchOptions('PUT', projectData));
    throwExceptionError(response, 'Error while update project');
    return await response.json();
};

const deleteProject = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, createFetchOptions('DELETE'));
    throwExceptionError(response, 'Error while delete project');
};

export { getAllProjects, getProjectById, getProjectsByCategory, addProject, updateProject, deleteProject };
