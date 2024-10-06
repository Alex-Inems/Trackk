// actions/authActions.ts
import { User } from '@/types/User'; // Adjust the import path based on your project structure

export const login = (userData: User) => {
    return {
        type: 'LOGIN',
        payload: userData,
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT',
    };
};
