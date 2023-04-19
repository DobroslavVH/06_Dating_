import { View, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import ProfileHeader from '../../../../components/Profile/ProfileHeader/ProfileHeader'
import styles from './styles'
import InputField from '../../../../components/InputField/InputField'
import SubmitButton from '../../../../components/Buttons/SubmitButton/SubmitButton'
import UserContext from '../../../../context/UserContext'
import Body from '../../../../components/Body/Body'
import BackButton from '../../../../components/Buttons/BackButton/BackButton'
import ImagePicker from '../../../../components/ImagePicker/ImagePicker'
import { imageUrl } from '../../../../core/sanityClient'

const EditProfile = ({ route }) => {

    const { updateUser } = route.params

    const { user } = useContext(UserContext)

    const [newAvatar, setNewAvatar] = useState()
    const [newBackGroundImage, setNewBackgroundImage] = useState()
    const [newEmail, setNewEmail] = useState(user?.email)
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [country, setCountry] = useState()
    const [city, setCity] = useState()
    const [gender, setGender] = useState()
    const [age, setAge] = useState()

    const submitChanges = () => {
        const newUserData = {
            "mutations": [
                {
                    "patch": {
                        "id": user.userId,
                        "set": {
                            "image_background.asset._ref": newBackGroundImage,
                            "image_avatar.asset._ref": newAvatar,
                            "first_name": firstName,
                            "last_name": lastName,
                            "country": country,
                            "city": city,
                            "gender": gender,
                            "age": Number(age)
                        }
                    }
                }
            ]
        }
        updateUser({ data: newUserData })
    }

    const changeAvatar = async () => {
        const image = await ImagePicker()
        setNewAvatar(image)
    }

    const changeBackground = async () => {
        const image = await ImagePicker()
        setNewBackgroundImage(image)
    }

    return (
        <Body>
            <ScrollView
                style={styles.container}
            >
                <ProfileHeader
                    avatarImage={!newAvatar ? `${imageUrl(user.avatarImage)}` : newAvatar}
                    backgroundImage={!newBackGroundImage ? `${imageUrl(user.backgroundImage)}` : newBackGroundImage}
                    editMode
                    onPressAvatar={changeAvatar}
                    onPressBackground={changeBackground}
                />
                <BackButton />
                <View style={styles.contentContainer}>
                    <InputField
                        fieldName={'Email'}
                        setText={setNewEmail}
                        placeholder={user.email || 'N/A'}
                        editScreenMode
                    />
                    <InputField
                        fieldName={'First Name'}
                        setText={setFirstName}
                        placeholder={user.firstName || 'N/A'}
                        editScreenMode
                    />
                    <InputField
                        fieldName={'Last Name'}
                        setText={setLastName}
                        placeholder={user.lastName || 'N/A'}
                        editScreenMode
                    />
                    <View style={styles.locationContainer}>
                        <InputField
                            fieldName={'Country'}
                            setText={setCountry}
                            placeholder={user.country || 'N/A'}
                            editScreenMode
                            smallSize
                        />
                        <InputField
                            fieldName={'City'}
                            setText={setCity}
                            placeholder={user.city || 'N/A'}
                            editScreenMode
                            smallSize
                        />
                    </View>
                    <View style={styles.locationContainer}>
                        <InputField
                            fieldName={'Gender'}
                            setText={setGender}
                            placeholder={user.gender || 'N/A'}
                            editScreenMode
                            smallSize
                        />
                        <InputField
                            fieldName={'Age'}
                            setText={setAge}
                            placeholder={user?.age?.toString() || 'N/A'}
                            editScreenMode
                            smallSize
                        />
                    </View>
                    <SubmitButton
                        text={'Submit Changes'}
                        onPress={submitChanges}
                    />
                </View>
            </ScrollView>
        </Body>
    )
}

export default EditProfile