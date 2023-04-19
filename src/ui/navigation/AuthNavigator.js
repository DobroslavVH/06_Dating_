import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LogInFactory from '../../main/factories/screens/Auth/LogIn/LoginFactory'
import SignInFactory from '../../main/factories/screens/Auth/SignIn/SignInFactory'

import BottomNavigator from './BottomNavigator'

const Stack = createNativeStackNavigator()

const AuthNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name='LogIn'
                    component={LogInFactory}
                />
                <Stack.Screen
                    name='SignIn'
                    component={SignInFactory}
                />
                <Stack.Screen
                    name='Bottom'
                    component={BottomNavigator}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AuthNavigator