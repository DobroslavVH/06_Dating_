import { Image } from 'react-native'
import React from 'react'

const CustomIcon = ({ name, focused, size }) => {

    let iconSource = ''

    switch (name) {
        case 'home':
            iconSource = require('../../assets/home.png')
            break
        case 'friends':
            iconSource = require('../../assets/friends.png')
            break
        case 'settings':
            iconSource = require('../../assets/settings.png')
            break
        default:
            iconSource = `require('../../assets/icon.png')`
    }

    return (
        <Image
            source={iconSource}
            style={{
                width: size,
                height: size,
                opacity: focused ? 1 : 0.5
            }}
        />
    )
}

export default CustomIcon