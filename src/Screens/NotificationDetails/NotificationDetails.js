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
                                    “CHÉN SẠCH" THIÊN ĐƯỜNG ẨM THỰC TRONG LÒNG AEON HÀ ĐÔNG Thiên đường hơn 100 món ngon sẵn sàng chờ bạn từ 08h00 đến 22h00 tại Tầng 1 của TTBHTH & ST AEON Hà Đông đấy nhé!!! Tương truyền rằng, ai có thể ăn hết được cả thiên đường ẩm thực ở AEON Hà Đông sẽ có thể “trường sinh bất lão”!!! Đùa thôi! Nhưng không “trường sinh” thì chắc chắn là “đẫy bụng” với hàng trăm món ngon không thể chối từ tại AEON Hà Đông: Nào sushi đủ vị: cá hồi, thanh cua, mực, trứng cá… Nào đồ chiên đủ món: đùi - cánh gà chiên, mực chiên, xúc xích, khoai tây… Nào món ăn Nhật Bản hấp dẫn: akonomi bạch tuộc, somen mỳ lạnh, ramen… thỏa sức ăn cả ngày luôn.
                                </Text>
                            </View>
                        </ScrollView>
                    </View>
            </SafeAreaView>
        )
    }
}

