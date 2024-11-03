import { Category } from "../interfaces/Category";
import { createFetchOptions } from "../utils/createFetchOptions";
import { throwExceptionError } from "../utils/throwError";

const API_URL = 'http://localhost:3000/categories';

export const getAllCategories = async (): Promise<Category[]> => {
    const response = await fetch(API_URL);
    throwExceptionError(response, 'Error while fetching categories');
    return await response.json();
};

export const getCategoryById = async (id: string): Promise<Category> => {
    const response = await fetch(`${API_URL}/${id}`);
    throwExceptionError(response, 'Error while fetching category id');
    return await response.json();
};

export const createCategory = async (categoryData: Omit<Category, 'id'>): Promise<Category> => {
    const response = await fetch(API_URL, createFetchOptions('POST', categoryData));
    throwExceptionError(response, 'Error while create category');
    return await response.json();
};

export const updateCategory = async (id: string, categoryData: Category): Promise<Category> => {
    const response = await fetch(`${API_URL}/${id}`, createFetchOptions('PUT', categoryData));
    throwExceptionError(response, 'Error while update category');
    return await response.json();
};

export const deleteCategory = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, createFetchOptions('DELETE'));
    throwExceptionError(response, 'Error while delete category');
};