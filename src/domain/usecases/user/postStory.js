const postStory = ({
    ENDPOINTS,
    TOKEN
}) => async ({
    story
}) => {
        await fetch(ENDPOINTS.postFriendRequestUrl, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`
            },
            body: JSON.stringify(story),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

export default postStory