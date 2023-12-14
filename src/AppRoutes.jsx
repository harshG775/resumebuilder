import { createBrowserRouter,RouterProvider } from "react-router-dom";
import AppLayout from './layouts/AppLayout.jsx';
import { disableCache } from '@iconify/react';
import Home from "./pages/home/Home.jsx";
export default function AppRoutes() {
    // Disable caching in localStorage
    disableCache('all');
    
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
