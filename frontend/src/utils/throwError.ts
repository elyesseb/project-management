export const throwExceptionError = (response: Response, message: string): void => {
    if (!response.ok) {
        throw new Error(message);
    }
};