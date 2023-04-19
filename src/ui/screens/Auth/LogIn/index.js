import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Body from '../../../components/Body/Body'
import styles from './styles'
import AuthScreensHeader from '../Components/AuthScreensHeader'
import InputField from '../../../components/InputField/InputField'
import SubmitButton from '../../../components/Buttons/SubmitButton/SubmitButton'
import { useNavigation } from '@react-navigation/native'
import ToastMessage from '../../../components/ToastMessage/ToastMessage'
import UserContext from '../../../context/UserContext'
import { reactQuery, reactQueryTypes } from '../../../core/query'

const LogIn = ({
    getUser
}) => {

    const navigation = useNavigation()
    const { setUserId, setUser, setNumberOfRequests } = useContext(UserContext)

    useEffect(() => {
        reactQuery.removeQueries(reactQueryTypes.userQuery)
    }, [])

    const [username, setUsername] = useState('test_3@test.com')
    const [password, setPassword] = useState('testtest')
    const [userAlertVisible, setUserAlertvisible] = useState(false)

    const handleSubmit = async () => {
        const data = await getUser({ username, password })

        if (data === undefined) {
            setUserAlertvisible(true)
            setTimeout(() => setUserAlertvisible(false), 2000)
        } else {
            setUser(data)
            setNumberOfRequests(data?.friendRequests?.filter(item => item !== '')?.length)
            setUserId(data?.userId)
            navigation.navigate('Bottom')
        }
    }

    const renderNoAccount = () => {
        return (
            <View style={styles.linkContainer}>
                <Text style={styles.inactiveText}>Don't have account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                    <Text style={styles.activeText}>Create one?</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <Body header>
            <View style={styles.container}>
                <AuthScreensHeader
                    title={'Log In'}
                    goBack={false}
                />
                <InputField
                    fieldName={'Email'}
                    setText={setUsername}
                    value={username}

                />
                <InputField
                    fieldName={'Password'}
                    setText={setPassword}
                    value={password}
                    isPasswordField={true}

                />
                <View style={styles.buttonsContainer}>
                    <SubmitButton
                        text={'Log In'}
                        onPress={handleSubmit}
                    />
                    {renderNoAccount()}
                </View>
                <ToastMessage visible={userAlertVisible} text={'No user found!'} />
            </View>
        </Body>
    )
}

export default LogIn