// Reducer.js
export const Actions = {
	TOGGLE_MENU: "toggle_menu",
};

export default function ReducerDB(state, { actionType, payload }) {
	switch (actionType) {
		case Actions.TOGGLE_MENU:
			return {
				...state,

				isOpen: payload,
			};

		// default:

		//     throw new Error();

		default:
			return state;
	}
}
