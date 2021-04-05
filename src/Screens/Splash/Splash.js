import React, { Component } from 'react';
import { Image, Text, SafeAreaView } from 'react-native';
import { styles } from "./css";
import AsyncStorage from '@react-native-community/async-storage';
import { images } from '../../Constants'

export default class Splash extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    performTimeConsumingTask = async() => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                2000
            )
        )
    }

    async componentDidMount() {
        this._isMounted = true;
        const data = await this.performTimeConsumingTask();
        if (data !== null) {
            if(await AsyncStorage.getItem('introSlide') == null) {
                this.props.navigation.replace('IntroSlide')
            }
            else {
                if(await AsyncStorage.getItem('token') == null) {
                    this.props.navigation.replace('LoginRegister');
                }
                else {
                    this.props.navigation.replace('BottomNavigation');
                }
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Image
                    style={styles.logo}
                    source={images.logo}
                />
                <Text style={styles.title}>The app that caters to you</Text>
            </SafeAreaView>
        )
    }
}

