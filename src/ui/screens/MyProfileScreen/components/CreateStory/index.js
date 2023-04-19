import { View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import InputField from '../../../../components/InputField/InputField'
import SubmitButton from '../../../../components/Buttons/SubmitButton/SubmitButton'
import usePostStories from '../../../../hooks/usePostStories'
import ImagePicker from '../../../../components/ImagePicker/ImagePicker'
import ModalHeader from '../../../../components/ModalHeader/ModalHeader'

const CreateStory = ({
    postStory,
    route
}) => {

    const { userId } = route.params
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState()
    //const [file, setFile] = useState({})

    const pickImage = async () => {
        const image = await ImagePicker()
        setImage(image)
    }

    const story = {
        userId: userId,
        title: title,
        location: location,
        content: content,
        //postImage: file
    }

    const { postNewStory, loading } = usePostStories({ story: story, postStory: postStory })

    const handlePostStory = () => {
        postNewStory()
    }

    const ImageSource = image ? { uri: image } : require('../../../../assets/noimage.png')


    return (
        <View style={styles.container}>
            <ModalHeader title={'Create New Story'} />
            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
            >

                <View style={styles.contentContainer}>
                    <TouchableOpacity
                        style={{ marginBottom: 30 }}
                        onPress={() => pickImage()}
                    >
                        <Image
                            style={styles.image}
                            source={ImageSource}
                        />
                    </TouchableOpacity>
                    <InputField
                        fieldName={'Location'}
                        setText={setLocation}
                        placeholder={'Enter location'}
                        editScreenMode
                    />
                    <InputField
                        fieldName={'Title'}
                        setText={setTitle}
                        placeholder={'Enter title'}
                        editScreenMode
                    />
                    <InputField
                        fieldName={'Content'}
                        setText={setContent}
                        placeholder={'Enter content'}
                        editScreenMode
                    />
                    <SubmitButton
                        text={'Post New Story'}
                        onPress={handlePostStory}
                        loading={loading}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default CreateStory