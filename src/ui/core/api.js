export const PROJECT_ID = "1yfnb93a";
export const DATASET = "production";
export const TOKEN = 'skyHPRaPcexzDHuBpGcNHnEgEuG9JxRLJ5ZzLzAWl4Ie9gkURdTuIqtWZ5VmD43wa34rO3Ae9F6xEhd7hZ8xVHqapCvVakq1Rijc7HS9R7O4JMI6TlGO247AeS6rFWjE82U2taG5Ip4eUjbaq60iMfP4X0tSI1XwZVW6U06jOtp59ERa05dK'

export const QUERIES = {
    allUsers: encodeURIComponent('*[_type == "users"]'),
    logInWithUser: (username, password) => `*[_type == "users"][email match "${username}"][password match "${password}"]`,

    // stories
    userStories: relatedUser => `*[_type == "userPosts"][userId match "${relatedUser}"] | order(_createdAt desc)`,
    usersStories: usersIds => `*[_type == "userPosts"][userId in [${usersIds}]] | order(_createdAt desc)`,

    // get info about multiply users
    selectedUsers: users => `*[_type == "users"][_id in [${users}]]`,

    // chat messages
    getChatMessages: (chatId) => `*[_type == "chat"][chat_id match "${chatId}"]`,
}

export const ENDPOINTS = {
    postImage: `https://${PROJECT_ID}.api.sanity.io/v2021-06-07/assets/images/${DATASET}`,
    common: query => `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${query}`,
    getAllUsersUrl: `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERIES.allUsers}`,
    getCurrentUser: query => `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${query}`,
    postUserUrl: `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${DATASET}`,
    postFriendRequestUrl: `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${DATASET}`,

    getUserStories: query => `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${query}`,

    // post chat message
    postChatMessage: `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${DATASET}`,
}

