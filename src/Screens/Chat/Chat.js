import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, Platform, FlatList, TouchableOpacity } from 'react-native';
import { loading } from '../../Helpers/Functions';
import { styles } from "./css";
import { tomato, backgroundColorWhite } from '../../Components/Colors/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import { goBack } from '../../Navigators/Router';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { width } from '../../Components/Dimensions/Dimensions';
import Input from '../../Components/Input/Input';
import io from'socket.io-client/dist/socket.io';

export default class Chat extends Component {

    _isMounted = false;
    
    constructor(props) {
        super(props);
        this.state = {
            chatList: [
                {id: 7, role: 0, message: 'OK tôi xuống đây', time: '8:27 PM'},
                {id: 6, role: 1, message: 'Em đến rồi xuống lấy hàng đi chị ơi', time: '8:24 PM'},
                {id: 5, role: 1, message: 'Ngõ 91 đúng không chị', time: '8:23 PM'},
                {id: 4, role: 0, message: 'Đến chưa bạn ơi tôi đói quá', time: '8:21 PM'},
                {id: 3, role: 0, message: 'Alo alo', time: '8:20 PM'},
                {id: 2, role: 1, message: 'Ok chị, em đang trên đường đi lấy đây', time: '8:16 PM'},
                {id: 1, role: 0, message: 'Chuyển đến 101 thành công cho tôi nhé', time: '8:15 PM'},
                {id: 0, role: 0, message: 'Alo alo cậu xế ơi', time: '8:15 PM'},     
            ],
            message: ''
        }
        this.socket = io(Platform == 'ios' ? 'http://localhost:3000' : 'http://192.168.0.153:3000', {jsonp: false})
        this.socket.on('server-send-message', (data) => { console.log(data)
            // e.updateChat(data)
        })
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    receiveMessage(message) {
        var messObj = {
            role: 0,
            message
        }
        var chatList = this.state.chatList
        chatList.unshift(messObj)
        this.setState({ chatList })
    }

    setValue = (name, value) => {
        this.setState({ [name]: value}, () => {})
    }

    sendMessage = () => {
        if(this.state.message != '') {
            this.socket.emit('client-send-message', this.state.message)
            this.childMessage.clearOldInput()
        }
    }

    goBack = () => {
        goBack()
    }

    renderRow = ({ item, index }) => {
        return (
            <View 
                style={
                    [
                        styles.rowWrapper,
                        { alignItems: item.role == 0 ? 'flex-end' : 'flex-start' }
                    ]
                }
            >
                <View 
                    style={
                        [
                            styles.row,
                            { backgroundColor: item.role == 0 ? tomato : 'rgba(0,0,0,0.1)' }
                        ]
                    }
                >
                    <Text 
                        style={
                            [
                                styles.chat,
                                { color: item.role == 0 ? '#fff' : '#000' }
                            ]
                        }
                    >
                        {item.message}
                    </Text>
                </View>
            </View>   
        )
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
                            <Text style={styles.headerTitle}>Message</Text>
                        </View>
                        <View style={styles.headerRight}>

                        </View>
                    </View>

                    <View style={styles.body}>
                        <FlatList
                            data={this.state.chatList}
                            renderItem={this.renderRow}
                            keyExtractor={(item, index) => index.toString()}
                            disableVirtualization={true}
                            showsVerticalScrollIndicator={false}
                            inverted
                        />
                    </View>

                    <View style={styles.bottom}>
                        <View style={styles.left}>
                            <TouchableOpacity onPress={this.openModalCamera}>
                                <Icon
                                    name='camera'
                                    size={28}
                                    color={tomato}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.center}>
                            <View style={styles.input}>
                                <Input
                                    placeholder='Aa'
                                    name='message'
                                    setValue={this.setValue}
                                    editable={true}
                                    multiline={true}
                                    hideshowText={false}
                                    width={width - 40 - 80 - 20}
                                    onRef={ref => (this.childMessage = ref)}
                                />
                            </View>
                        </View>
                        <View style={styles.right}>
                            <TouchableOpacity onPress={this.sendMessage}>
                                <FontAwesome
                                    name='send-o'
                                    size={23}
                                    color={tomato}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}