
import React, { Component} from 'react';
import { View, Text, StyleSheet, SafeAreaView, SectionList, TouchableOpacity, FlatList,Image, Button,  TouchableWithoutFeedback } from 'react-native';
import { FontAwesome5 } from 'react-native-vector-icons';
import { Modal } from 'react-native';
import { connect } from 'react-redux';
import { setCheckedItem } from '../redux/Actions';
import { increaseCounter } from '../redux/Actions';
import { decreaseCounter } from '../redux/Actions';
import { StatusBar } from 'react-native';

const DATA = [
  {
  title: 'Appetizers',
    data: [
      {
        id: 1,
        name: 'Fried Calamari',
        description: 'Crispy fried squid with marinara sauce',
        price: '10.99',
        source: require('../photos/restaurant2.jpg'),
      },
      {
        id: 2,
        name: 'Bruschetta',
        description: 'Toasted bread topped with fresh tomatoes, garlic, and basil',
        price: '8.99',
        source: require('../photos/restaurant2.jpg'),
      },
      {
        id: 3,
        name: 'Chicken Wings',
        description: 'Crispy fried chicken wings served with your choice of sauce',
        price: '12.99',
        source: require('../photos/restaurant2.jpg'),
      },
    ],
  },
  {
    title: 'Entrees',
    data: [
      {
        id: 4,
        name: 'Steak',
        description: 'Grilled ribeye steak with garlic mashed potatoes and sautéed spinach',
        price: '24.99',
        source: require('../photos/restaurant2.jpg'),
      },
      {
        id: 5,
        name: 'Fish and Chips',
        description: 'Beer-battered cod served with French fries and tartar sauce',
        price: '16.99',
        source: require('../photos/restaurant2.jpg'),
      },
      {
        id: 6,
        name: 'Pasta Carbonara',
        description: 'Spaghetti with bacon, eggs, and parmesan cheese',
        price: '14.99',
        source: require('../photos/restaurant2.jpg'),
      },
    ],
  },
  {
    title: 'Desserts',
    data: [
      {
        id: 7,
        name: 'Chocolate Cake',
        description: 'Rich chocolate cake with chocolate ganache and vanilla ice cream',
        price: '8.99',
        source: require('../photos/restaurant2.jpg'),
      },
      {
        id: 8,
        name: 'Tiramisu',
        description: 'Layers of espresso-soaked ladyfingers and mascarpone cream',
        price: '9.99',
        source: require('../photos/restaurant2.jpg'),
      },
      {
        id: 9,
        name: 'Cheesecake',
        description: 'New York-style cheesecake with graham cracker crust',
        price: '7.99',
        source: require('../photos/restaurant2.jpg'),
      },
    ],
  },
   
  {
    title: 'Cake',
    data: [
      // Assign unique IDs starting from 13
      {
        id: 13,
        name: 'Chocolate cake',
        price: '50',
        source: require('../photos/restaurant2.jpg'),
        description: 'Crispy fried squid with marinara sauce',
      },
      {
        id: 14,
        name: 'Vanilla cake',
        price: '45',
        source: require('../photos/restaurant2.jpg'),
        description: 'Crispy fried squid with marinara sauce',
      },
      {
        id: 15,
        name: 'Strawberry cake',
        price: '55',
        source: require('../photos/restaurant2.jpg'),
        description: 'Crispy fried squid with marinara sauce',
      },
    ],
  },
];


class BirthdayPage extends Component {
  constructor(props) {
      super(props);
       this.state = {
         activeIndex: 0,
         data: DATA,
         checkedItems:{}, // add checkedItems to state
         modalVisible: false,
          selectedItems: {}, // 
         cart: [],
         cartCount:0,
         viewCartVisible:false,
         
      };
    }
   
    onIncrementPress = (item) => {
      const { cart } = this.state;
      const index = cart.findIndex((cartItem) => cartItem.id === item.id);
     
      if (index !== -1 ) {
        const updatedCartItem = {
          ...cart[index],
        
          quantity: cart[index].quantity + 1,
          
        };
        
        cart[index] = updatedCartItem;
      } else {
        const newCartItem = { id: item.id, ...item, quantity: 1 }; // set quantity to 1 here
        cart.push(newCartItem);
      }
      this.setState({ cart });
      this.setState(prevState => ({
        cartCount: prevState.cartCount + 1,
      }));
     
    };
    
   
    
    
    
