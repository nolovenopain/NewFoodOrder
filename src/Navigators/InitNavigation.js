import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from '../Navigators/Router';
import BottomNavigation from '../Navigators/BottomNavigation';
import Splash from '../Screens/Splash/Splash';
import IntroSlide from '../Screens/IntroSlide/IntroSlide';
import IntroSlide2 from '../Screens/IntroSlide/IntroSlide2';
import IntroSlide3 from '../Screens/IntroSlide/IntroSlide3';
import LoginRegister from '../Screens/LoginRegister/LoginRegister';
import ForgotPassword from '../Screens/ForgotPassword/ForgotPassword';
import StoreDetails from '../Screens/StoreDetails/StoreDetails';
import MyCart from '../Screens/MyCart/MyCart';
import DeliveryAddress from '../Screens/DeliveryAddress/DeliveryAddress';
import CreateNewAddress from '../Screens/CreateNewAddress/CreateNewAddress';
import EditAddress from '../Screens/EditAddress/EditAddress';
import ListSelection from '../Screens/ListSelection/ListSelection';
import FoodDetails from '../Screens/FoodDetails/FoodDetails';
import Tracking from '../Screens/Tracking/Tracking';
import Call from '../Screens/Call/Call';
import Chat from '../Screens/Chat/Chat';
import BankCard from '../Screens/BankCard/BankCard';
import AddBankAccount from '../Screens/AddBankAccount/AddBankAccount';
import AddCard from '../Screens/AddCard/AddCard';
import ListPromotion from '../Screens/ListPromotion/ListPromotion';
import Search from '../Screens/Search/Search';
import Favourites from '../Screens/Favourites/Favourites';
import FAQ from '../Screens/FAQ/FAQ';
import TermAndPolicy from '../Screens/TermAndPolicy/TermAndPolicy';
import Support from '../Screens/Support/Support';
import AboutUs from '../Screens/AboutUs/AboutUs';
import EditProfile from '../Screens/EditProfile/EditProfile';
import ChangePassword from '../Screens/ChangePassword/ChangePassword';
import NotificationDetails from '../Screens/NotificationDetails/NotificationDetails';
import OrderDetails from '../Screens/OrderDetails/OrderDetails';
import MapViewer from '../Screens/MapViewer/MapViewer';

const InitialStack = createStackNavigator();

function InitialNavigation() {
    return(
        <NavigationContainer ref={navigationRef}>
            <InitialStack.Navigator
                initialRouteName='Splash'
                screenOptions={{ headerShown: false }}
            >
                <InitialStack.Screen
                    name='Splash'
                    component={Splash}
                />
                <InitialStack.Screen
                    name='IntroSlide'
                    component={IntroSlide}
                />
                <InitialStack.Screen
                    name='IntroSlide2'
                    component={IntroSlide2}
                />
                <InitialStack.Screen
                    name='IntroSlide3'
                    component={IntroSlide3}
                />
                <InitialStack.Screen
                    name='LoginRegister'
                    component={LoginRegister}
                />
                <InitialStack.Screen
                    name='ForgotPassword'
                    component={ForgotPassword}
                />
                <InitialStack.Screen
                    name='StoreDetails'
                    component={StoreDetails}
                />
                <InitialStack.Screen
                    name='MyCart'
                    component={MyCart}
                />
                <InitialStack.Screen
                    name='DeliveryAddress'
                    component={DeliveryAddress}
                />
                <InitialStack.Screen
                    name='CreateNewAddress'
                    component={CreateNewAddress}
                />
                <InitialStack.Screen
                    name='EditAddress'
                    component={EditAddress}
                />
                <InitialStack.Screen
                    name='ListSelection'
                    component={ListSelection}
                />
                <InitialStack.Screen
                    name='FoodDetails'
                    component={FoodDetails}
                />
                <InitialStack.Screen
                    name='Tracking'
                    component={Tracking}
                />
                <InitialStack.Screen
                    name='Call'
                    component={Call}
                />
                <InitialStack.Screen
                    name='Chat'
                    component={Chat}
                />
                <InitialStack.Screen
                    name='BankCard'
                    component={BankCard}
                />
                <InitialStack.Screen
                    name='AddBankAccount'
                    component={AddBankAccount}
                />
                <InitialStack.Screen
                    name='AddCard'
                    component={AddCard}
                />
                <InitialStack.Screen
                    name='ListPromotion'
                    component={ListPromotion}
                />
                <InitialStack.Screen
                    name='Search'
                    component={Search}
                />
                <InitialStack.Screen
                    name='Favourites'
                    component={Favourites}
                />
                <InitialStack.Screen
                    name='EditProfile'
                    component={EditProfile}
                />
                <InitialStack.Screen
                    name='AboutUs'
                    component={AboutUs}
                />
                <InitialStack.Screen
                    name='Support'
                    component={Support}
                />
                <InitialStack.Screen
                    name='TermAndPolicy'
                    component={TermAndPolicy}
                />
                <InitialStack.Screen
                    name='FAQ'
                    component={FAQ}
                />
                <InitialStack.Screen
                    name='ChangePassword'
                    component={ChangePassword}
                />
                <InitialStack.Screen
                    name='NotificationDetails'
                    component={NotificationDetails}
                />
                <InitialStack.Screen
                    name='OrderDetails'
                    component={OrderDetails}
                />
                <InitialStack.Screen
                    name='MapViewer'
                    component={MapViewer}
                />
                <InitialStack.Screen
                    name='BottomNavigation'
                    component={BottomNavigation}
                />
            </InitialStack.Navigator>
        </NavigationContainer>
    )
}

export default InitialNavigation;