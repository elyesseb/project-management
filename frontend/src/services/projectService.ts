import { Project, NewProject, UpdateProjectData } from '../interfaces/Project';
import { createFetchOptions } from '../utils/createFetchOptions';
import { throwExceptionError } from '../utils/throwError';

const API_URL = 'http://localhost:3000/projects';

const getAllProjects = async (): Promise<Project[]> => {
    const response = await fetch(API_URL);
    throwExceptionError(response, 'Error while fetching projects');
    return await response.json();
};

export const getUserProjects = async () => {
    const response = await fetch(`${API_URL}/user`, createFetchOptions("GET"));
    throwExceptionError(response, 'Error while fetching user projects');
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

const addProject = async (projectData: NewProject): Promise<Project> => {
    const response = await fetch(API_URL, createFetchOptions("POST", projectData));
    throwExceptionError(response, "Error while creating project");
    return await response.json();
};

const updateProject = async (id: number, projectData: UpdateProjectData): Promise<Project> => {
    const response = await fetch(`${API_URL}/${id}`, createFetchOptions('PUT', projectData));
    throwExceptionError(response, 'Error while updating project');
    return await response.json();
};

const deleteProject = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, createFetchOptions('DELETE'));
    throwExceptionError(response, 'Error while delete project');
};

export { getAllProjects, getProjectById, getProjectsByCategory, addProject, updateProject, deleteProject };
