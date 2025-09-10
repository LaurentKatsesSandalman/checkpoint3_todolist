import { Outlet } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import TopBar from "./components/TopBar/TopBar";
import "./App.css";

function App() {
	return (
		<>
    <AppProvider>
			<TopBar />
			<main>
				<Outlet />
			</main>
      </AppProvider>
		</>
	);
}

export default App;
