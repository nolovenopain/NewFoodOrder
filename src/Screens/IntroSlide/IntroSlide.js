import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, Image } from 'react-native';
import { styles } from "./style";
import { navigate } from '../../Navigators/Router';

export default class IntroSlide extends Component {

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

    nextToSlide2 = () => { 
        navigate('IntroSlide2')
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
                                source={require('../../Assets/Images/imgSlide1.png')}
                            />
                        </View>
                    </View>
                    <View style={styles.bottom}>
                        <TouchableWithoutFeedback onPress={this.nextToSlide2}>
                            <View style={styles.btn}>
                                <Text style={styles.btnTitle}>Next</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

