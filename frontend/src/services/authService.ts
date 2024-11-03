import { AuthUser } from '../interfaces/AuthUser';
import { createFetchOptions } from '../utils/createFetchOptions';

const API_URL = 'http://localhost:3000/auth';

export const register = async (email: string, password: string): Promise<AuthUser> => {
    const response = await fetch(`${API_URL}/register`, createFetchOptions('POST', { email, password }));
    if (!response.ok) {
        throw new Error('Error while register');
    }
    return await response.json();
};

export const login = async (email: string, password: string): Promise<AuthUser> => {
    const response = await fetch(`${API_URL}/login`, createFetchOptions('POST', { email, password }));
    if (!response.ok) {
        throw new Error('Error while login');
    }
    const user = await response.json();
    localStorage.setItem('token', user.token);
    return user;
};

export const logout = () => {
    localStorage.removeItem('token');
};


