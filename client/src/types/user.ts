// Front => Back
export interface UserSignUp {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

// Back => Front
export interface UserSignedUp {
    user_id: number;
    email: string;
}

export interface User {
    access_token: string;
    user_id: number;
}
