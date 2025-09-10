import axios from "axios";
import { useState } from "react";
import type { AppContextType } from "../../context/AppContext";

import styles from "./SignUp.module.css";
import type { UserSignedUp, UserSignUp } from "../../types/user";

interface SignUpFormProps {
    setActiveModal: AppContextType["setIsSignUpActive"];
}

function SignUpForm({ setActiveModal }: SignUpFormProps) {
    // Rerender the fields when they are updated, will be used to send the info to the backend
    const [signUpData, setSignUpData] = useState<UserSignUp>({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [newUser, setnewUser] = useState<UserSignedUp | null>(null);

    // Update the value of signUpData when the user modifies one field input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpData((prev) => {
            return { ...prev, [name]: value };
        });
        setErrorMessage("");
    };

    // Do a first validation of the input values then send the signUpData to the back
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const { email, password, confirmPassword } = signUpData;
        e.preventDefault();

        if (password.length < 8) {
            setErrorMessage("At least 8");
            return;
        }
        if (password.length > 36) {
            setErrorMessage("Max 36");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords need to be identical");
            return;
        }

        // Axio is used to make HTTP request more readable than fetch (automaticcaly parses JSON, better error handling)
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/register`,
                {
                    email: email,
                    password: password,
                }
            );

            setnewUser(response.data);
            setActiveModal(false);
        } catch (err: any) {
            // TO DO, backend error handling and display using status code
            if (err.response.status === 409) {
                setErrorMessage("Already existing email");
                return;
            }
            console.error("Fetch error:", err);
            setErrorMessage("Doesn't pass validation");
        }
    };

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
                    data-testid="email-input"
                    value={signUpData.email}
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
                    data-testid="password-input"
                    value={signUpData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    maxLength={36}

                    className={styles.input}
                />
                <p className={styles.expectedInput}>8-36, 1 uppercase, 1 number, 1 special</p>
            </div>
            <div className={styles.field}>
                <label htmlFor="confirmPassword" className={styles.label}>
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    data-testid="confirm-password-input"
                    value={signUpData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>
            {errorMessage && (
                <div className={styles.errorMessage}>{errorMessage}</div>
            )}
            <button
                
                className={styles.inscriptionBtn}
                type="submit"
                data-testid="register-submit-button"
            >
                Inscription
            </button>
        </form>
    );
}

export default SignUpForm;
