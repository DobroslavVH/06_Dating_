export const INITIAL_STATE = {
    userId: undefined,
    transactionId: undefined,
    user: undefined,
    numberOfFriendRequests: undefined
}

export const ACTIONS = {
    SET_USER_ID: 'user/set-user-id',
    SET_TRANSACTION_ID: 'user/set-transaction-id',
    SET_USER: 'user/set-user',
    CLEAR_USER: 'user/clear-user',
    SET_NUMBER_OF_REQUESTS: 'user/set-number-of-requests'
}

export default (state, action) => {
    const { type, payload } = action

    switch (type) {

        case ACTIONS.SET_USER_ID:
            return {
                ...state,
                userId: payload
            }

        case ACTIONS.SET_TRANSACTION_ID:
            return {
                ...state,
                transactionId: payload
            }

        case ACTIONS.SET_USER:
            return {
                ...state,
                user: payload
            }

        case ACTIONS.SET_NUMBER_OF_REQUESTS:

            return {
                ...state,
                numberOfFriendRequests: payload
            }

        case ACTIONS.CLEAR_USER:
            return {
                userId: undefined,
                transactionId: undefined,
                user: undefined
            }

        default:
            return state
    }
}