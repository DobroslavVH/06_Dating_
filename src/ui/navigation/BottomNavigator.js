import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreenFactory from '../../main/factories/screens/HomeScreen/HomeScreenFactory';
import MyFriendsScreenFactory from '../../main/factories/screens/MyFriendsScreen/MyFriendsScreenFactory';
import MyProfileScreenFactory from '../../main/factories/screens/MyProfileScreen/MyProfileScreenFactory';
import UserProfileFactory from '../../main/factories/screens/UserProfile/UserProfileFactory';
import EditProfile from '../screens/MyProfileScreen/components/EditMyProfile/EditProfile';
import CreateStoryFactory from '../../main/factories/screens/MyProfileScreen/CreateStoryFactory';

import { useContext } from 'react';
import UserContext from '../context/UserContext';
import CustomIcon from '../components/Buttons/CustomIcon';
import AllMyFriends from '../screens/MyFriendsScreen/components/AllMyFriendsList';
import ChatScreenFactory from '../../main/factories/screens/ChatScreen/ChatScreenFactory';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='HomeScreen'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='HomeScreen'
                options={{
                    presentation: 'modal'
                }}
                component={HomeScreenFactory}
            />
            <Stack.Screen
                name='UserProfile'
                component={UserProfileFactory}
            />
        </Stack.Navigator>
    )
}

const FriendsStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Friends"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Friends"
                component={MyFriendsScreenFactory}
                options={{
                    presentation: 'formSheet'
                }}
            />
            <Stack.Screen
                name='UserProfile'
                component={UserProfileFactory}
                options={{
                    presentation: 'formSheet'
                }}
            />
            <Stack.Screen
                name='AllMyFriends'
                component={AllMyFriends}
                options={{
                    presentation: 'formSheet',
                }}
            />
            <Stack.Screen
                name='Chat'
                component={ChatScreenFactory}
                options={{
                    presentation: 'formSheet',
                }}
            />
        </Stack.Navigator>
    )
}

const ProfileStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Profile'
            screenOptions={{
                headerShown: false

            }}
        >
            <Stack.Screen
                name="Profile"
                component={MyProfileScreenFactory}
            />
            <Stack.Screen
                name='EditProfile'
                component={EditProfile}
                options={{
                    presentation: 'formSheet'
                }}
            />
            <Stack.Screen
                name='CreateStory'
                component={CreateStoryFactory}
                options={{
                    presentation: 'formSheet',
                    contentStyle: {
                        backgroundColor: 'rgba(0,0,0,0)'
                    },
                }}
            />
        </Stack.Navigator>
    )
}



const BottomNavigator = () => {
    const { user, numberOfFriendRequests } = useContext(UserContext)
    return (
        <Tab.Navigator
            initialRouteName='HomeStack'
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ focused }) => <CustomIcon name='home' size={focused ? 40 : 30} />
                }}
            />
            <Tab.Screen
                name="My Friends"
                component={FriendsStack}
                options={{
                    tabBarBadge: numberOfFriendRequests || null,
                    tabBarIcon: ({ focused }) => <CustomIcon name='friends' focused={focused} size={focused ? 40 : 30} />
                }}
            />
            <Tab.Screen
                name="My Profile"
                component={ProfileStack}
                options={{
                    tabBarIcon: ({ focused }) => <CustomIcon name='settings' size={focused ? 40 : 30} />
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomNavigator