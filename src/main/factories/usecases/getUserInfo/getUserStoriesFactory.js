import { ENDPOINTS, QUERIES } from "../../../../ui/core/api";
import getUserStories from "../../../../domain/usecases/getUserInfo/getUserStories";

const getUserStoriesFactory = () =>
    getUserStories({
        ENDPOINTS,
        QUERIES
    })

export default getUserStoriesFactory
