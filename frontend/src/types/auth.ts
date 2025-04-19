export interface LoginErrors {
    email?: string[];
    password?: string[];
}

export interface RegisterErrors extends LoginErrors {
    name?: string[];
    password_confirmation?: string[];
}

export interface LoginCredentials {
    email: string;
    password: string;
    errors?: LoginErrors;
}

export interface RegisterCredentials extends LoginCredentials {
    name: string;
    password_confirmation: string;
    errors?: RegisterErrors;
}
