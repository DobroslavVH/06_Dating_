const putRejectFriendRequest = ({
    ENDPOINTS,
    TOKEN
}) => async ({
    data
}) => {
        await fetch(ENDPOINTS.postFriendRequestUrl, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        return;
    }

export default putRejectFriendRequest