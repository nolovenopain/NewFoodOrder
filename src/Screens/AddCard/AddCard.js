import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from "./css";
import { backgroundColorGrey } from '../../Components/Colors/Color';
import { goBack, navigate } from '../../Navigators/Router';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-community/async-storage';
import Input from '../../Components/Input/Input';
import { width } from '../../Components/Dimensions/Dimensions';

export default class AddBankAccount extends Component { 

    _isMounted = false;
    
    constructor(props) {
        super(props);
        this.state = {
            cardNumber: '156423345566'
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

    setValue = (name, value) => {
        this.setState({ [name]: value}, () => {})
    }

    scanCard = () => {

    }

    addCard = () => {
        
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorGrey }}>
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
                                <Text style={styles.headerTitle}>Debit/Credit</Text>
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
                                    <Text style={styles.title}>Name on card</Text>
                                </View>
                                <View style={styles.right}>
                                    <Input
                                        placeholder='card name'
                                        name='cardName'
                                        setValue={this.setValue}
                                        editable={true}
                                        multiline={false}
                                        hideshowText={false}
                                        width={(width - 30) / 2}
                                        length={20}
                                        textAlign='right'
                                        onRef={ref => (this.childCardName = ref)}
                                    />
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Text style={styles.title}>Card number</Text>
                                </View>
                                <View style={[styles.right, { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }]}>
                                    <Input
                                        name='cardNumber'
                                        setValue={this.setValue}
                                        oldValue={this.state.cardNumber}
                                        editable={true}
                                        multiline={false}
                                        hideshowText={false}
                                        width={(width - 30) / 2 - 40}
                                        length={15}
                                        textAlign='right'
                                        keyboardType='numeric'
                                        onRef={ref => (this.childExpDate = ref)}
                                    />
                                    <TouchableOpacity 
                                        onPress={this.scanCard}
                                        style={{ marginLeft: 5 }}
                                    >
                                        <Icon
                                            name='camera-outline'
                                            size={30}
                                            color='gray'
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Text style={styles.title}>Card style</Text>
                                </View>
                                <View style={[styles.right, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                                    <View style={styles.cardStyleBox}>
                                        <Fontisto
                                            name='visa'
                                            size={18}
                                            color='gray'
                                        />
                                    </View>
                                    <View style={styles.cardStyleBox}>
                                        <Fontisto
                                            name='mastercard'
                                            size={18}
                                            color='gray'
                                        />
                                    </View>
                                    <View style={styles.cardStyleBox}>
                                        <Fontisto
                                            name='jcb'
                                            size={18}
                                            color='gray'
                                        />
                                    </View>
                                    <View style={styles.cardStyleBox}>
                                        <Fontisto
                                            name='american-express'
                                            size={18}
                                            color='gray'
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Text style={styles.title}>Expiration Date</Text>
                                </View>
                                <View style={styles.right}>
                                    <Input
                                        placeholder='MM/YY'
                                        name='expDate'
                                        setValue={this.setValue}
                                        editable={true}
                                        multiline={false}
                                        hideshowText={false}
                                        width={(width - 30) / 2}
                                        length={20}
                                        textAlign='right'
                                        onRef={ref => (this.childExpDate = ref)}
                                    />
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Text style={styles.title}>Security code</Text>
                                </View>
                                <View style={styles.right}>
                                    <Input
                                        placeholder='sec.Code'
                                        name='securityCode'
                                        setValue={this.setValue}
                                        editable={true}
                                        multiline={false}
                                        hideshowText={false}
                                        width={(width - 30) / 2}
                                        length={20}
                                        textAlign='right'
                                        keyboardType='numeric'
                                        onRef={ref => (this.childExpDate = ref)}
                                    />
                                </View>
                            </View>
                        </ScrollView>

                        <View style={styles.bottom}>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={this.addCard}
                            >
                                <Text style={styles.btnTitle}>Add card</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </SafeAreaView>
        )
    }
}