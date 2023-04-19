import { QueryClient } from 'react-query'

export const reactQuery = new QueryClient()

export const reactQueryTypes = {
    userQuery: 'userQuery',
    allUsersQuery: 'allUsersQuery',

    // stories
    userPosts: 'userPosts',
    usersStories: 'usersStories',
    friendsStories: 'friendsStories',

    // get users requestet friendship
    usersRequestetFriendship: 'usersRequestetFriendship',
    // my friends
    myFriendsAndRequestsIds: 'myFriendsAndRequestsIds',
    myFriendsList: 'myFriendsList',

    // chat messages
    myChatMessages: 'myChatMessages',
}

export const invalidateAllQueries = () => {
    reactQuery.invalidateQueries(reactQueryTypes.allUsersQuery)
    reactQuery.invalidateQueries(reactQueryTypes.friendsStories)
    reactQuery.invalidateQueries(reactQueryTypes.myChatMessages)
    reactQuery.invalidateQueries(reactQueryTypes.myFriendsAndRequestsIds)
    reactQuery.invalidateQueries(reactQueryTypes.myFriendsList)
    reactQuery.invalidateQueries(reactQueryTypes.userPosts)
    reactQuery.invalidateQueries(reactQueryTypes.userQuery)
    reactQuery.invalidateQueries(reactQueryTypes.usersRequestetFriendship)
    reactQuery.invalidateQueries(reactQueryTypes.usersStories)
}