    onDecrementPress = (item) => {
      const { cart } = this.state;
      const index = cart.findIndex((cartItem) => cartItem.id === item.id);
      if (index !== -1) {
        const updatedCartItem = {
          ...cart[index],
          quantity: cart[index].quantity - 1,
        };
        if (updatedCartItem.quantity === 0) {
          cart.splice(index, 1);
        } else {
          cart[index] = updatedCartItem;
        }
        this.setState({ cart });
        
      }
      this.setState(prevState => ({
        cartCount: prevState.cartCount + 1,
      }));
     
    }; 
    setModalVisible = (visible, item) => {
      this.setState({ modalVisible: visible, selectedItems: item });
    }
     setVisible = (visible) => {
     this.setState({ modalVisible: visible });
    };
     sectionListRef = React.createRef();
     titleListRef = React.createRef();
  
    renderTitleItem = ({ item, index }) => {
     const isActive = index === this.state.activeIndex;
      return (
        <TouchableOpacity
          onPress={() => {
            this.setState({ activeIndex: index });
            this.sectionListRef.current.scrollToLocation({
              sectionIndex: index,
              itemIndex: 0,
              viewOffset: 0,
              viewPosition: 0,
              animated: true,
            });
          }}
        >
          <View
            style={[
              styles.titleItemContainer,
              isActive && styles.activeTitleItemContainer,
              { zIndex: isActive ? 2 : 0 },
            ]}
          >
            <Text
              style={[
                styles.titleItemText,
                { color: isActive ? 'red' : 'black' },
              ]}
            >
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };
    setAddCartVisible = (visible) => {
      this.setState({ viewCartVisible: visible });
    };
    addToCart = (item) => {
      // const { cart } = this.state;
      // const index = cart.findIndex((cartItem) => cartItem.id === item.id);
      // if (index !== -1 || 0 ) {
      //   const updatedCartItem = {
      //     ...cart[index],
        
      //     quantity: cart[index].quantity + 1,
      //   };
      //   cart[index] = updatedCartItem;
      // } else {
      //   const newCartItem = { id: item.id, ...item, quantity: 1 };
      //   cart.push(newCartItem);
      // }
      // this.setState({ cart });

      this.setState({ modalVisible: false, checkedItems: {} }); // clear the checked items after adding to cart

      // this.setState(prevState => ({
      //   cartCount: prevState.cartCount + 1,
      // }));
     
    };
    
    renderItem = ({ item, index, section }) => {
      
      return (
        <TouchableOpacity onPress={() => {this.setState({ checkedItems: {[item]: 1 } ,});
        this.setModalVisible(true, item)}}>
          <View style={styles.itemContainer}>
            <View style={{flexDirection:"row"}}>
              <Image source={item.source} style={styles.itemPhoto} />
              <View style={styles.descWithPrice}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
            </View>
            <Text style={styles.itemPrice}>{item.price}</Text>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
            
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <TouchableWithoutFeedback onPress={() => this.setVisible(false)}>
                <View style={styles.overlay} />
              </TouchableWithoutFeedback>
              <View style={styles.popupContainer}>
                <View style={styles.header}>
                  <Image
                    source={item.source} // Replace with your own image URL
                    style={styles.image}
                  />
                </View>
                <View style={styles.quantityContainer}>
                  <View style={styles.content}>
                    <Text style={styles.title}>{this.state.selectedItems.name}</Text>
                    <Text style={styles.description}>{this.state.selectedItems.description}</Text>
                    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                      <Text style={styles.price}>{this.state.selectedItems.price}</Text>
                      <View style={styles.plusAndMinus}>
                        <TouchableOpacity onPress={() => this.onDecrementPress(this.state.selectedItems)}>
                          <Text style={styles.quantityButton}>-</Text>
                        </TouchableOpacity>
                        <View style={{padding:5}}>
                        <Text style={styles.quantity}>
                        {this.state.cart.find((cartItem) => cartItem.id === this.state.selectedItems.id)?.quantity || 0}

                                  </Text>
                        </View>
                        <TouchableOpacity onPress={() => this.onIncrementPress(this.state.selectedItems)}>
                          <Text style={styles.quantityButton}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View> 
                <TouchableOpacity style={styles.addButton} onPress={()=> this.addToCart(this.state.selectedItems)}>
                  <Text style={styles.addButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </TouchableOpacity>
      );
    };
    
  render() {
      const { route } = this.props;
      const { item } = route.params;
      const {cart}= this.state;
   // const cartCount= this.cartCount;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='transparent' />
       
         <View >
          
          <Image source={item.photoSrc} style={styles.images} />
          <TouchableOpacity style={styles.closeButton} onPress={() => this.props.navigation.goBack()}>
            <FontAwesome5 name="arrow-left" size={30} color="white" />
         </TouchableOpacity>
           <View style={styles.allInfo}>
            <View style={styles.infoStyle}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                {item.name}
              </Text>
              <View style={styles.rateStyle}>
               
                <Image source={item.logo} style={styles.logo} />
              </View>
              
            </View>
            <View style={{flexDirection:"row", justifyContent:"space-between"}}> 
            <Text>{item.place}</Text>
           <View style={{flexDirection:"row", marginRight:"4%"}}>
           <FontAwesome5
                  name="star"
                  solid={true}
                  style={{ fontSize: 20, marginTop: 2, color: 'gold' }}
                />
                <Text style={{fontSize:18}}>{item.rate}</Text>
           </View>
            </View>
          </View>
        </View>
        <View style={styles.itemslist}>
          <FlatList
            data={DATA}
            horizontal={true}
            renderItem={this.renderTitleItem}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            ref={this.titleListRef}
            onScroll={({ nativeEvent }) => {
              const index = Math.round(
                nativeEvent.contentOffset.x /
                  nativeEvent.contentSize.width *
                  DATA.length
              );
              if (index !== this.state.activeIndex) {
                this.setState({ activeIndex: index });
              }
          }}
          scrollEventThrottle={16}
          />
          <SectionList
            sections={DATA}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id.toString()}
            renderSectionHeader={({ section }) => (
              <View style={styles.sectionHeaderContainer}>
                <Text style={styles.sectionHeaderTitle}>{section.title}</Text>
              </View>
            )}
                      ref={this.sectionListRef}
                      onScroll={({ nativeEvent }) => {
                        const index = Math.round(
                          nativeEvent.contentOffset.y /
                          nativeEvent.contentSize.height *
                          DATA.length
                        );
                        if (index !== this.state.activeIndex) {
                          this.setState({ activeIndex: index });
                          this.titleListRef.current.scrollToIndex({
                            index,
                            animated: true,
                          });
                        }
                              }}
                      stickySectionHeadersEnabled={false}
                      ListHeaderComponent={<View style={{ height: 10 }} />}
                    />
              {/* <FlatList
              data={DATA}
              renderItem={({ item, index }) => (
                <View style={{ height: 60 }}>
                  {index === this.state.activeIndex && (
                    <View style={styles.itemIndicatorContainer}>
                      <View style={styles.itemIndicator} />
                    </View>
                  )}
                </View>
              )}
            /> */}
          </View>
         <View style={styles.viewCartContainer}>
              <View style={styles.viewCart}>
              
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewCart', { cart: this.state.cart })}>
                 
                  <View style={{flexDirection:"row"}}>
                  {this.state.cartCount > 0 && (
            
            <View style={{ backgroundColor:"#fff",
                width:20, justifyContent:"center", alignItems:"center", marginRight:10, borderRadius:4}}>   
                   <Text style={{ color: 'black', fontSize: 13,  }}>{this.state.cartCount}</Text>
                   </View>
               // </View>
       )}
                  <Text style={{fontSize:16, color:"#ffff"}}>View Cart</Text>
                  </View>
                  </TouchableOpacity>
                  <Text style={{fontSize:16, color:"#ffff"}}> Total{ }</Text>
                  </View>
         </View>
</View>
);
}}
const mapStateToProps = (state) => ({
  checkedItems: state.checkedItems
});

