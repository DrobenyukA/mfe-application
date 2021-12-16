import { SET_USER } from './actions';
import { SessionState, Actions, SetUserAction } from './types';

export const initialState: SessionState = { user: null };

function setUser(state: SessionState, action: SetUserAction): SessionState {
    return {
        ...state,
        user: action.payload,
        }
}

const reducer = (state: SessionState = initialState, action: Actions): SessionState => {
    switch (action.type) {
        case SET_USER: return setUser(state, action as SetUserAction);
        default: return state;
    }
};

export default reducer;
