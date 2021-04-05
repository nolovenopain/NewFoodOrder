import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, TouchableOpacity, Animated } from 'react-native';
import { styles } from "./css";
import { tomato } from '../../Components/Colors/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomSheet from 'reanimated-bottom-sheet';
import { width, height } from '../../Components/Dimensions/Dimensions';
import ModalShowImage from '../../Modals/ModalShowImage/ModalShowImage';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

export default class BottomSheetOrder extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            foodList: this.props.foodList,
            orderList: this.props.orderList,
            orderPassToBottomSheet: this.props.orderPassToBottomSheet,
            modalShowImageVisible: false,
            size: [
                {id: 1, name: 'Size Nhỏ/Size S', price: 0, checked: true},
                {id: 2, name: 'Size Vừa/Size M', price: 6000, checked: false},
                {id: 3, name: 'Size Lớn/Size L', price: 100000, checked: false}
            ],
            isOpen: false,
            opacity: new Animated.Value(0),
        };
        this.sheetRef = React.createRef(null);
    }

    componentDidMount() {
        this._isMounted = true
        this.props.onRef ? this.props.onRef(this) : null
        var orderPassToBottomSheet = this.props.orderPassToBottomSheet;
        if(orderPassToBottomSheet.amount == 0) {
            orderPassToBottomSheet.amount++
        }
        this._isMounted && this.setState({ orderPassToBottomSheet })
    }
    
    componentWillUnmount() {
        this._isMounted = false
        this.props.onRef ? this.props.onRef(null) : null
    }

    closeBottomSheet = () => {
        this.sheetRef.current.snapTo(0)
    }

    plusAmount = () => {
        var orderPassToBottomSheet = this.state.orderPassToBottomSheet
        orderPassToBottomSheet.amount++
        this.setState({ orderPassToBottomSheet })
    }

    minusAmount = () => {
        var orderPassToBottomSheet = this.state.orderPassToBottomSheet
        if(orderPassToBottomSheet.amount > 1) {
            orderPassToBottomSheet.amount--
            this.setState({ orderPassToBottomSheet })
        }
    }

    openModalShowImage = () => {
        this.setState({ modalShowImageVisible: true })
    }

    closeModalShowImage = () => {
        this.setState({ modalShowImageVisible: false })
    }

    checked = item => e => {
        var size = []
        this.state.size.map((value, key) => {
            if(item.id == value.id) {
                value.checked = true
            }
            else {
                value.checked = false
            }
            size.push(value)
        })
        this.setState({ size })
    }

    confirm = () => {
        this.props.confirmOrderFromBottomSheet(this.state.orderPassToBottomSheet)
        this.sheetRef.current.snapTo(0)
    }

    onClose = () => { 
        Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
        }).start();
        this.sheetRef.current.snapTo(0);
        this.setState({ isOpen: false });
    };
    
    onOpen = () => {
        this.setState({ isOpen: true });
        this.sheetRef.current.snapTo(height - height/4);
        Animated.timing(this.state.opacity, {
            toValue: 0.7,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    renderBackDrop = () => (
        <Animated.View
            style={{
                opacity: this.state.opacity,
                // backgroundColor: '#000',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        >
            <TouchableOpacity
                style={{
                    width: width,
                    height: height,
                    backgroundColor: 'transparent',
                }}
                activeOpacity={1}
                onPress={this.onClose}
            />
        </Animated.View>
      );

    renderContent = () => {
        return(
            <View style={styles.bottomSheet}>
                <View style={styles.bottomSheetHeader}>
                    <View style={styles.bottomSheetHeaderLeft}>
                        <TouchableWithoutFeedback onPress={this.closeBottomSheet}>
                            <Icon
                                name='close-circle'
                                size={30}
                                color={tomato}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.bottomSheetHeaderCenter}>
                        <Text style={styles.bottomSheetHeaderTitle}>Order</Text>
                    </View>
                    <View style={styles.bottomSheetHeaderRight}>
                        
                    </View>
                </View>

                
                <View style={styles.bottomSheetBody}>
                    <View style={styles.orderPassToBottomSheetDetails}>
                        <TouchableWithoutFeedback onPress={this.openModalShowImage}>
                            <Image
                                style={styles.orderImage}
                                source={this.props.orderPassToBottomSheet.imgSrc}
                            />
                        </TouchableWithoutFeedback>
                        <View style={styles.foodElementInfo}>
                            <View style={styles.foodElementInfoInside}>
                                <Text 
                                    style={styles.foodName}
                                    numberOfLines={1}
                                >
                                    {this.props.orderPassToBottomSheet.name}
                                </Text>
                                <Text 
                                    style={styles.foodDescribe}
                                    numberOfLines={1}
                                >
                                    {this.props.orderPassToBottomSheet.describe}
                                </Text>
                            </View>
                            <View style={styles.orderGroup}>
                                <View style={styles.foodPriceWrapper}>
                                    <Text style={styles.foodPrice}>{this.props.orderPassToBottomSheet.price}</Text>
                                </View>
                                <View style={styles.addToCart}>
                                    <View style={styles.removeAddGroup}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TouchableWithoutFeedback onPress={this.minusAmount}>
                                                <Icon
                                                    name='remove-circle-outline'
                                                    size={25}
                                                    color='silver'
                                                />
                                            </TouchableWithoutFeedback>
                                            <View style={styles.showAmount}>
                                                <Text style={styles.amount}>{this.state.orderPassToBottomSheet.amount}</Text>
                                            </View>
                                            <TouchableWithoutFeedback onPress={this.plusAmount}>
                                                <Icon
                                                    name='add-circle'
                                                    size={25}
                                                    color={tomato}
                                                />
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.sizeHeaderWrapper}>
                        <Text style={styles.sizeHeaderTitle}>CHỌN SIZE (Chọn 1)</Text>
                    </View>

                    {this.state.size.map((value, key) => {
                        return (
                            <View 
                                key={key}
                                style={
                                    [
                                        styles.row,
                                        { borderLeftColor: value.checked ? tomato : '#fff' }
                                    ]
                                }
                            >
                                <View style={styles.rowLeft}>
                                    <Text style={styles.rowTitle}>{value.name}</Text>
                                </View>
                                <View style={styles.rowRight}>
                                    <TouchableWithoutFeedback onPress={this.checked(value)}>
                                        <MaterialCommunityIcon
                                            name={value.checked ? 'check-circle' : 'checkbox-blank-circle-outline'}
                                            size={30}
                                            color={value.checked ? tomato : 'silver'}
                                        />
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        )
                    })}
                </View>
                
                <View style={styles.bottomSheetBottom}>
                    <View style={styles.bottomSheetBottomLeft}>
                        <Text style={styles.totalPayment}>39,000</Text>
                    </View>
                    <View style={styles.bottomSheetBottomRight}>
                        <TouchableOpacity
                            style={styles.confirmBtn}
                            onPress={this.confirm}
                        >
                            <Text style={styles.confirmBtnTitle}>Add To Cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                {/* MODAL SHOW IMAGE*/}
                <View>
                    <ModalShowImage
                        modalShowImageVisible={this.state.modalShowImageVisible}
                        closeModalShowImage={this.closeModalShowImage}
                        imgSrcShow={this.props.orderPassToBottomSheet.imgSrc}
                    />
                </View>
            {/* MODAL SHOW IMAGE*/}
            </View>
        )  
    }

    render() {
        return(
            <>
                {this.state.isOpen && this.renderBackDrop()}
                <BottomSheet
                    ref={this.sheetRef}
                    snapPoints={[0, 300, height - height/4]}
                    borderRadius={10}
                    renderContent={this.renderContent}
                    onCloseEnd={this.onClose}
                />
            </>
        )
    }
}