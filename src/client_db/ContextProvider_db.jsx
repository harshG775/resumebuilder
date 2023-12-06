//ContextProvider.jsx
import { useReducer } from "react";
import Context_DB from "./Context_db";
import ReducerDB from "./Reducer_db";
export default function ContextProvider_DB(prop) {
	const initialState = {
		isOpen: false,
	};

	return (
		<Context_DB.Provider value={useReducer(ReducerDB, initialState)}>
			{prop.children}
		</Context_DB.Provider>
	);
}
