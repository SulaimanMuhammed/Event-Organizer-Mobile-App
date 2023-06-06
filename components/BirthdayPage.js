import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
  TouchableWithoutFeedback,
  TextInput,
  Platform,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { FontAwesome5 } from "react-native-vector-icons";
import { Modal } from "react-native";
import { connect } from "react-redux";

import { StatusBar } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addArray } from "../redux/Actions";

import { app, storage } from "../Firebase";

import {
  getFirestore,
  collection,
  getDocs,

  //listCollections,
} from "firebase/firestore";
//import { listCollections } from "firebase/firestore/lite";
//import { listCollections } from "firebase/firestore/lite";

class BirthdayPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      // data: DATA,
      data: [],
      checkedItems: {}, // add checkedItems to state
      modalVisible: false,
      selectedItems: {}, //
      cart: [],
      cartCount: 0,
      viewCartVisible: false,
      activeIndexButton: 0,
      isManageActive: true, // new state to track if 'Food' button is active
      selectedTime: new Date(),
      selectedDate: new Date(),
      showTimePicker: false,
      showDatePicker: false,
      modalVisibleSets: false,
      selectedNumber: null,
      personName: "",
      sentence: "",
      music: "",
      personInfo: [],
      imageUrls: [],
    };
  }

  ////////////////////////////////////////////////////////////////last update
  async componentDidMount() {
    try {
      const { route } = this.props;
      const { restaurantId } = route.params;

      const db = getFirestore(app);

      const listNames = ["CakeList", "FoodList", "DrinkList"];

      const dataPromises = listNames.map(async (listName) => {
        const listRef = collection(
          db,
          `birthday/${restaurantId}/menu/menuItems/${listName}`
        );
        const querySnapshot = await getDocs(listRef);
        const data = querySnapshot.docs.map((doc) => doc.data());
        return { title: listName, data: data };
      });

      const data = await Promise.all(dataPromises);
      this.setState({ data });
      // this is how to display an object in an array of two
      // console.log(JSON.stringify(data, null, 2));
      ///////////////////////////////////////////////////////////////
      const listRef = storage.ref(`restaurants/${restaurantId}`);
      const listResult = await listRef.listAll();
      const photoData = await Promise.all(
        listResult.items.map(async (itemRef) => {
          const url = await itemRef.getDownloadURL();
          const name = itemRef.name;

          return { name, url };
        })
      );
      this.setState({ imageUrls: photoData });
    } catch (error) {
      console.log("Error fetching restaurant photos:", error);
    }
  }

  onIncrementPress = (item) => {
    const { cart } = this.state;
    const index = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (index !== -1) {
      const updatedCartItem = {
        ...cart[index],
        quantity: cart[index].quantity + 1,
      };
      cart[index] = updatedCartItem;
    } else {
      const newCartItem = { id: item.id, ...item, quantity: 2 }; // set quantity to 1 here
      cart.push(newCartItem);
    }
    this.setState({ incrementChanged: true }); // set flag to true when increment changes quantity
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
  };

  addToCart = () => {
    const { cart, selectedItems } = this.state;

    const index = cart.findIndex((item) => item.id === selectedItems.id);
    if (index !== -1) {
      // Item already exists in cart, do nothing
    } else {
      // Item does not exist in cart, add it with quantity 1
      cart.push({ ...selectedItems, quantity: 1 });
    }

    // this.props.addArray(cart);
    this.setState({
      modalVisible: false,
      checkedItems: {},
      incrementChanged: false,
    });

    if (selectedItems.quantity === 0) {
      // Quantity was not incremented, so increment it now
      this.setState((prevState) => ({
        cartCount: prevState.cartCount + 1,
        cart: [...cart, { ...selectedItems, quantity: 1 }],
      }));
    } else if (this.state.incrementChanged) {
      // Quantity was incremented, update cartCount
      this.setState((prevState) => ({
        cartCount: prevState.cartCount + 1,
        cart,
      }));
    }
  };
  handleManageButtonPress = () => {
    this.setState({ isManageActive: true });
  };

  handleFoodButtonPress = () => {
    this.setState({ isManageActive: false });
  };

  setModalVisible = (visible, item) => {
    this.setState({ modalVisible: visible, selectedItems: item });
  };
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
              { color: isActive ? "red" : "black" },
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
  renderSectionHeader = ({ section, index }) => {
    return (
      <View>
        <Text>{section.title}</Text>
      </View>
    );
  };

  renderItem = ({ item, index, section }) => {
    const imageUrlObj = this.state.imageUrls.find((obj) => {
      return obj.name.startsWith(item.name);
    });

    const imageUrl = imageUrlObj ? imageUrlObj.url : null;

    return (
      <TouchableOpacity
        onPress={() => {
          const selectedItemsWithImgUrl = {
            ...item,
            imgUrl: imageUrl,
          };
          this.setState({
            selectedItems: selectedItemsWithImgUrl,
            modalVisible: true,
          });
        }}
      >
        <View style={styles.itemContainer}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={imageUrl ? { uri: imageUrl } : null}
              style={styles.itemPhoto}
            />
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
            // onRequestClose={}
          >
            <TouchableWithoutFeedback onPress={() => this.setVisible(false)}>
              <View style={styles.overlay} />
            </TouchableWithoutFeedback>
            <View style={styles.popupContainer}>
              <View style={styles.header}>
                <Image
                  source={
                    imageUrl ? { uri: this.state.selectedItems.imgUrl } : null
                  } // Replace with your own image URL
                  style={styles.image}
                />
              </View>
              <View style={styles.quantityContainer}>
                <View style={styles.content}>
                  <Text style={styles.title}>
                    {this.state.selectedItems.name}
                  </Text>
                  <Text style={styles.description}>
                    {this.state.selectedItems.description}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.price}>
                      {this.state.selectedItems.price}
                    </Text>
                    <View style={styles.plusAndMinus}>
                      <TouchableOpacity
                        onPress={() =>
                          this.onDecrementPress(this.state.selectedItems)
                        }
                      >
                        <Text style={styles.quantityButton}>-</Text>
                      </TouchableOpacity>
                      <View style={{ padding: 5 }}>
                        <Text style={styles.quantity}>
                          {this.state.cart.find(
                            (cartItem) =>
                              cartItem.id === this.state.selectedItems.id
                          )?.quantity || 1}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          this.onIncrementPress(this.state.selectedItems)
                        }
                      >
                        <Text style={styles.quantityButton}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => this.addToCart(this.state.selectedItems)}
              >
                <Text style={styles.addButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </TouchableOpacity>
    );
  };

  onTimeChange = (event, selectedTime) => {
    if (Platform.OS === "android") {
      this.setState({ showTimePicker: false });
    }
    if (selectedTime) {
      this.setState({ selectedTime });
    }
  };
  onDateChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      this.setState({ showDatePicker: false });
    }
    if (selectedDate) {
      this.setState({ selectedDate });
    }
  };

  showTimePicker = () => {
    // Set the selected time to the current time
    const currentTime = new Date();
    this.setState({ selectedTime: currentTime });

    // Show the DateTimePicker component
    this.setState({ showTimePicker: true });
  };
  hideTimePicker = () => {
    if (this.state.showTimePicker) {
      this.setState({ showTimePicker: false });
    }
  };
  showDatePicker = () => {
    this.setState({ showDatePicker: true });
  };
  hideDatePicker = () => {
    if (this.state.showDatePicker) {
      this.setState({ showDatePicker: false });
    }
  };
  onNumberPickerChange = (value) => {
    this.setState({ selectedNumber: value });
  };
  //add numbers
  toggleModal = () => {
    this.setState({ modalVisibleSets: !this.state.modalVisibleSets });
  };

  selectNumber = (number) => {
    this.setState({ selectedNumber: number });
  };

  renderNumber = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        this.selectNumber(item),
          this.setState({ modalVisibleSets: !this.state.modalVisibleSets });
      }}
    >
      <Text style={styles.number}>{item}</Text>
    </TouchableOpacity>
  );
  handleNameChange = (text) => {
    this.setState({ personName: text });
  };
  handleSentenceChange = (text) => {
    this.setState({ sentence: text });
  };
  handleMusicChange = (text) => {
    this.setState({ music: text });
  };
  isFormComplete = () => {
    const { selectedNumber, music } = this.state;
    return selectedNumber !== null;
  };

  render() {
    const { route } = this.props;
    const { item } = this.props.route.params;
    // const { item } = route.params.item;
    const photos = route.params.photos;
    const { cart } = this.state;
    const { isManageActive } = this.state;
    const { data } = this.state;

    const numbers = Array.from(Array(20).keys()); // Generate an array of numbers 0-19
    const imageUrlLogo = photos.find((obj) => {
      return obj.name.startsWith(item.logo);
    });
    const imageUrlRest = photos.find((obj) => {
      return obj.name.startsWith(item.restPhoto);
    });
    const logo = imageUrlLogo ? imageUrlLogo.url : null;
    const restImage = imageUrlRest ? imageUrlRest.url : null;
    return (
      <View style={styles.container}>
        {/* <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}> */}
        <StatusBar backgroundColor="transparent" />

        <View>
          <Image
            source={restImage ? { uri: restImage } : null}
            style={styles.images}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => this.props.navigation.goBack()}
          >
            <FontAwesome5 name="arrow-left" size={30} color="white" />
          </TouchableOpacity>
          <View style={styles.allInfo}>
            <View style={styles.infoStyle}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {item.name}
              </Text>
              <View style={styles.rateStyle}>
                <Image
                  source={logo ? { uri: logo } : null}
                  style={styles.logo}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>{item.place}</Text>
              <View style={{ flexDirection: "row", marginRight: "4%" }}>
                <FontAwesome5
                  name="star"
                  solid={true}
                  style={{
                    fontSize: 20,
                    marginTop: 2,
                    color: "#E49B0F",
                    borderColor: "red",
                  }}
                />
                <Text style={{ fontSize: 18 }}>{item.rate}</Text>
              </View>
            </View>
          </View>
        </View>
        {/* adding two new buttons */}
        <View style={styles.twoButtons}>
          <TouchableOpacity
            style={
              this.state.activeIndexButton === 0
                ? styles.activeButton
                : styles.eachButton
            }
            onPress={() => {
              // Perform multiple actions
              this.setState({ activeIndexButton: 0 });
              this.handleManageButtonPress();
            }}
          >
            <Text style={styles.buttonText}>Manage</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.state.activeIndexButton === 1
                ? styles.activeButton
                : styles.eachButton
            }
            onPress={() => {
              // Perform multiple actions
              this.setState({ activeIndexButton: 1 });
              this.handleFoodButtonPress();
            }}
            disabled={!this.isFormComplete()}
          >
            <Text style={styles.buttonText}>Food</Text>
          </TouchableOpacity>
        </View>
        {isManageActive ? (
          // conditionally render the list components if 'Food' button is active
          <TouchableWithoutFeedback
            onPress={() => {
              this.hideTimePicker();
              Keyboard.dismiss();
            }}
          >
            <KeyboardAvoidingView style={styles.container} behavior="padding">
              <ScrollView style={styles.manageContainer}>
                {/* <Text style={styles.manageTitle}>Manage Your Birthday</Text> */}
                <Text style={styles.manageTitle}> Name</Text>
                <TextInput
                  style={styles.manageInput}
                  placeholder="Name"
                  value={this.state.personName}
                  onChangeText={this.handleNameChange}
                />

                <Text style={styles.manageTitle}>Write on Cake</Text>
                <TextInput
                  style={styles.manageInput}
                  placeholder="Sentence"
                  value={this.state.sentence}
                  onChangeText={this.handleSentenceChange}
                />

                <View>
                  <Text style={styles.manageTitle}>Birthday Time:</Text>

                  <TouchableOpacity
                    onPress={() => {
                      this.onTimeChange;
                    }}
                  >
                    <View style={styles.buttonTime}>
                      {this.state.selectedDate && this.state.selectedTime && (
                        <DateTimePicker
                          mode="time"
                          value={this.state.selectedTime}
                          is24Hour={true}
                          display="default"
                          onChange={this.onTimeChange}
                          //   style={{}}
                        />
                      )}

                      <FontAwesome5 name="clock" size={30} color="#f6437b" />
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={styles.manageTitle}>Birthday Date:</Text>
                  <View style={styles.buttonTime}>
                    {this.state.selectedDate && this.state.selectedTime && (
                      <DateTimePicker
                        mode="date"
                        value={this.state.selectedDate}
                        //is24Hour={true}
                        display="default"
                        onChange={this.onDateChange}
                        //   style={{ backgroundColor: "white", borderWidth: 0.5 }}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() => this.setState({ showDatePicker: true })}
                    >
                      <FontAwesome5 name="calendar" size={30} color="#f6437b" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* <Text>How many sets do you want</Text>
              <TextInput style={styles.manageInput} placeholder="Time" /> */}
                <View>
                  <Text style={styles.manageTitle}>Choose a Number</Text>
                  <TouchableOpacity
                    style={styles.buttonTime}
                    onPress={this.toggleModal}
                  >
                    <Text>
                      {(this.state.selectedNumber !== null && (
                        <Text style={styles.selectedNumber}>
                          {this.state.selectedNumber}
                        </Text>
                      )) ||
                        0}
                    </Text>
                    <FontAwesome5 name="chair" size={30} color="#f6437b" />
                  </TouchableOpacity>

                  <Modal
                    visible={this.state.modalVisibleSets}
                    animationType="slide"
                    onRequestClose={this.toggleModal}
                    style={{ backgroundColor: "red" }}
                  >
                    <View style={styles.modal}>
                      <FlatList
                        data={numbers}
                        renderItem={this.renderNumber}
                        keyExtractor={(item) => item.toString()}
                        ItemSeparatorComponent={() => (
                          <View style={styles.separator} />
                        )}
                      />

                      <TouchableOpacity
                        style={styles.closeButtonSets}
                        onPress={this.toggleModal}
                      >
                        <Text style={styles.closeButtonText}>Close</Text>
                      </TouchableOpacity>
                    </View>
                  </Modal>
                </View>

                <Text style={styles.manageTitle}>Music</Text>
                <TextInput
                  style={styles.manageInput}
                  placeholder="Music"
                  value={this.state.music}
                  onChangeText={this.handleMusicChange}
                />
              </ScrollView>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        ) : (
          // render a different component if 'manage' button is active
          <View style={styles.itemslist}>
            {/* <Text> here </Text>
             <View>
              <SectionList
                sections={data}
                keyExtractor={(item, index) => item + index}
                renderItem={this.renderItem}
                renderSectionHeader={this.renderSectionHeader}
                //   renderSectionHeader={renderSectionHeader}
              />
            </View> */}

            <FlatList
              data={data}
              horizontal={true}
              renderItem={this.renderTitleItem}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              ref={this.titleListRef}
              onScroll={({ nativeEvent }) => {
                const index = Math.round(
                  (nativeEvent.contentOffset.x /
                    nativeEvent.contentSize.width) *
                    this.state.data.length
                );
                if (index >= 0 && index !== this.state.activeIndex) {
                  this.setState({ activeIndex: index });
                }
              }}
              scrollEventThrottle={16}
            />

            <SectionList
              sections={data}
              renderItem={this.renderItem}
              renderSectionHeader={this.renderSectionHeader}
              keyExtractor={(item, index) => index.toString()}
              ref={this.sectionListRef}
              onScroll={({ nativeEvent }) => {
                const index = Math.floor(
                  (nativeEvent.contentOffset.y /
                    nativeEvent.contentSize.height) *
                    this.state.data.length
                );
                if (index >= 0 && index !== this.state.activeIndex) {
                  this.setState({ activeIndex: index });
                  this.titleListRef.current.scrollToIndex({
                    index,
                    animated: true,
                  });
                }
              }}
              // stickySectionHeadersEnabled={false}
              ListHeaderComponent={<View style={{ height: 10 }} />}
            />
          </View>
        )}

        <View style={styles.viewCartContainer}>
          {isManageActive ? (
            <View style={styles.viewCart}>
              <TouchableOpacity
                onPress={() => {
                  const {
                    personInfo,
                    personName,
                    music,
                    sentence,
                    selectedTime,
                    selectedDate,
                    selectedNumber,
                  } = this.state;

                  const existingPersonIndex = personInfo.findIndex(
                    (person) => person.personName === personName
                  );

                  if (existingPersonIndex !== -1) {
                    const updatedPersonInfo = [...personInfo];
                    updatedPersonInfo[existingPersonIndex] = {
                      ...updatedPersonInfo[existingPersonIndex],
                      music,
                      sentence,
                      selectedTime,
                      selectedDate,
                      selectedNumber,
                    };
                    this.setState({
                      personInfo: updatedPersonInfo,
                    });
                  } else {
                    const newPersonInfo = {
                      personName,
                      music,
                      sentence,
                      selectedTime,
                      selectedDate,
                      selectedNumber,
                    };
                    this.setState((prevState) => ({
                      personInfo: [...prevState.personInfo, newPersonInfo],
                    }));
                  }

                  this.setState({
                    activeIndexButton: 1,
                  });

                  this.handleFoodButtonPress();
                }}
                disabled={!this.isFormComplete()}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 16, color: "#ffff" }}>Next</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.viewCart}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("ViewCart", {
                    cart: this.state.cart,
                    personInfo: this.state.personInfo,
                    item: item,
                  })
                }
              >
                <View style={{ flexDirection: "row" }}>
                  {this.state.cartCount > 0 && (
                    <View
                      style={{
                        backgroundColor: "#fff",
                        width: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: 10,
                        borderRadius: 4,
                      }}
                    >
                      <Text style={{ color: "black", fontSize: 13 }}>
                        {this.state.cartCount}
                      </Text>
                    </View>
                    // </View>
                  )}
                  <Text style={{ fontSize: 16, color: "#ffff" }}>
                    View Cart
                  </Text>
                </View>
              </TouchableOpacity>
              <Text style={{ fontSize: 16, color: "#ffff" }}> Total{}</Text>
            </View>
          )}
        </View>
        {/* </KeyboardAvoidingView> */}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    arrayOfArrays: state.arrayOfArrays,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // addArray: (array) => dispatch(addArray(array)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BirthdayPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  images: {
    //flex:1,
    width: "100%",
    height: 200,
  },
  infoStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  rateStyle: {
    flexDirection: "row",
  },
  allInfo: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    position: "absolute",
    //justifyContent: 'center',
    //alignItems: 'center',
    zIndex: 1,
    top: "40%",
    left: "20%",
    right: 0,
    bottom: 0,
    borderRadius: 10,
    width: "60%",
    height: "50%",
  },

  titleItemContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 60,

    borderRadius: 3,
  },
  activeTitleItemContainer: {
    borderBottomWidth: 2,
    borderColor: "#000",
  },
  titleItemText: {
    fontSize: 14,
    fontWeight: "500",
  },
  sectionHeaderContainer: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 8,
    paddingHorizontal: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 12,
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  itemIndicatorContainer: {
    alignItems: "flex-end",
    marginRight: 20,
    marginTop: -10,
  },
  itemIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  itemslist: {
    height: "65%",
  },
  itemPhoto: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  descWithPrice: {
    marginLeft: 10,
    width: "70%",
  },
  quantityContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  quantityContainerAdd: {
    flex: 1,

    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: "100%",
    backgroundColor: "white",
  },
  quantityButton: {
    backgroundColor: "#f6437b",
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
    fontWeight: "bold",
  },
  popupContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 400,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  header: {
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
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
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  plusAndMinus: {
    flexDirection: "row",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    //height:'100%',
    backgroundColor: "#ffffff",
    borderRadius: 20,
    overflow: "hidden",
  },
  cartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ff69b4",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  cartItems: {
    padding: 20,
  },
  cartItem: {
    //flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cartItemLeft: {
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "bold",
    marginBottom: 5,
  },
  cartItemPrice: {
    fontSize: 16,
    color: "#888888",
  },
  cartItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartItemQuantity: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  cartCheckoutButton: {
    backgroundColor: "#ff69b4",
    padding: 20,
    alignItems: "center",
  },
  cartCheckoutButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  viewCart: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f6437b",
    width: "90%",
    borderRadius: 3,
    marginBottom: 5,
    height: 50,
  },
  viewCartContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f5f5f5",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  closeButton: {
    position: "absolute",
    top: "20%",
    marginLeft: "5%",
  },
  twoButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    //padding: 10,
  },
  eachButton: {
    backgroundColor: "white",
    borderRadius: 5,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    height: 30,
    borderWidth: 0.3,
  },
  buttonText: {
    fontSize: 18,
    color: "black",
  },
  manageContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  manageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    justifyContent: "center",
  },
  manageInput: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f6437b",
  },
  // manageButton: {
  //   backgroundColor: "blue",
  //   padding: 10,
  //   borderRadius: 5,
  //   alignItems: "center",
  // },
  // manageButtonText: {
  //   fontSize: 16,
  //   fontWeight: "bold",
  //   color: "white",
  // },
  activeButton: {
    backgroundColor: "#f6437b",
    borderRadius: 5,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    height: 30,
    borderWidth: 0.3,
  },
  labelTime: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonTime: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    // width: 400,
    // borderWidth: 1,
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  buttonTextTime: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  buttonSets: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
  },
  buttonTextSets: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  modal: {
    //flex: 1,
    backgroundColor: "#FFFFFF",

    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  number: {
    fontSize: 20,
    paddingVertical: 12,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#CCCCCC",
    marginVertical: 8,
  },
  closeButtonSets: {
    backgroundColor: "#CCCCCC",
    padding: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
  },
  selectedNumber: {
    marginTop: 24,
    fontSize: 16,
  },
});
