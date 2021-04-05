import React, { Component } from 'react';
import { View, Image, ScrollView, SafeAreaView, Text, TouchableWithoutFeedback, TouchableHighlight, Alert, ToastAndroid } from 'react-native';
import { styles } from "./css";
import { tomato, backgroundColorGrey } from '../../Components/Colors/Color';
import Input from '../../Components/Input/Input';
import { width } from '../../Components/Dimensions/Dimensions';
import { navigate } from '../../Navigators/Router';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { checkEmailValidate } from '../../Helpers/RegularExpression';
import { login, loginViaSocial } from '../../Api/login';
import register from '../../Api/register';
import { loading } from '../../Helpers/Functions';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { GraphRequest, GraphRequestManager, AccessToken, LoginManager } from 'react-native-fbsdk';

export default class LoginRegister extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loginTabActive: true,
            loaded: true,
            emailLogin: '',
            emailRegister: '',
            passwordLogin: '',
            passwordRegister: '',
            firstName: '',
            lastName: '',
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this._isMounted && GoogleSignin.configure({
            webClientId: '749475631444-725g0260hmmh0cvfrfkj99p8v2q6gnr2.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.loaded != nextState.loaded || 
            this.state.loginTabActive !== nextState.loginTabActive) {
            return true
        }
        return false
    }

    changeToLoginTab = () => {
        this.setState({ loginTabActive: true })
    }

    changeToRegisterTab = () => {
        this.setState({ loginTabActive: false })
    }

    goToForgotPasswordScreen = () => {
        navigate('ForgotPassword')
    }

    setValue = (name, value) => {
        this.setState({ [name]: value}, () => {})
    }
    
    loginViaFb = async() => {
        try {
            LoginManager.logInWithPermissions(["public_profile"]).then(
                (result) => {
                    this.setState({ loaded: false })
                    if (result.isCancelled) {
                        this.setState({ loaded: true })
                        ToastAndroid.show('Login cancelled', ToastAndroid.SHORT)
                    } else {
                        ToastAndroid.show('Login successfully', ToastAndroid.SHORT)
                        AccessToken.getCurrentAccessToken().then(
                            (data) => {
                                const accessToken = data.accessToken.toString()
                                const PROFILE_REQUEST_PARAMS = {
                                    fields: {
                                        string: 'id, name, email, gender'
                                    },
                                }
                                const profileRequest = new GraphRequest('/me', { accessToken, parameters: PROFILE_REQUEST_PARAMS },
                                    async(error, result) => {
                                        if (error) {
                                            this.setState({ loaded: true })
                                            console.log('Login Info has an error:', error)
                                        }
                                        else {
                                            if (result.isCancelled) {
                                                this.setState({ loaded: true })
                                                ToastAndroid.show('Login cancelled', ToastAndroid.SHORT)
                                            }
                                            if(result.email === undefined){
                                                this.setState({ loaded: true })
                                                Alert.alert("Error","To contiune Food Order plase allow access to your email", "Ok")
                                            }
                                            else{
                                                console.log(result)
                                                const profilePicUrl = 'http://graph.facebook.com/' + result.id + '/picture?type=large'
                                                const res = await loginViaSocial(
                                                    result.name, 
                                                    result.email, 
                                                    profilePicUrl,
                                                    's'
                                                )
                                                if(res.status == 200) {
                                                    this.setState({ loaded: true })
                                                    const resp = await res.json() ;
                                                    if(resp.code == 200) {
                                                        await AsyncStorage.setItem('token', resp.data.token);
                                                        this.props.navigation.replace('BottomNavigation')
                                                    }
                                                    else if(resp.code == 222) {
                                                        Alert.alert('Error !!!', resp.message);
                                                    }
                                                    else if(resp.code == 223) {
                                                        Alert.alert('Error !!!', resp.message);
                                                    }
                                                    else if(resp.code == 202) {
                                                        console.log('Error: ', resp.message);
                                                    }
                                                }
                                                else if(res.status == 500) {
                                                    this.setState({ loaded: true })
                                                    Alert.alert('Error !!!', 'Bad request. Please log in again !!!');
                                                }
                                            }
                                        }
                                    },
                                )
                                new GraphRequestManager().addRequest(profileRequest).start()
                            }
                        )
                    }
                },
                (error) => {
                  console.log("Login fail with error: " + error);
                }
            );
        }
        catch(error) {
            this.setState({ loaded: true })
            console.log(error)
            Alert.alert(
                'Sorry, something went wrong. Please try again',
                error.message,
                [
                    {text: 'Try Again', onPress: () => this.loginViaFb()}
                ]
            )
        }
    }

    loginViaGoogle = async() => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn(); 
            this.setState({ loaded: false })
            try {
                const res = await loginViaSocial(
                    userInfo.user.name, 
                    userInfo.user.email, 
                    userInfo.user.photo,
                    's'
                )
                if(res.status == 200) {
                    this.setState({ loaded: true })
                    const resp = await res.json() ;
                    if(resp.code == 200) {
                        ToastAndroid.show('Login successfully', ToastAndroid.SHORT)
                        await AsyncStorage.setItem('token', resp.data.token);
                        this.props.navigation.replace('BottomNavigation')
                    }
                    else if(resp.code == 222) {
                        Alert.alert('Error !!!', resp.message);
                    }
                    else if(resp.code == 223) {
                        Alert.alert('Error !!!', resp.message);
                    }
                    else if(resp.code == 202) {
                        console.log('Error: ', resp.message);
                    }
                }
                else if(res.status == 500) {
                    this.setState({ loaded: true })
                    Alert.alert('Error !!!', 'Bad request. Please log in again !!!');
                }
            }
            catch(error) {
                this.setState({ loaded: true })
                console.log(error)
                Alert.alert(
                    'Sorry, something went wrong. Please try again',
                    error.message,
                    [
                        {text: 'Try Again', onPress: () => this.loginViaGoogle()}
                    ]
                )
            }
        } catch (error) {  
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                ToastAndroid.show('Login cancelled', ToastAndroid.SHORT)
            } else if (error.code === statusCodes.IN_PROGRESS) {
                ToastAndroid.show('Inprogess', ToastAndroid.SHORT)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                ToastAndroid.show('Play services not available', ToastAndroid.SHORT)
            } else {
                // some other error happened
            }
        }
    }

    login = async() => {
        if(!this.state.emailLogin || this.state.emailLogin == '') {
            Alert.alert('Alert', 'Please enter email login')
        }
        else if(this.state.emailLogin && !checkEmailValidate(this.state.emailLogin)) {
            Alert.alert('Alert', 'Wrong email login format')
        }
        else if(!this.state.passwordLogin || this.state.passwordLogin == '') {
            Alert.alert('Alert', 'Please enter password login')
        }
        else {
            this.setState({ loaded: false })
            try{
                const res = await login(
                    this.state.emailLogin, 
                    this.state.passwordLogin, 
                    'n'
                )
                if(res.status == 200) {
                    this.setState({ loaded: true })
                    ToastAndroid.show('Login successfully', ToastAndroid.SHORT)
                    const resp = await res.json()
                    console.log(resp)
                    if(resp.code == 200) {
                        await AsyncStorage.setItem('token', resp.data.token);
                        this.props.navigation.replace('BottomNavigation')
                    }
                    else if(resp.code == 222) {
                        Alert.alert('Error !!!', resp.message);
                    }
                    else if(resp.code == 223) {
                        Alert.alert('Error !!!', resp.message);
                    }
                    else if(resp.code == 233) {
                        Alert.alert('Error !!!', resp.message);
                    }
                    else if(resp.code == 202) {
                        console.log('Error: ', resp.message);
                    }
                }
                else if(res.status == 500) {
                    this.setState({ loaded: true })
                    Alert.alert('Error !!!', 'Bad request. Please log in again !!!');
                }
            }
            catch(error) {
                this.setState({ loaded: true })
                console.log(error)
                Alert.alert(
                    'Sorry, something went wrong. Please try again',
                    error.message,
                    [
                        {text: 'Try Again', onPress: () => this.login()}
                    ]
                )
            }
        }
    }

    signUp = async() => {
        if(!this.state.firstName || this.state.firstName == '') {
            Alert.alert('Alert', 'Please enter first name')
        }
        else if(!this.state.lastName || this.state.lastName == '') {
            Alert.alert('Alert', 'Please enter last name')
        }
        else if(!this.state.emailRegister || this.state.emailRegister == '') {
            Alert.alert('Alert', 'Please enter email register')
        }
        else if(this.state.emailRegister && !checkEmailValidate(this.state.emailRegister)) {
            Alert.alert('Alert', 'Wrong email register format')
        }
        else if(!this.state.passwordRegister || this.state.passwordRegister == '') {
            Alert.alert('Alert', 'Please enter password register')
        }
        else {
            this.setState({ loaded: false })
            try {
                const res = await register(
                    this.state.firstName,
                    this.state.lastName,
                    this.state.emailRegister, 
                    this.state.passwordRegister
                )
                if(res.status == 200) {
                    this.setState({ loaded: true })
                    const resp = await res.json()
                    console.log(resp)
                    if(resp.code == 200) {
                        await AsyncStorage.setItem('token', resp.data.token);
                        this.props.navigation.replace('BottomNavigation')
                    }
                    else if(resp.code == 225) {
                        Alert.alert('Error !!!', resp.message);
                    }
                    else if(resp.code == 223) {
                        Alert.alert('Error !!!', resp.message);
                    }
                    else if(resp.code == 202) {
                        console.log('Error: ', resp.message);
                    }
                }
                else if(res.status == 500) {
                    this.setState({ loaded: true })
                    Alert.alert('Error !!!', 'Bad request. Please log in again !!!');
                }
            }
            catch(error) {
                this.setState({ loaded: true })
                console.log(error)
                Alert.alert(
                    'Sorry, something went wrong. Please try again',
                    error.message,
                    [
                        {text: 'Try Again', onPress: () => this.signUp()}
                    ]
                )
            }
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorGrey }}>
                {this.state.loaded ? null : loading()}
                <ScrollView 
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                >
                        <View style={styles.top}>
                            <Image
                                style={styles.logo}
                                source={require('../../Assets/Images/logo.png')}
                            />
                            {this.state.loginTabActive ? 
                                <View style={styles.titleWrapper}>
                                    <Text style={styles.title}>Enter your details and start journey with us.</Text>
                                </View> : null
                            }
                            <View style={styles.tabBarGroup}>
                                <View style={styles.tabBarGroupLeft}>
                                    <TouchableWithoutFeedback onPress={this.changeToLoginTab}>
                                        <View style={
                                            [
                                                styles.loginTab,
                                                { 
                                                    borderBottomColor: this.state.loginTabActive ? tomato : '#fff', 
                                                    borderBottomWidth: this.state.loginTabActive ? 3 : 0
                                                }
                                            ]
                                            
                                        }>
                                            <Text style={styles.tabTitle}>Login</Text>
                                        </View> 
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.tabBarGroupRight}>
                                    <TouchableWithoutFeedback onPress={this.changeToRegisterTab}>
                                        <View style={
                                            [
                                                styles.registerTab,
                                                {
                                                    borderBottomColor: !this.state.loginTabActive ? tomato : '#fff', 
                                                    borderBottomWidth: !this.state.loginTabActive ? 3 : 0
                                                }
                                            ]
                                        }>
                                            <Text style={styles.tabTitle}>Sign Up</Text>
                                        </View> 
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>

                        {this.state.loginTabActive ? 
                            // LOGIN TAB
                            <View style={styles.body}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Email Address</Text>
                                    <Input
                                        name='emailLogin'
                                        setValue={this.setValue}
                                        editable={true}
                                        multiline={false}
                                        hideshowText={false}
                                        width={width/1.2 - 40}
                                        btnGroupWidth={30}
                                        length={35}
                                        marginLeft={10}
                                        keyboardType='email-address'
                                        nextInput={this.childPasswordLogin}
                                        onRef={ref => (this.childEmailLogin = ref)}
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Password</Text>
                                    <Input
                                        name='passwordLogin'
                                        setValue={this.setValue}
                                        editable={true}
                                        multiline={false}
                                        hideshowText={true}
                                        hideshowIcon={true}
                                        width={width/1.2 - 80}
                                        btnGroupWidth={70}
                                        length={30}
                                        marginLeft={10}
                                        marginRight={5}
                                        onRef={ref => (this.childPasswordLogin = ref)}
                                    />
                                </View>
                                <View style={styles.forgotPasswordWrapper}>
                                    <TouchableWithoutFeedback onPress={this.goToForgotPasswordScreen}>
                                        <Text style={styles.forgotPasswordTitle}>Forgot Password ?</Text>
                                    </TouchableWithoutFeedback>
                                </View>  
                                <TouchableHighlight 
                                    style={styles.btn}
                                    underlayColor='silver'
                                    onPress={this.login}
                                >
                                    <Text style={styles.btnTitle}>Login</Text>
                                </TouchableHighlight>
                                <View style={styles.loginWithGroup}>
                                    <Text style={styles.loginWithText}>Or Login With: </Text>
                                    <TouchableWithoutFeedback onPress={this.loginViaFb}>
                                        <FontAwesome
                                            name='facebook-square'
                                            size={45}
                                            color='#3b5998'
                                            style={styles.facebook}
                                        />
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={this.loginViaGoogle}>
                                        <FontAwesome
                                            name='google-plus-square'
                                            size={45}
                                            color={tomato}
                                            style={styles.google}
                                        />
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                                :
                            // SIGN UP TAB
                            <View style={styles.body}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>First Name</Text>
                                    <Input
                                        name='firstName'
                                        setValue={this.setValue}
                                        editable={true}
                                        multiline={false}
                                        hideshowText={false}
                                        width={width/1.2 - 40}
                                        btnGroupWidth={30}
                                        length={35}
                                        marginLeft={10}
                                        nextInput={this.childLastName}
                                        onRef={ref => (this.childFirstName = ref)}
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Last Name</Text>
                                    <Input
                                        name='lastName'
                                        setValue={this.setValue}
                                        editable={true}
                                        multiline={false}
                                        hideshowText={false}
                                        width={width/1.2 - 40}
                                        btnGroupWidth={30}
                                        length={35}
                                        marginLeft={10}
                                        nextInput={this.childEmailRegister}
                                        onRef={ref => (this.childLastName = ref)}
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Email address</Text>
                                    <Input
                                        name='emailRegister'
                                        setValue={this.setValue}
                                        editable={true}
                                        multiline={false}
                                        hideshowText={false}
                                        width={width/1.2 - 40}
                                        btnGroupWidth={30}
                                        length={35}
                                        marginLeft={10}
                                        keyboardType='email-address'
                                        nextInput={this.childPasswordRegister}
                                        onRef={ref => (this.childEmailRegister = ref)}
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Password</Text>
                                    <Input
                                        name='passwordRegister'
                                        setValue={this.setValue}
                                        editable={true}
                                        multiline={false}
                                        hideshowText={true}
                                        hideshowIcon={true}
                                        width={width/1.2 - 80}
                                        btnGroupWidth={70}
                                        length={30}
                                        marginLeft={10}
                                        marginRight={5}
                                        onRef={ref => (this.childPasswordRegister = ref)}
                                    />
                                </View>
                                <TouchableHighlight 
                                    style={[styles.btn, { marginTop: 10 }]}
                                    underlayColor='silver'
                                    onPress={this.signUp}
                                >
                                    <Text style={styles.btnTitle}>Sign Up</Text>
                                </TouchableHighlight>      
                            </View>
                        }
                </ScrollView>
            </SafeAreaView>
        )
    }
}

