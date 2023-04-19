import { View } from 'react-native'
import React, { useContext, useState } from 'react'
import Body from '../../../components/Body/Body'
import styles from './styles'
import InputField from '../../../components/InputField/InputField'
import SubmitButton from '../../../components/Buttons/SubmitButton/SubmitButton'
import { TOKEN, ENDPOINTS } from '../../../core/api'
import UserContext from '../../../context/UserContext'
import { useNavigation } from '@react-navigation/native'
import AuthScreensHeader from '../Components/AuthScreensHeader'
import { emailValidation, passwordValidation } from '../Components/validations'

const SignIn = ({
    getUser
}) => {

    const navigation = useNavigation()

    const {
        setUser,
        setUserId,
        setTransactionId
    } = useContext(UserContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const getAndSetUserInfo = async () => {
        const data = await getUser({ username, password })
        if (data === undefined) {
            setUserAlertvisible(true)
            setTimeout(() => setUserAlertvisible(false), 2000)
        } else {
            setUser(data)
            setUserId(data?.userId)
            navigation.navigate('Bottom')
        }
    }

    // ID generator
    const getRandom = (min, max) => { return Math.floor(Math.random() * (max - min) + min) }
    const userId = username.substring(2, 4) + getRandom(10, 100) + username.substring(0, 4) + getRandom(99, 9999)


    const user = {
        "mutations": [
            {
                "createIfNotExists": {
                    "_type": "users",
                    "_id": userId,
                    "email": username,
                    "password": password
                }
            }
        ]
    }

    const handleSubmit = async () => {
        if (!emailValidation(username)) {
            if (!passwordValidation(password)) {
                setPasswordError(true)
            }
            setUsernameError(true)
        } else if (!passwordValidation(password)) {
            setPasswordError(true)
        } else {
            // handle posting data here
            setUserId(userId)
            await fetch(ENDPOINTS.postUserUrl, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TOKEN}`
                },
                body: JSON.stringify(user),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.transactionId !== undefined) {
                        setTransactionId(data.transactionId)
                        getAndSetUserInfo()
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                })
        }
    }


    return (
        <Body header>
            <View style={styles.container}>
                <AuthScreensHeader
                    title={'Sign In'}
                />
                <InputField
                    fieldName={'Email'}
                    setText={setUsername}
                    error={usernameError}
                    clearError={setUsernameError}
                    errorMessage={'Enter a valid email address!'}
                />
                <InputField
                    fieldName={'Password'}
                    setText={setPassword}
                    isPasswordField={true}
                    error={passwordError}
                    clearError={setPasswordError}
                    errorMessage={'Your password should be at least 8 characters long!'}
                />
                <View style={styles.buttonsContainer}>
                    <SubmitButton
                        text={'Sign In'}
                        onPress={handleSubmit}
                    />
                </View>
            </View>
        </Body>
    )
}

export default SignIn