import { createBrowserRouter,RouterProvider } from "react-router-dom";
import AppLayout from './layouts/AppLayout.jsx';

import Home from "./pages/home/Home.jsx";
export default function AppRoutes() {
	const Routes = createBrowserRouter([
		{
            path: '/',
            element: <AppLayout />,
            children: [
				{
                    index: true,
                    element: <Home />,
                },
                {
                    path: '/about',
                    element: "<About />",
                },
			]
		}
	])
	return(
		<RouterProvider router={Routes} />
	)
}
