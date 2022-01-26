import { types } from "../types/types";

//Estado Inicial
const initialState = {
    modalOpen: false,
}

//funcion pura
export const uiReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.uiOpenModal:
            return{
                ...state,
                modalOpen: true
            }
        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false,
            }

        default:
            return state;
    }
}