import { createContext, useContext, useEffect, useState } from "react";
import {
	useLocation,
	useNavigate,
	type NavigateFunction,
} from "react-router-dom";

// Add Typing
export interface AppContextType {
	authToken: string | null;
	setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
	isSignUpActive: boolean;
	setIsSignUpActive: React.Dispatch<React.SetStateAction<boolean>>;
	isLoginActive: boolean;
	setIsLoginActive: React.Dispatch<React.SetStateAction<boolean>>;
	navigate: NavigateFunction;
	userId: string | null;
}

interface AppProviderProps {
	children: React.ReactNode;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: AppProviderProps) {
	//States you want to pass in the context
	const [authToken, setAuthToken] = useState<string | null>(
		localStorage.getItem("authToken") || null
	);
	const [userId, setUserId] = useState<string | null>(null);
	const [isSignUpActive, setIsSignUpActive] = useState<boolean>(false);
	const [isLoginActive, setIsLoginActive] = useState<boolean>(false);
	
	const navigate = useNavigate();

	const location = useLocation();

	//Get the authToken from the user's local storage if it exists
	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (!token) return;
		const payload = JSON.parse(atob(token.split(".")[1]));
		const isExpired = Date.now() >= payload.exp * 1000;

		if (isExpired) {
			localStorage.removeItem("authToken");
			setAuthToken(null);
			setUserId(null);
		} else {
			setAuthToken(token);
		}
	}, []);

	//When the authToken is updated, if he is outdated remove it from localStorage, useState and bring the user back to home.
	//Otherwise save the token to localStorage
	useEffect(() => {
		if (authToken) {
			// atob is a built-in JavaScript function that decodes a Base64-encoded string.
			const payload = JSON.parse(atob(authToken.split(".")[1]));
			const isExpired = Date.now() >= payload.exp * 1000;

			if (isExpired) {
				setAuthToken(null);
				setUserId(null);
			} else {
				localStorage.setItem("authToken", authToken);
				setUserId(payload.user_id || null)
			}
		} else {
			localStorage.removeItem("authToken");
			setUserId(null);
			navigate("/");
		}
	}, [authToken]);

	// When the user navigate, check to see if the authToken is still valid
	useEffect(() => {
		if (authToken) {
			const payload = JSON.parse(atob(authToken.split(".")[1]));
			const isExpired = Date.now() >= payload.exp * 1000;

			if (isExpired) {
				setAuthToken(null);
			}
		}
	}, [location]);

	return (
		<AppContext.Provider
			value={{
				authToken,
				setAuthToken,
				isSignUpActive,
				setIsSignUpActive,
				isLoginActive,
				setIsLoginActive,
				navigate,
				userId
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

// Call this custom hook to safely consume the context in your components
export function useAppContext() {
	const context = useContext(AppContext);
	if (context === null) {
		throw new Error("Context is null");
	}
	return context;
}
