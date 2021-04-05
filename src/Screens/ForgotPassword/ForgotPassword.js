import React, { Component } from 'react';
import { View, Image, ScrollView, SafeAreaView, Text, TouchableWithoutFeedback, TouchableHighlight, Alert } from 'react-native';
import { styles } from "./css";
import Input from '../../Components/Input/Input';
import { width } from '../../Components/Dimensions/Dimensions';
import { goBack } from '../../Navigators/Router';
import checkEmailValidate from '../../Helpers/RegularExpression';
import { backgroundColorGrey } from '../../Components/Colors/Color';
import forgotPassword from '../../Api/forgotPassword';
import { loading } from '../../Helpers/Functions';

export default class ForgotPassword extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loaded: true,
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.loaded != nextState.loaded) {
            return true
        }
        return false
    }

    goBackToLoginRegisterScreen = () => {
        goBack()
    }

    setValue = (name, value) => {
        this.setState({ [name]: value}, () => {})
    }

    sendEmailResetPassword = async() => {
        if(!this.state.email || this.state.email == '') {
            Alert.alert('Alert' , 'Please enter email reset password')
        }
        else if(this.state.emailLogin && !checkEmailValidate(this.state.email)) {
            Alert.alert('Alert' , 'Wrong email format')
        }
        else {
            this.setState({ loaded: false })
            try{
                const res = await forgotPassword(this.state.email)
                if(res.status == 200) {
                    this.setState({ loaded: true })
                    const resp = await res.json() 
                    console.log(resp)
                    if(resp.code == 200 || resp.status == 'SUCCESS') {
                        Alert.alert('Send email sucess !!!', 'Please check your email to receive new password');
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
                        {text: 'Try Again', onPress: () => this.sendEmailResetPassword()}
                    ]
                )
            }
        }
    }

    clearFormForgot = () => {
        this.childEmailForgot.clearOldInput()
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorGrey }}>
                {this.state.loaded ? null : loading()}
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.top}>
                            <Image
                                style={styles.logo}
                                source={require('../../Assets/Images/logo.png')}
                            />
                            <View style={styles.titleWrapper}>
                                <Text style={styles.title}>Please enter your registered email to reset password</Text>
                            </View>
                        </View>

                        <View style={styles.body}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Email Address</Text>
                                <Input
                                    name='email'
                                    setValue={this.setValue}
                                    editable={true}
                                    multiline={false}
                                    hideshowText={false}
                                    width={width/1.2 - 40}
                                    btnGroupWidth={30}
                                    length={35}
                                    marginLeft={10}
                                    keyboardType='email-address'
                                    onRef={ref => (this.childEmailLogin = ref)}
                                />
                            </View>
                            <TouchableHighlight
                                style={styles.btn}
                                underlayColor='silver'
                                onPress={this.sendEmailResetPassword}
                            >
                                <Text style={styles.btnTitle}>Send Email</Text>
                            </TouchableHighlight>
                            <View style={styles.backWrapper}>
                                <TouchableWithoutFeedback onPress={this.goBackToLoginRegisterScreen}>
                                    <Text style={styles.backTitle}>Have an account already OR Sign Up New Account !!!</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

