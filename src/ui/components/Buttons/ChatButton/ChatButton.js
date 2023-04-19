import { TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../../../constants/colors'

const ChatButton = ({ user }) => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Chat', { friend: user })}
            style={{
                width: 35,
                height: 35,
                borderRadius: 25,
                backgroundColor: colors.blue,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 5
            }}
        >
            <Image
                source={require('../../../assets/chat.png')}
                style={{ width: 30, height: 30 }}
            />
        </TouchableOpacity>
    )
}

export default ChatButton