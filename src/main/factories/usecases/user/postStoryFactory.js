import { ENDPOINTS, TOKEN } from "../../../../ui/core/api";
import postStory from "../../../../domain/usecases/user/postStory";

const postStoryFactory = () =>
    postStory({
        ENDPOINTS,
        TOKEN
    })

export default postStoryFactory