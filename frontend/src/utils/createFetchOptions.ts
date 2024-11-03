export const createFetchOptions = (method: string, data?: unknown) => {
    const token = localStorage.getItem('token');
    return {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: data ? JSON.stringify(data) : undefined,
    };
};