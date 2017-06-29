import React, {Component} from 'react'
import {
	View,
	Text,
	TextInput,
	KeyboardAvoidingView,
	Modal,
	TouchableOpacity,
	Image,
	PixelRatio,
    ScrollView
} from 'react-native'

const productImage ={
	height: 70,
    width: 70,
    borderRadius: 70 / PixelRatio.get(),
}

const input = {
	textAlign: 'left', 
	paddingLeft: 10, 
	color: '#404040', 
	fontWeight: '400', 
	fontSize: 16,
	height: 45
}

export default class ModifyContent extends Component {

	constructor(props) {
	  	super(props);

	  	this.state = {
	  		productName: null,
	  		productDescription: null
	  	}
	}

	render() {
		return(
			<Modal
                animationType={"slide"}
                transparent={false}
                visible={this.props.modifyContent}
                onRequestClose={() => {alert("Modal has been closed.")}}
            >
            	<ScrollView style={{marginTop: 22,paddingTop: 12}}>
            		<View style={{flexDirection: 'row', marginBottom: 40, paddingHorizontal: 10}}>
                		<View style={{flex: 4}}>
                			<TouchableOpacity
                				onPress={this.props.closeModal.bind(this)}
                			>
                				<Text style={{fontSize: 18, fontWeight: '400', color: '#404040'}}>Edit Product</Text>
                			</TouchableOpacity>
                		</View>
                		<View style={{flex: 1, alignItems: 'flex-end', marginTop: 5}}>
                			<TouchableOpacity
                			>
                				<Text style={{color: '#4285f4', fontWeight: '700', fontSize: 14}}>Reset</Text>
                			</TouchableOpacity>
                		</View>
                		<View style={{flex: 1, alignItems: 'flex-end', marginTop: 5}}>

                		<TouchableOpacity
                			>
                				<Text style={{color: '#4285f4', fontWeight: '700', fontSize: 14}}>Save</Text>
                		</TouchableOpacity>
                		</View>
                	</View>
                	<KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
                		<View style={{borderBottomColor: '#ddd', borderBottomWidth: 1, marginBottom: 20}}>
                			<Text style={{paddingLeft: 10, color: '#999'}}>Product Name</Text>
                			<TextInput
                				style={[input]}
				                placeholder="Printed Straight Kurta"
				                placeholderTextColor='#999'
				                returnKeyType="next"
				                onChangeText={(productName) => this.setState({productName})}
				                ref={(input) => this.productNameInput = input}
				                onSubmitEditing={() => this.productDescriptionInput.focus()}
                			/>
                		</View>
                		<View style={{borderBottomColor: '#ddd', borderBottomWidth: 1, marginBottom: 20}}>
                			<Text style={{paddingLeft: 10, color: '#999'}}>Description <Text style={{color: '#ffc107'}}>(Modified)</Text></Text>
                			<TextInput
                				style={[input, {height: 100}]}
				                placeholder="Printed Straight Kurta"
				                multiline={true}
				                placeholderTextColor='#999'
				                returnKeyType="next"
				                onChangeText={(productDescription) => this.setState({productDescription})}
				                ref={(input) => this.productDescriptionInput = input}
				                onSubmitEditing={() => this.sellingPriceInput.focus()}
                			/>
                		</View>
                		<View style={{borderBottomColor: '#ddd', borderBottomWidth: 1, marginBottom: 20}}>
                			<Text style={{paddingLeft: 10, color: '#999'}}>Price <Text style={{color: '#ffc107'}}>(Modified)</Text></Text>
                			<TextInput
                				style={[input]}
				                placeholder="2000"
				                placeholderTextColor='#999'
				                returnKeyType="go"
				                onChangeText={(sellingPrice) => this.setState({sellingPrice})}
				                ref={(input) => this.sellingPriceInput = input}
                			/>
                		</View>
                	</KeyboardAvoidingView>
                	<View style={{paddingHorizontal: 10}}>
                        <Text >Variants</Text>
                        <View style={{flexDirection: 'row', marginTop: 20}}>
                            <View style={{flex: 1}}>
                                <Image style={productImage} source={{uri: 'http://assets.myntassets.com/w_480,q_90/assets/images/1715421/2017/2/8/11486535521717-UF-Women-Green-Solid-Fit--Flare-Dress-2061486535521570-3.jpg'}} />
                            </View>
                            <View style={{flex: 1}}>
                                <Image style={productImage} source={{uri: 'http://assets.myntassets.com/w_480,q_90/assets/images/1715421/2017/2/8/11486535521717-UF-Women-Green-Solid-Fit--Flare-Dress-2061486535521570-3.jpg'}} />
                            </View>
                            <View style={{flex: 1}}>
                                <Image style={productImage} source={{uri: 'http://assets.myntassets.com/w_480,q_90/assets/images/1715421/2017/2/8/11486535521717-UF-Women-Green-Solid-Fit--Flare-Dress-2061486535521570-3.jpg'}} />
                            </View>
                            <View style={{flex: 1}}>
                                <Image style={productImage} source={{uri: 'http://assets.myntassets.com/w_480,q_90/assets/images/1715421/2017/2/8/11486535521717-UF-Women-Green-Solid-Fit--Flare-Dress-2061486535521570-3.jpg'}} />
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 20}}>
                            <View style={{flex: 1}}>
                                <Image style={productImage} source={{uri: 'http://assets.myntassets.com/w_480,q_90/assets/images/1715421/2017/2/8/11486535521717-UF-Women-Green-Solid-Fit--Flare-Dress-2061486535521570-3.jpg'}} />
                            </View>
                            <View style={{flex: 1}}>
                                <Image style={productImage} source={{uri: 'http://assets.myntassets.com/w_480,q_90/assets/images/1715421/2017/2/8/11486535521717-UF-Women-Green-Solid-Fit--Flare-Dress-2061486535521570-3.jpg'}} />
                            </View>
                            <View style={{flex: 1}}>
                                <Image style={productImage} source={{uri: 'http://assets.myntassets.com/w_480,q_90/assets/images/1715421/2017/2/8/11486535521717-UF-Women-Green-Solid-Fit--Flare-Dress-2061486535521570-3.jpg'}} />
                            </View>
                            <View style={{flex: 1}}>
                                <Image style={productImage} source={{uri: 'http://assets.myntassets.com/w_480,q_90/assets/images/1715421/2017/2/8/11486535521717-UF-Women-Green-Solid-Fit--Flare-Dress-2061486535521570-3.jpg'}} />
                            </View>
                        </View>
                    </View>
            	</ScrollView>
            </Modal>
		)
	}
}