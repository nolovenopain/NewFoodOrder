import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, Image } from 'react-native';
import { navigate } from '../../Navigators/Router';
import { styles } from "./style3";
import AsyncStorage from '@react-native-community/async-storage';

export default class IntroSlide3 extends Component {

    _isMounted = false;
    
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    nextToLoginRegister = () => {
        AsyncStorage.setItem('introSlide', 'actived')
        navigate('LoginRegister')
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.top}>
                        <View style={styles.slogan}>
                            <Image
                                style={styles.slogan1}
                                source={require('../../Assets/Images/foodForEveryone.png')}
                            />
                            <Image
                                style={styles.slogan2}
                                source={require('../../Assets/Images/makeItSimple.png')}
                            />
                        </View>
                        <View style={styles.image}>
                            <Image
                                style={styles.bgImage}
                                source={require('../../Assets/Images/imgSlide3.png')}
                            />
                        </View>
                    </View>
                    <View style={styles.bottom}>
                        <TouchableWithoutFeedback onPress={this.nextToLoginRegister}>
                            <View style={styles.btn}>
                                <Text style={styles.btnTitle}>Get started</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

