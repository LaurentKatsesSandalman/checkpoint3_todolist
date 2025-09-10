import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import Home from "./pages/Home/Home.tsx";
import MyPage from "./pages/MyPage/MyPage.tsx";
import TaskDetails from "./pages/TaskDetails/TaskDetails.tsx";
import Page404 from "./pages/Page404/Page404.tsx";

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},

      {
				path: "/tasks",
				element: <MyPage />,
			},
			{
				path: "/tasks/:task_id",
				element: <TaskDetails />,
			},
		],
	},
	{
		path: "*",
		element: <Page404 />,
	},
]);

const rootElement = document.getElementById("root");

if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}

