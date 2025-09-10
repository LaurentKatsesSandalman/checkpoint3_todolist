import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext, type AppContextType } from "../../context/AppContext";
import styles from "./LoginForm.module.css";
import type { User, UserLogin } from "../../types/user";
import type { AxiosError } from "axios";

interface LoginFormProps {
    setActiveModal: AppContextType["setIsLoginActive"];
}

function LoginForm({ setActiveModal }: LoginFormProps) {
    const { setAuthToken, navigate } = useAppContext();
    const [loginData, setLoginData] = useState<UserLogin>({
        email: "",
        password: "",
    });
    const [user, setUser] = useState<User | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prev) => {
            return { ...prev, [name]: value };
        });
        setErrorMessage("");
    };

    // On submit, post the information to the backend to see if there is a corresponding user, if there is, return the token and id of the user
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const { email, password } = loginData;
        e.preventDefault();

        if (password.length < 8) {
            setErrorMessage("At least 8");
            return;
        }
        if (password.length > 36) {
            setErrorMessage("Max 36");
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                { email: email, password: password }
            );
            setUser(response.data);
        } catch (err: unknown) {
            const axiosError = err as AxiosError<{ error: string }>;
            if (axiosError.response?.data?.error) {
                setErrorMessage(axiosError.response.data.error);
            } else {
                setErrorMessage("Error, try again or try later");
            }
        }
    };

    useEffect(() => {
        if (user) {
            // used for permissions
            setAuthToken(user.access_token);
            // close the modal
            setActiveModal(false);
            // go to the creator page
            navigate(`/tasks`);
        }
    }, [user]);

    return (
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
            <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="password" className={styles.label}>
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    maxLength={36}

                    className={styles.input}
                />
                <p className={styles.expectedInput}>8-36, 1 uppercase, 1 number, 1 special</p>
            </div>
            {errorMessage && (
                <div className={styles.errorMessage}>{errorMessage}</div>
            )}
            <button
                
                className={styles.inscriptionBtn}
                type="submit"
            >
                Connexion
            </button>
        </form>
    );
}

export default LoginForm;
