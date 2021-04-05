import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, Image, Alert, TouchableHighlight, ScrollView } from 'react-native';
import { styles } from "./css";
import { backgroundColorWhite } from '../../Components/Colors/Color';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons';
import { navigate } from '../../Navigators/Router';
import AsyncStorage from '@react-native-community/async-storage';
import { fetchToken, loading } from '../../Helpers/Functions';
import getUserProfile from '../../Api/getUserProfile';
import logout from '../../Api/logout';

export default class MyAccount extends Component {

    _isMounted = false;
    
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            user: {}
        };   
    }

    componentDidMount() {
        this._isMounted = true;
        setTimeout(async() => {
            const token = await fetchToken();
            if(this._isMounted) {
                var user = await this.getUser(token)
                this.setState({ 
                    user,
                    loaded: true,
                    token 
                })
            }
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.loaded != nextState.loaded ||
            this.state.user != nextState.user) {
                return true
            }
        return false
    }

    getUser = token => async(e) => {
        try {
            var user = {}
            const res = await getUserProfile(token);
            if(res.status == 200) {
                const resp = await res.json()
                if(resp.code == 200) {
                    user = resp.data
                    console.log(user)
                }
            }
            else if(res.status == 500) {
                Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
            }    
            return user
        }
        catch(error) {
            this.setState({ loaded: true })
            console.log(error)
            Alert.alert(
                'Sorry, something went wrong. Please try again',
                error.message,
                [
                    {text: 'Try Again', onPress: () => this.getUser()}
                ]
            )
        }
    }

    goToEditProfile = () => {
        navigate('EditProfile', {
            token: this.state.token,
            user: this.state.user,
            getUser: () => this.getUser()
        })
    }

    goToFAQ = () => {
        navigate('FAQ')
    }

    goToTermAndPolicy = () => {
        navigate('TermAndPolicy')
    }

    goToSupport = () => {
        navigate('Support')
    }

    goToAboutUs = () => {
        navigate('AboutUs')
    }

    askLogOut = () => {
        Alert.alert(
            'Log Out',
            'Are you sure you want to log out ?',
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'OK', onPress: () => {
                    AsyncStorage
                    .clear()
                    .then(() => { 
                        // this.props.navigation.replace('UserNavigation')
                        this.logOut()
                    })
                }}
            ],
            {cancelable: true}
        )
    }

    logOut = async() => {
        try {    
            const res = await logout(this.state.token);
            if(res.status == 200) {
                const resp = await res.json()
                if(resp.code == 200) {
                    this.props.navigation.replace('UserNavigation')
                }
            }
            else if(res.status == 500) {
                this.setState({ loaded: true })
                Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
            }
        }
        catch(error) {
            this.setState({ loaded: true })
            console.log(error)
            Alert.alert(
                'Sorry, something went wrong. Please try again',
                error.message,
                [
                    {text: 'Try Again', onPress: () => this.logOut()}
                ]
            )
        }
    }

    goToChangePassword = () => {
        navigate('ChangePassword', { token: this.state.token })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorWhite }}>
                { !this.state.loaded ? loading() : null }
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>My Account</Text>
                        </View>

                        <ScrollView 
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ alignItems: 'center' }}
                        >
                            <View style={styles.body}>
                                <TouchableWithoutFeedback onPress={this.goToEditProfile}>
                                    <View style={styles.accountRow}>
                                        <Image
                                            style={styles.avatar}
                                            source={ 
                                                !this.state.user.avatar || 
                                                    ( this.state.user.avatar == '' && this.state.user.avatar ) ? 
                                                    require('../../Assets/Images/noAvatar.png') : { uri: this.state.user.avatar }
                                            }
                                        />
                                        <View style={styles.accountRowCenter}>
                                            <Text style={styles.userName}>{this.state.user.name}</Text>
                                            <Text style={styles.userEmail}>{this.state.user.email}</Text>
                                        </View>
                                        <View style={styles.accountRowRight}>
                                            
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={this.goToChangePassword}>
                                    <View style={styles.row}>
                                        <View style={styles.rowLeft}>
                                            <Icon
                                                name='lock-closed-outline'
                                                size={22}
                                                color='#fff'
                                            />
                                        </View>
                                        <View style={styles.rowCenter}>
                                            <Text style={styles.rowTitle}>Change Password</Text>
                                        </View>
                                        <View style={styles.rowRight}>
                                            <Icon
                                                name='chevron-forward'
                                                size={25}
                                                color='silver'
                                            />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={this.goToFAQ}>
                                    <View style={styles.row}>
                                        <View style={styles.rowLeft}>
                                            <Entypo
                                                name='pencil'
                                                size={22}
                                                color='#fff'
                                            />
                                        </View>
                                        <View style={styles.rowCenter}>
                                            <Text style={styles.rowTitle}>FAQ</Text>
                                        </View>
                                        <View style={styles.rowRight}>
                                            <Icon
                                                name='chevron-forward'
                                                size={25}
                                                color='silver'
                                            />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                                
                                <TouchableWithoutFeedback onPress={this.goToTermAndPolicy}>
                                    <View style={styles.row}>
                                        <View style={styles.rowLeft}>
                                            <Icon
                                                name='document-text-outline'
                                                size={22}
                                                color='#fff'
                                            />
                                        </View>
                                        <View style={styles.rowCenter}>
                                            <Text style={styles.rowTitle}>TermAndPolicy</Text>
                                        </View>
                                        <View style={styles.rowRight}>
                                            <Icon
                                                name='chevron-forward'
                                                size={25}
                                                color='silver'
                                            />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={this.goToSupport}>
                                    <View style={styles.row}>
                                        <View style={styles.rowLeft}>
                                            <Icon
                                                name='settings-outline'
                                                size={22}
                                                color='#fff'
                                            />
                                        </View>
                                        <View style={styles.rowCenter}>
                                            <Text style={styles.rowTitle}>Support</Text>
                                        </View>
                                        <View style={styles.rowRight}>
                                            <Icon
                                                name='chevron-forward'
                                                size={25}
                                                color='silver'
                                            />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={this.goToAboutUs}>
                                    <View style={styles.row}>
                                        <View style={styles.rowLeft}>
                                            <Icon
                                                name='ios-alert-circle-outline'
                                                size={25}
                                                color='#fff'
                                            />
                                        </View>
                                        <View style={styles.rowCenter}>
                                            <Text style={styles.rowTitle}>About Us</Text>
                                        </View>
                                        <View style={styles.rowRight}>
                                            <Icon
                                                name='chevron-forward'
                                                size={25}
                                                color='silver'
                                            />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                            <View style={styles.bottom}>
                                <TouchableHighlight 
                                    style={styles.btn}
                                    onPress={this.askLogOut}
                                    underlayColor='silver'
                                >
                                    <Text style={styles.btnTitle}>Log Out</Text>
                                </TouchableHighlight>
                            </View>
                        </ScrollView>
                    </View>
            </SafeAreaView>
        )
    }
}

