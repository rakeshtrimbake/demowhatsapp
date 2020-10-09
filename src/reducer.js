export const actionTypes = {
     SET_USER:"SET_USER"
}

const initState = {
    user:null
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user:action.user,
            };
            default:{
                return state;
            }
    }
}

export default reducer;