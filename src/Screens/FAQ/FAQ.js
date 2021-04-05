import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { styles } from "./css";
import { backgroundColorWhite } from '../../Components/Colors/Color';
import { goBack } from '../../Navigators/Router';
import Icon from 'react-native-vector-icons/Ionicons';

export default class FAQ extends Component {

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

    goBack = () => {
        goBack()
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorWhite }}>
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
                                <Text style={styles.headerTitle}>FAQ</Text>
                            </View>
                            <View style={styles.headerRight}>

                            </View>
                        </View>

                        <ScrollView 
                            contentContainerStyle={styles.body}
                            showsVerticalScrollIndicator={false}    
                        >
                            <View style={styles.element}>
                                <Text style={styles.question}>
                                    Q: What are food additives?
                                </Text>

                                <Text style={styles.answer}>
                                    A: A food ingredient is any substance that is added to a food to achieve a desired effect. Direct food additives are used in foods to impart specific technological or functional qualities. For example, stabilizers are used to help prevent separation of nutrients in milk products, while phosphates are used as a leavening agent in baked goods.
                                </Text>
                            </View>
                        </ScrollView>
                    </View>
            </SafeAreaView>
        )
    }
}

