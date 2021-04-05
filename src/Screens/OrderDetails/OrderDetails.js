import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, Image, ScrollView } from 'react-native';
import { loading } from '../../Helpers/Functions';
import { styles } from "./css";
import { backgroundColorWhite, tomato } from '../../Components/Colors/Color';
import { goBack, navigate } from '../../Navigators/Router';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

export default class OrderDetails extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
    }

    componentDidMount() {
        this._isMounted = true
        setTimeout(() => {
            this._isMounted && this.setState({ loaded: true });
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    goBack = () => {
        goBack()
    }

    goToStoreDetails = () => {
        navigate('StoreDetails')
    }

    reOrder = () => {
        
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorWhite }}>
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
                                <Text style={styles.headerTitle}>Order Details</Text>
                            </View>
                            <View style={styles.headerRight}>

                            </View>
                        </View>

                        <ScrollView 
                            contentContainerStyle={styles.body}
                            showsVerticalScrollIndicator={false}    
                        >
                            <View style={styles.groupStatus}>
                                <View style={styles.groupStatusTop}>
                                    <View style={styles.iconBorder}>
                                        <MaterialCommunityIcon
                                            name='checkbox-blank-circle'
                                            size={22}
                                            color='silver'
                                        />
                                    </View>
                                    <View style={styles.line}></View>
                                    <View style={styles.iconBorder}>
                                        <MaterialCommunityIcon
                                            name='check-circle'
                                            size={22}
                                            color={tomato}
                                        />
                                    </View>
                                </View>

                                {this.props.route.params.order.status == 0 ?
                                    <View style={styles.groupStatusBottom}>
                                        <View style={styles.statusBorrder}>
                                            <Text style={styles.statusText}>Submitted</Text>
                                        </View>
                                        <View style={styles.between}></View>
                                        <View style={styles.statusBorrder}>
                                            <Text style={styles.statusText}>Delivering</Text>
                                        </View>
                                    </View>
                                        :
                                    this.props.route.params.order.status == 1 ?
                                        <View style={styles.groupStatusBottom}>
                                            <View style={styles.statusBorrder}>
                                                <Text style={styles.statusText}>Delivery</Text>
                                            </View>
                                            <View style={styles.between}></View>
                                            <View style={styles.statusBorrder}>
                                                <Text style={styles.statusText}>Completed</Text>
                                            </View>
                                        </View>
                                            :
                                        <View style={styles.groupStatusBottom}>
                                            <View style={styles.statusBorrder}>
                                                <Text style={styles.statusText}>Canceled</Text>
                                            </View> 
                                        </View>   
                                }
                                
                            </View>

                            <View style={styles.bodyBorder}>
                                <Text style={styles.borderTitle}>Thanh Dao - Bun cha & bun ca</Text>
                                <Text style={[styles.borderText, { marginBottom: 5 }]}>56.00$ - 2 items - Cash</Text>
                                <Text style={styles.borderText}>Suusoft - (+84) 358296686</Text>
                            </View>

                            <View style={
                                    [
                                        styles.bodyBorder,
                                        {
                                            borderColor: 'silver',
                                            borderTopWidth: 0.3,
                                            borderBottomWidth: 0.3
                                        }
                                    ]
                                }
                            >
                                <Text style={styles.borderTitle}>Delivery to</Text>
                                <Text style={styles.borderText}>
                                    [Tang 4] 78 Nguyen Hoang, My Dinh 2, Q. Nam Tu Liem, Ha Noi, Viet Nam 
                                </Text>
                            </View>

                            <View style={styles.bodyBorder}>
                                <TouchableWithoutFeedback onPress={this.goToStoreDetails}>
                                    <View style={styles.storeWrapper}>
                                        <View style={styles.storeLeft}>
                                            <Text 
                                                style={styles.storeName}
                                                numberOfLines={1}
                                            >
                                                Highlands Coffe - Sunsquare
                                            </Text>
                                        </View>
                                        <View style={styles.storeRight}>
                                            <Icon
                                                name='chevron-forward'
                                                color='silver'
                                                size={18}
                                            />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                                
                                <View style={styles.orderShow}>
                                    <Image
                                        style={styles.image}
                                        source={require('../../Assets/Images/hongtrasua.jpg')}
                                    />
                                    <View style={styles.orderShowCenter}>
                                        <Text 
                                            style={styles.borderTitle}
                                            numberOfLines={1}
                                        >
                                            3 x Hong tra sua
                                        </Text>
                                        <Text style={styles.borderText}>Size M</Text>
                                    </View>
                                    <View style={styles.orderShowRight}>
                                        <Text 
                                            style={styles.borderTitle}
                                            numberOfLines={1}
                                        >
                                            56.00 $
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.bodyBorder}>
                                <Text style={styles.borderTitle}>Order Details</Text>
                                <View style={styles.detailRow}>
                                    <View style={styles.detailRowLeft}>
                                        <Text style={styles.leftText}>3 items</Text>
                                    </View>
                                    <View style={styles.detailRowRight}>
                                        <Text style={styles.rightText}>56.00$</Text>
                                    </View>
                                </View>

                                <View style={styles.detailRow}>
                                    <View style={styles.detailRowLeft}>
                                        <Text style={styles.leftText}>Shipping Fee</Text>
                                    </View>
                                    <View style={styles.detailRowRight}>
                                        <Text style={styles.rightText}>0.0$</Text>
                                    </View>
                                </View>

                                <View style={styles.detailRow}>
                                    <View style={styles.detailRowLeft}>
                                        <Text style={styles.leftText}>Discount</Text>
                                    </View>
                                    <View style={styles.detailRowRight}>
                                        <Text style={styles.rightText}>0.0$</Text>
                                    </View>
                                </View>

                                <View style={styles.detailRow}>
                                    <View style={styles.detailRowLeft}>
                                        <Text style={styles.leftText}>Note</Text>
                                    </View>
                                    <View style={styles.detailRowRight}>
                                        <Text style={styles.rightText}>None</Text>
                                    </View>
                                </View>

                                <View style={styles.detailRow}>
                                    <View style={styles.detailRowLeft}>
                                        <Text style={styles.leftText}>Order time</Text>
                                    </View>
                                    <View style={styles.detailRowRight}>
                                        <Text style={styles.rightText}>14:55 10/12/2020</Text>
                                    </View>
                                </View>

                                <View style={styles.detailRow}>
                                    <View style={styles.detailRowLeft}>
                                        <Text style={styles.leftText}>Payment Method</Text>
                                    </View>
                                    <View style={styles.detailRowRight}>
                                        <Text style={styles.rightText}>Cash</Text>
                                    </View>
                                </View>

                                <View style={styles.detailRow}>
                                    <View style={styles.detailRowLeft}>
                                        <Text style={styles.borderTitle}>Total</Text>
                                    </View>
                                    <View style={styles.detailRowRight}>
                                        <Text style={[styles.borderTitle, { textAlign: 'right' }]}>56.00$</Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>

                        <View style={styles.bottom}>
                            {this.props.route.params.order.status == 0 ?
                                <View style={[styles.btn, { backgroundColor: 'silver' }]}>
                                    <Text style={styles.btnTitle}>Delivering</Text>
                                </View>
                                    :
                                <TouchableWithoutFeedback onPress={this.reOrder}>
                                    <View style={[styles.btn, { backgroundColor: tomato }]}>
                                        <Text style={styles.btnTitle}>Re-Order</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            }
                            
                        </View>
                    </View>
            </SafeAreaView>
        )
    }
}

