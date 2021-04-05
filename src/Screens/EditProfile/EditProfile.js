import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, ScrollView, Image, TouchableHighlight, Modal, TouchableOpacity, Alert } from 'react-native';
import { styles } from "./css";
import { backgroundColorWhite } from '../../Components/Colors/Color';
import { goBack } from '../../Navigators/Router';
import Icon from 'react-native-vector-icons/Ionicons';
import Input from '../../Components/Input/Input';
import { width } from '../../Components/Dimensions/Dimensions';
import ModalGender from '../../Modals/ModalGender/ModalGender';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import { loading } from '../../Helpers/Functions';
import updateProfile from '../../Api/updateProfile';
import { checkPhoneValidate } from '../../Helpers/RegularExpression';

export default class EditProfile extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            modalGenderVisible: false,
            isDatePickerVisible: false,
            gender: this.props.route.params.user.gender,
            birthday: this.props.route.params.user.birth_day ? moment(this.props.route.params.user.birth_day).toDate() : new Date(),
            avatarSrc: this.props.route.params.user.avatar,
            uploadAvatar: null,
            changeAvatar: false,
            modalImagePickerVisible: false,
            loaded: true,
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.loaded != nextState.loaded || 
            this.state.modalGenderVisible != nextState.modalGenderVisible ||
            this.state.isDatePickerVisible != nextState.isDatePickerVisible ||
            this.state.gender != nextState.gender ||
            this.state.birthday != nextState.birthday ||
            this.state.avatarSrc != nextState.avatarSrc ||
            this.state.modalImagePickerVisible != nextState.modalImagePickerVisible ||
            this.state.changeAvatar != nextState.changeAvatar) {
            return true
        }
        return false
    }

    goBack = () => {
        goBack()
    }

    setValue = (name, value) => {
        this.setState({ [name]: value}, () => {})
    }

    changeAvatar = () => {
        this.setState({ modalImagePickerVisible: true })
    }

    closeModalImagePicker = () => {
        this.setState({ modalImagePickerVisible: false })
    }

    takePhoto = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            compressImageQuality: 0.3
        }).then(image => {
                let path = "~" + image.path.substring(image.path.indexOf("/react-native-image-crop-picker"));
                image.filename = path.split("/").pop();
                this.setState({ 
                    avatarSrc: image.path, 
                    uploadAvatar: image,
                    changeAvatar: true,
                    modalImagePickerVisible: false
                }) 
        }).catch((err) => { console.log("openCamera catch" + err.toString()) });
    }

    pickPhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            compressImageQuality: 0.3
        }).then(image => {
            if(!image.mime) {
                Alert.alert('Error !!!', 'Wrong image format. Please choose another english picture')
            } 
            else {
                let path = "~" + image.path.substring(image.path.indexOf("/react-native-image-crop-picker"));
                image.filename = path.split("/").pop();
                this.setState({ 
                    avatarSrc: image.path, 
                    uploadAvatar: image,
                    changeAvatar: true,
                    modalImagePickerVisible: false
                }) 
            }
        }).catch((err) => { console.log("openCamera catch" + err.toString()) });
    }

    openModalGender = () => {
        this.setState({ modalGenderVisible: true })
    }

    closeModalGender = () => {
        this.setState({ modalGenderVisible: false })
    }

    chooseMale = () => {
        this.setState({ gender: 'male' })
    }

    chooseFemale = () => {
        this.setState({ gender: 'female' })
    }

    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true })
    }

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false })
    }

    handleConfirm = (date) => {
        this.setState({ 
            birthday: date, 
            isDatePickerVisible: false
        })
    };

    saveAccountInfo = async() => {
        if(!checkPhoneValidate(this.state.phone) && this.state.phone) {
            Alert.alert('Error !!!', 'Wrong phone number format')
        }
        else {
            this.setState({ loaded: false })
            try{
                const res = await updateProfile(
                    this.props.route.params.token,
                    this.state.name ? this.state.name : this.props.route.params.user.name,
                    this.state.gender,
                    this.state.phone ? this.state.phone : this.props.route.params.user.phone,
                    moment(this.state.birthday).format('YYYY/MM/DD'),
                    this.state.uploadAvatar
                )
                if(res.status == 200) {
                    this.setState({ loaded: true })
                    const resp = await res.json()
                    if(resp.code == 200) {        
                        this.props.route.params.getUser(this.props.route.params.token)
                        Alert.alert('Update successfully !!!', "Your profile is updated");
                    }
                    else if(resp.code == 225) {
                        Alert.alert('Error !!!', resp.message);
                    }
                    else if(resp.code == 205) {
                        console.log(resp.message)
                    }
                    else if(resp.code == 202) {
                        console.log('Error: ', resp.message);
                    }
                }
                else if(res.status == 500) {
                    this.setState({ loaded: true })
                    Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
                }
            }
            catch(error) {
                this.setState({ loaded: true })
                console.log(error)
                Alert.alert(
                    'Sorry, something went wrong. Please try again',
                    error.message,
                    [
                        {text: 'Try Again', onPress: () => this.saveAccountInfo()}
                    ]
                )
            }
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorWhite }}>
                {this.state.loaded ? null : loading()}
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
                                <Text style={styles.headerTitle}>Edit Profile</Text>
                            </View>
                            <View style={styles.headerRight}>

                            </View>
                        </View>

                        <ScrollView 
                            contentContainerStyle={styles.body}
                            showsVerticalScrollIndicator={false}    
                        >   
                            <View style={styles.avatarWrapper}>
                                <TouchableWithoutFeedback onPress={this.changeAvatar}>
                                    <Image
                                        style={styles.avatar}
                                        source={ 
                                            this.state.avatarSrc == '' ? require('../../Assets/Images/noAvatar.png') : { uri: this.state.avatarSrc }
                                        }
                                    />
                                </TouchableWithoutFeedback>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Text style={styles.inputTitle}>Full Name</Text>
                                </View>
                                <View style={styles.right}>
                                    <Input
                                        placeholder='Name *'
                                        name='name'
                                        setValue={this.setValue}
                                        oldValue={this.props.route.params.user.name}
                                        editable={true}
                                        multiline={false}
                                        hideshowText={false}
                                        width={(width - 30) / 2}
                                        length={20}
                                        textAlign='right'
                                        onRef={ref => (this.childName = ref)}
                                    />
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Text style={styles.inputTitle}>Email</Text>
                                </View>
                                <View style={styles.right}>
                                    <Input
                                        placeholder='Email *'
                                        name='email'
                                        setValue={this.setValue}
                                        oldValue={this.props.route.params.user.email}
                                        editable={false}
                                        multiline={false}
                                        hideshowText={false}
                                        width={(width - 30) / 2}
                                        length={20}
                                        textAlign='right'
                                        keyboardType='email-address'
                                        onRef={ref => (this.childEmail = ref)}
                                    />
                                </View>
                            </View>

                            <TouchableWithoutFeedback onPress={this.openModalGender}>
                                <View style={styles.row}>
                                    <View style={styles.left}>
                                        <Text style={styles.inputTitle}>Gender</Text>
                                    </View>
                                    <View 
                                        style={
                                            [
                                                styles.right,
                                                { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingVertical: 7 }
                                            ]
                                        }
                                    >
                                        <Text style={styles.genderTitle}>
                                            {this.state.gender == '' ? 'Select' : (this.state.gender == 'female' ? 'Female' : 'Male')}
                                        </Text>
                                        <Icon
                                            name='chevron-forward'
                                            size={16}
                                            color='gray'
                                        />
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableHighlight 
                                underlayColor='transparent' 
                                onPress={this.showDatePicker}
                            >
                                <View style={styles.row}>
                                    <View style={styles.left}>
                                        <Text style={styles.inputTitle}>Date of birth</Text>
                                    </View>
                                    <View 
                                        style={
                                            [
                                                styles.right,
                                                { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingVertical: 7 }
                                            ]
                                        }
                                    >
                                        <Text style={styles.genderTitle}>
                                            {this.state.birthday != 'Invalid Date' ? moment(this.state.birthday).format('DD/MM/YYYY') : ''}
                                        </Text>
                                        <Icon
                                            name='chevron-forward'
                                            size={16}
                                            color='gray'
                                        />
                                    </View>
                                </View>
                            </TouchableHighlight>

                            <DateTimePickerModal
                                isVisible={this.state.isDatePickerVisible}
                                mode="date"
                                onConfirm={this.handleConfirm}
                                onCancel={this.hideDatePicker}
                                date={this.state.birthday}
                            />

                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Text style={styles.inputTitle}>Phone</Text>
                                </View>
                                <View style={styles.right}>
                                    <Input
                                        placeholder='Phone number'
                                        name='phone'
                                        setValue={this.setValue}
                                        oldValue={this.props.route.params.user.phone}
                                        editable={true}
                                        multiline={false}
                                        hideshowText={false}
                                        width={(width - 30) / 2}
                                        length={20}
                                        textAlign='right'
                                        keyboardType='phone-pad'
                                        onRef={ref => (this.childPhone = ref)}
                                    />
                                </View>
                            </View>
                            
                            <TouchableHighlight 
                                onPress={this.saveAccountInfo}
                                style={styles.saveBtn}
                                underlayColor='silver'
                            >
                                <Text style={styles.btnTitle}>Done</Text>
                            </TouchableHighlight>
                        </ScrollView>

                        {/* MODAL GENDER */}
                            <ModalGender
                                modalGenderVisible={this.state.modalGenderVisible}
                                closeModalGender={this.closeModalGender}
                                chooseFemale={this.chooseFemale}
                                chooseMale={this.chooseMale}
                                gender={this.state.gender}
                            />
                        {/* MODAL GENDER */}

                        {/* MODAL IMAGE PICKER */}
                            <Modal
                                visible={this.state.modalImagePickerVisible}
                                transparent={true}
                                animationType='fade'
                                statusBarTranslucent={true}
                            >   
                                <TouchableWithoutFeedback onPress={this.closeModalImagePicker}>
                                    <View style={styles.modalBackground}>
                                        <TouchableWithoutFeedback onPress={() => {}}>
                                            <View style={styles.modalPicker}>
                                                <View style={styles.imgPicker}>
                                                    <TouchableOpacity 
                                                        style={styles.takePhoto}
                                                        onPress={this.takePhoto}
                                                    >
                                                        <Text>Take a photo</Text>
                                                    </TouchableOpacity>
                                                    <View style={styles.underlinePicker}></View>
                                                    <TouchableOpacity 
                                                        style={styles.libraryPhoto}
                                                        onPress={this.pickPhotoFromLibrary}
                                                    >
                                                            <Text>Choose photo from library</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <TouchableOpacity 
                                                    style={styles.cancel}
                                                    onPress={this.closeModalImagePicker}
                                                >
                                                    <Text>Cancel</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableWithoutFeedback> 
                                    </View>     
                                </TouchableWithoutFeedback>
                            </Modal>
                        {/* MODAL IMAGE PICKER */}
                    </View>
            </SafeAreaView>
        )
    }
}

