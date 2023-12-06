import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css"

import ContextProvider_db from "./client_db/ContextProvider_db";
import AppRoutes from "./AppRoutes";
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ContextProvider_db>
			<AppRoutes />
		</ContextProvider_db>
	</React.StrictMode>
);
