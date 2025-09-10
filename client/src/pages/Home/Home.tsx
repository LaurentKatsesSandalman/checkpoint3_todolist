import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./Home.module.css";

function Home() {
	// choppage de value entre pas connecté /je veux me connecter / je veux m'inscrire
	const {
		isSignUpActive,
		setIsSignUpActive,
		isLoginActive,
		setIsLoginActive,
		navigate,
		authToken,
	} = useAppContext();

	// If I try to go to the home page when I am already connected, get sent back to the forms page
	useEffect(() => {
		if (authToken) {
			navigate(`/tasks`);
		}
	}, [authToken]);

	return (
		<>
			{isSignUpActive && (
				<Modal setActiveModal={setIsSignUpActive}>
					<SignUpForm setActiveModal={setIsSignUpActive} />
				</Modal>
			)}
			{isLoginActive && (
				<Modal setActiveModal={setIsLoginActive}>
					<LoginForm setActiveModal={setIsLoginActive} />
				</Modal>
			)}
			<div className={styles.page}>
				<div className={styles.welcomeContainer}>
					<div className={styles.content}>
						<h1 className={styles.title}>Todo List Maker</h1>
						<div className={styles.texts}>
							<p className={styles.text}>
								Todo Maker is a basic to-do list tool, quick and efficient
							</p>
						</div>

					</div>

				</div>

			</div>
		</>
	);
}

export default Home;
