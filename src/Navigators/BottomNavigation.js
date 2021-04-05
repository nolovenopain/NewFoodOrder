import 'react-native-gesture-handler';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home/Home';
import Favourites from '../Screens/Favourites/Favourites';
import Notifications from '../Screens/Notifications/Notifications';
import Orders from '../Screens/Orders/Orders';
import MyAccount from '../Screens/MyAccount/MyAccount';

const Tab = createBottomTabNavigator();

function BottomNavigation(navigation) {
    return (
        <Tab.Navigator
            initialRouteName= "Home" 
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name == 'Home') {
                        iconName = focused ? 'home' : 'home';
                    } else if (route.name == 'Favourites') {
                        iconName = focused ? 'heart-outline' : 'heart-outline';
                        size = 30
                    } else if (route.name == 'Orders') {
                        iconName = focused ? 'document-text-outline' : 'document-text-outline';
                        size = 30
                    } else if (route.name == 'Notifications') {
                        iconName = focused ? 'notifications-outline' : 'notifications-outline';
                        size = 30
                    } else if (route.name == 'MyAccount') {
                        iconName = focused ? 'person-outline' : 'person-outline';
                        size = 30
                    } 
                    return  <Icon name={iconName} size={size} color={color}/>         
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                keyboardHidesTabBar: true,
                tabStyle: {
                    paddingTop: 15, 
                    backgroundColor: '#fff'
                }
            }}
            lazy={false}
        >
            <Tab.Screen name="Home" component={Home} options={{ title: '' }}/>
            <Tab.Screen name="Favourites" component={Favourites} options={{ title: '' }}/>
            <Tab.Screen name="Orders" component={Orders} options={{ title: '' }} />
            <Tab.Screen name="Notifications" component={Notifications} options={{ title: '' }} />
            <Tab.Screen name="MyAccount" component={MyAccount} options={{ title: '' }} />
        </Tab.Navigator>
    );
}

export default BottomNavigation;