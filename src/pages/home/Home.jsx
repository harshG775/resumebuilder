import ResumeBuilder from "../resumeBuilder/ResumeBuilder";
import ResumeDataObject from "../../ResumeDataObject";
export default function Home() {
    console.log(ResumeDataObject)
	return (
		<div>
			<ResumeBuilder />
		</div>
	);
}


// import { useContext } from "react";
// import Context_db from "../../client_db/Context_db";
// import { Actions } from "../../client_db/Reducer_db";
// export default function Home() {
//     const [state, dispatch] = useContext(Context_db);

// 	const handleClick = () => {
// 		dispatch({
// 			actionType: Actions.TOGGLE_MENU,
// 			payload: !state.isOpen,
// 		});
// 	};

// 	return (
// 		<div>
// 			<h1>App :{`${state.isOpen}`}</h1>

// 			<button onClick={handleClick}>toggle</button>
// 		</div>
// 	);
// }