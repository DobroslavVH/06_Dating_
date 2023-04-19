import React, { useReducer } from "react";
import UserContext from ".";
import UserReducer, { ACTIONS, INITIAL_STATE } from './Reducer'

const UserProvider = ({ children }) => {

    const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE)

    const setUserId = userId => {
        dispatch({
            type: ACTIONS.SET_USER_ID,
            payload: userId
        })
    }

    const setTransactionId = transactionId => {
        dispatch({
            type: ACTIONS.SET_TRANSACTION_ID,
            payload: transactionId
        })
    }

    const setUser = user => {
        dispatch({
            type: ACTIONS.SET_USER,
            payload: user
        })
    }

    const setNumberOfRequests = number => {
        dispatch({
            type: ACTIONS.SET_NUMBER_OF_REQUESTS,
            payload: number
        })
    }

    const clearUser = () => {
        dispatch({
            type: ACTIONS.CLEAR_USER
        })
    }

    return (
        <UserContext.Provider
            value={{
                ...state,
                setUserId,
                setTransactionId,
                setUser,
                setNumberOfRequests,
                clearUser
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider