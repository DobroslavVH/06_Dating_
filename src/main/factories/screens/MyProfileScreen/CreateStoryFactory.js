import React from "react";
import CreateStory from "../../../../ui/screens/MyProfileScreen/components/CreateStory";
import postStoryFactory from '../../usecases/user/postStoryFactory'

const CreateStoryFactory = ({ route }) => <CreateStory
    postStory={postStoryFactory()}
    route={route}
/>

export default CreateStoryFactory