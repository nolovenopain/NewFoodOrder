import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, Image, ScrollView } from 'react-native';
import { loading } from '../../Helpers/Functions';
import { styles } from "./css";
import { backgroundColorWhite } from '../../Components/Colors/Color';
import { goBack } from '../../Navigators/Router';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

export default class NotificationDetails extends Component {

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
                                <Text style={styles.headerTitle}>Notification Details</Text>
                            </View>
                            <View style={styles.headerRight}>

                            </View>
                        </View>

                        <ScrollView 
                            contentContainerStyle={styles.body}
                            showsVerticalScrollIndicator={false}    
                        >
                            <View style={styles.notiTitleWrapper}>
                                <Image
                                    style={styles.image}
                                    source={this.props.route.params.notification.imgSrc}
                                />
                                <View style={styles.notiTitleRight}>
                                    <Text style={styles.storeName}>{this.props.route.params.notification.storeName}</Text>
                                    <Text style={styles.time}>{this.props.route.params.notification.time}</Text>
                                </View>
                            </View>

                            <View style={styles.notiContentWrapper}>
                                <Text style={styles.notiContent}>
                                    ???CH??N S???CH" THI??N ???????NG ???M TH???C TRONG L??NG AEON H?? ????NG Thi??n ???????ng h??n 100 m??n ngon s???n s??ng ch??? b???n t??? 08h00 ?????n 22h00 t???i T???ng 1 c???a TTBHTH & ST AEON H?? ????ng ?????y nh??!!! T????ng truy???n r???ng, ai c?? th??? ??n h???t ???????c c??? thi??n ???????ng ???m th???c ??? AEON H?? ????ng s??? c?? th??? ???tr?????ng sinh b???t l??o???!!! ????a th??i! Nh??ng kh??ng ???tr?????ng sinh??? th?? ch???c ch???n l?? ????????y b???ng??? v???i h??ng tr??m m??n ngon kh??ng th??? ch???i t??? t???i AEON H?? ????ng: N??o sushi ????? v???: c?? h???i, thanh cua, m???c, tr???ng c????? N??o ????? chi??n ????? m??n: ????i - c??nh g?? chi??n, m???c chi??n, x??c x??ch, khoai t??y??? N??o m??n ??n Nh???t B???n h???p d???n: akonomi b???ch tu???c, somen m??? l???nh, ramen??? th???a s???c ??n c??? ng??y lu??n.
                                </Text>
                            </View>
                        </ScrollView>
                    </View>
            </SafeAreaView>
        )
    }
}

