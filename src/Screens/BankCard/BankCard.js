import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, Image, ScrollView } from 'react-native';
import { loading } from '../../Helpers/Functions';
import { styles } from "./css";
import { backgroundColorGrey } from '../../Components/Colors/Color';
import { goBack, navigate } from '../../Navigators/Router';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

export default class BankCard extends Component { 

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            creditList: [
                {id: 0, type: 0, bank: 'vietnam technological and commercial jsb', seri: 38864251739652},
                {id: 1, type: 1, bank: 'vietnam technological and commercial jsb', seri: 38864251734821}
            ],
            bankingAccountmentList: [
                {id: 4, bank: 'Techcombank - NHTMCP Ky thuong VN', seri: 38864251739652},
                {id: 6, bank: 'BIDV - NH Dau tu & Phat trien Viet Nam', seri: 38864251734821}
            ]
        };
    }

    componentDidMount() {
        this._isMounted = true
        setTimeout(() => {
            this._isMounted && this.setState({ loaded: true })
        },500)
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    goBack = () => {
        goBack()
    }

    addCard = () => {
        navigate('AddCard')
    }

    addBankAccountment = () => {
        navigate('AddBankAccount')
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorGrey }}>
                { !this.state.loaded ? loading() : null }
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
                                <Text style={styles.headerTitle}>Bank Card</Text>
                            </View>
                            <View style={styles.headerRight}>

                            </View>
                        </View>

                        <ScrollView 
                            contentContainerStyle={styles.body}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.listCardBorder}>
                                <View style={styles.borderHeader}>
                                    <Text style={styles.borderTitle}>Debit/Credit Card ({this.state.creditList.length})</Text>
                                </View>
                                {this.state.creditList.map((value, key) => {
                                    return (
                                        <View 
                                            style={
                                                [
                                                    styles.row,
                                                    { borderBottomWidth: 0.3, borderColor: 'silver' }
                                                ]
                                            }
                                            key={key}
                                        >
                                            <View style={styles.left}>
                                                <Image
                                                    style={styles.cardImage}
                                                    source={value.type == 0 ? require('../../Assets/Images/visa.png') : require('../../Assets/Images/master.png')}
                                                />
                                            </View>
                                            <View style={styles.center}>
                                                <Text style={styles.title}>{value.bank.toUpperCase()}</Text>
                                            </View>
                                            <View style={styles.right}>
                                                <Text style={styles.last4Seri}>
                                                    *{value.seri.toString().substr(value.seri.toString().length - 4, value.seri.toString().length - 1)}
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                })}
                                <TouchableWithoutFeedback onPress={this.addCard}>
                                    <View style={styles.row}>
                                        <View style={styles.left}>
                                            <View style={styles.addWrapper}>
                                                <Icon
                                                    name='add'
                                                    size={20}
                                                    color='silver'
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.center}>
                                            <Text style={styles.addTitle}>Add Debit/Credit Card</Text>
                                        </View>
                                        <View 
                                            style={
                                                [
                                                    styles.right,
                                                    { alignItems: 'center' }
                                                ]
                                            }
                                        >
                                            <Icon
                                                name='chevron-forward'
                                                size={25}
                                                color='gray'
                                            />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                            <View style={styles.listCardBorder}>
                                <View style={styles.borderHeader}>
                                    <Text style={styles.borderTitle}>Banking Accountment ({this.state.bankingAccountmentList.length})</Text>
                                </View>
                                {this.state.bankingAccountmentList.map((value, key) => {
                                    return (
                                        <View 
                                            style={
                                                [
                                                    styles.row,
                                                    { borderBottomWidth: 0.3, borderColor: 'silver' }
                                                ]
                                            }
                                            key={key}
                                        >
                                            <View style={styles.left}>
                                                <Image
                                                    style={styles.cardImage}
                                                    source={value.type == 0 ? require('../../Assets/Images/visa.png') : require('../../Assets/Images/master.png')}
                                                />
                                            </View>
                                            <View style={styles.center}>
                                                <Text style={styles.title}>{value.bank}</Text>
                                            </View>
                                            <View style={styles.right}>
                                                <Text style={styles.last4Seri}>
                                                    *{value.seri.toString().substr(value.seri.toString().length - 4, value.seri.toString().length - 1)}
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                })}
                                <TouchableWithoutFeedback onPress={this.addBankAccountment}>
                                    <View style={styles.row}>
                                        <View style={styles.left}>
                                            <View style={styles.addWrapper}>
                                                <Icon
                                                    name='add'
                                                    size={20}
                                                    color='silver'
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.center}>
                                            <Text style={styles.addTitle}>Add Bank Accountment</Text>
                                        </View>
                                        <View 
                                            style={
                                                [
                                                    styles.right,
                                                    { alignItems: 'center' }
                                                ]
                                            }
                                        >
                                            <Icon
                                                name='chevron-forward'
                                                size={25}
                                                color='gray'
                                            />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </ScrollView>
                    </View>
            </SafeAreaView>
        )
    }
}