const mapDispatchToProps = (dispatch) => ({
  increaseCounter: (itemId) => dispatch(increaseCounter(itemId)),
  decreaseCounter: (itemId) => dispatch(decreaseCounter(itemId)),
  setCheckedItem: (itemId, quantity) => dispatch(setCheckedItem(itemId, quantity))
});

export default connect(mapStateToProps, mapDispatchToProps)(BirthdayPage);

const styles = StyleSheet.create({
container: {
flex: 1,
},
 images:{
  //flex:1,
    width: "100%",
    height: 200, 

  },
  infoStyle:{
    flexDirection:"row",
    justifyContent:"space-between",
    margin:10,

  },
  rateStyle:{
    flexDirection:"row", 
  },
  allInfo:{
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  position: 'absolute',
  //justifyContent: 'center',
  //alignItems: 'center',
  zIndex: 1,
  top: "40%",
  left: "20%",
  right: 0,
  bottom: 0,
  borderRadius: 10,
  width: '60%',
  height:"50%",
  },
  
titleItemContainer: {
paddingHorizontal: 20
,
paddingVertical: 10,
height:60,

borderRadius:3
},
activeTitleItemContainer: {
borderBottomWidth: 2,
borderColor: '#000',
},
titleItemText: {
fontSize: 14,
fontWeight:"500",
},
sectionHeaderContainer: {
backgroundColor: '#f2f2f2',
paddingVertical: 8,
paddingHorizontal: 2,
borderBottomWidth: 1,
borderBottomColor: '#ddd',
},
sectionHeaderTitle: {
fontSize: 16,
fontWeight: 'bold',
},
itemContainer: {
  flexDirection:'row',
  justifyContent:"space-between",
  alignItems:"center",
paddingHorizontal: 20,
paddingVertical: 10,
},
itemName: {
fontSize: 14,
fontWeight:"bold"
},
itemDescription:{
fontSize:12,
marginTop:4
},
itemPrice: {
fontSize: 14,
color: '#666',
marginTop: 5,
},
itemIndicatorContainer: {
alignItems: 'flex-end',
marginRight: 20,
marginTop: -10,
},
itemIndicator: {
width: 10,
height: 10,
borderRadius: 5,
backgroundColor: '#000',
},
  logo:{
    width:50,
    height:50,
    borderRadius:4
  },
  itemslist:{
    height:"75%"
  },
  itemPhoto:{
    width:70,
    height:70,
    borderRadius:5
  },
  descWithPrice:{
    marginLeft:10,
    width:"70%"

  },
  quantityContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
    quantityContainerAdd: {
      flex:1,
   
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: "100%",
    backgroundColor:"white"
  },
  quantityButton: {
    backgroundColor: '#f6437b',
    borderRadius: 20,
    padding: 5,
  },
  // quantityButtonText: {
  //   color: 'white',
  //   fontSize: 18,
  //   fontWeight: 'bold',
  // },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  popupContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 400,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  header: {
    alignItems: 'center',
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    marginVertical: 10,
  },
  content: {
    //flex: 1,
   // justifyContent: 'space-between',
   // alignItems: 'flex-start',
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  plusAndMinus:{
    flexDirection:"row"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    //height:'100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ff69b4',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cartItems: {
    padding: 20,
  },
  cartItem: {
    //flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cartItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#888888',
  },
  cartItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItemQuantity: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  cartCheckoutButton: {
    backgroundColor: '#ff69b4',
    padding: 20,
    alignItems: 'center',
  },
  cartCheckoutButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  viewCart:{
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    backgroundColor:"#f6437b",
    width:"90%",
    borderRadius:3,
    marginBottom:5,
    height:50,
    
  },
  viewCartContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  closeButton:{
    position:"absolute",
    top:"20%",
    marginLeft:"5%",
    
  }
  

});