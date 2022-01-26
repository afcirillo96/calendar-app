import { types } from "../types/types";

const initialState = {
    checking: true,
    // uid: null,
    // name: null
}

export const authReducer = ( state = initialState, action ) => {

    switch (action.type) {

        case types.authLogin:
            return {
                ...state,
                ...action.payload,//todo el usuario
                checking: false,//ya se q lo autentique      
            }

        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }

        case types.authLogout:
            return {
                checking: false,
            }

        default:
            return state;
    }
}