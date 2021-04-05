import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, ScrollView, Alert, TouchableHighlight } from 'react-native';
import { styles } from "./css";
import { backgroundColorWhite } from '../../Components/Colors/Color';
import { goBack } from '../../Navigators/Router';
import Icon from 'react-native-vector-icons/Ionicons';
import Input from '../../Components/Input/Input';
import { width } from '../../Components/Dimensions/Dimensions';
import { loading } from '../../Helpers/Functions';
import changePassword from '../../Api/changePassword';

export default class ChangePassword extends Component {

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

    goBack = () => {
        goBack()
    }

    setValue = (name, value) => { console.log(name, ': ', value)
        this.setState({ [name]: value}, () => {})
    }

    changePassword = async() => {
        if(!this.state.currentPassword || this.state.currentPassword == '') {
            Alert.alert('Alert', 'Please enter current password')
        }
        else if(!this.state.newPassword || this.state.newPassword == '') {
            Alert.alert('Alert', 'Please enter new password')
        }
        else if(!this.state.confirmPassword || this.state.confirmPassword == '') {
            Alert.alert('Alert', 'Please enter confirm password')
        }
        else {
            if(this.state.newPassword !== this.state.confirmPassword) {
                Alert.alert('Alert', 'Confirm password does not match')
            }
            else {
                this.setState({ loaded: false })
                try {
                    const res = await changePassword(
                        this.props.route.params.token,
                        this.state.currentPassword,
                        this.state.newPassword
                    )
                    if(res.status == 200) {
                        this.setState({ loaded: true })
                        const resp = await res.json() 
                        console.log(resp)
                        if(resp.code == 200) {
                            Alert.alert('Alert', 'Change password sucess');
                            this.childCurrentPassword.clearOldInput()
                            this.childPassword.clearOldInput()
                            this.childConfirmPassword.clearOldInput()
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
                            {text: 'Try Again', onPress: () => this.changePassword()}
                        ]
                    )
                }
            } 
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorWhite }}>
                {this.state.loaded ? null : loading()}
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableWithoutFeedback onPress={this.goBack}>
                                <Icon
                                    name='chevron-back'
                                    size={30}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.headerCenter}>
                            <Text style={styles.headerTitle}>Password</Text>
                        </View>
                        <View style={styles.headerRight}>

                        </View>
                    </View>

                    <ScrollView 
                        contentContainerStyle={styles.body}
                        showsVerticalScrollIndicator={false}    
                    >   
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={styles.inputTitle}>Current Password</Text>
                            </View>
                            <View style={styles.right}>
                                <Input
                                    placeholder='Current Password *'
                                    name='currentPassword'
                                    setValue={this.setValue}
                                    editable={true}
                                    multiline={false}
                                    hideshowText={true}
                                    width={(width - 30) / 2}
                                    length={20}
                                    textAlign='right'
                                    onRef={ref => (this.childCurrentPassword = ref)}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={styles.inputTitle}>New Password</Text>
                            </View>
                            <View style={styles.right}>
                                <Input
                                    placeholder='New Password *'
                                    name='newPassword'
                                    setValue={this.setValue}
                                    editable={true}
                                    multiline={false}
                                    hideshowText={true}
                                    width={(width - 30) / 2}
                                    length={20}
                                    textAlign='right'
                                    onRef={ref => (this.childPassword = ref)}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={styles.inputTitle}>Confirm Password</Text>
                            </View>
                            <View style={styles.right}>
                                <Input
                                    placeholder='Confirm Password *'
                                    name='confirmPassword'
                                    setValue={this.setValue}
                                    editable={true}
                                    multiline={false}
                                    hideshowText={true}
                                    width={(width - 30) / 2}
                                    length={20}
                                    textAlign='right'
                                    onRef={ref => (this.childConfirmPassword = ref)}
                                />
                            </View>
                        </View>
                            
                        <TouchableHighlight 
                            onPress={this.changePassword}
                            style={styles.saveBtn}
                            underlayColor='silver'
                        >
                            <Text style={styles.btnTitle}>Change Password</Text>
                        </TouchableHighlight>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

