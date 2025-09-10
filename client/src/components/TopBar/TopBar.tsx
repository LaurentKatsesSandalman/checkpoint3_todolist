import { useAppContext } from "../../context/AppContext";
import styles from "./TopBar.module.css";

function TopBar() {
	const { authToken, setAuthToken, setIsSignUpActive, setIsLoginActive } =
		useAppContext();

	return (
		<div className={styles.navbar}>
			<div className={styles.logoContainer}>

				<p className={styles.logoName}>Todo Maker</p>
			</div>
			{authToken !== null ? (
				<div className={styles.buttonsContainer}>
					<button onClick={() => setAuthToken(null)}>
						Logout
					</button>
				</div>
			) : (
				<div className={styles.buttonsContainer}>
					<button data-testid="register-openmodal-button" onClick={() => setIsSignUpActive(true)}>
						Register
					</button>
					<button data-testid="login-openmodal-button" onClick={() => setIsLoginActive(true)}>
						Login
					</button>
				</div>
			)}
		</div>
	);
}

export default TopBar;
