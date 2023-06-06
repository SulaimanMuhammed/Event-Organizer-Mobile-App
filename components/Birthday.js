import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "react-native-vector-icons";
import { useEffect, useState } from "react";
import { app, storage } from "../Firebase";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
} from "@firebase/firestore";

export default function Birthday({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const db = getFirestore(app);
    const snapshot = await getDocs(collection(db, "birthday"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setData(data);
    setFilteredData(data);

    /////////////////////////////////////////////getting Photos
    const listRef = storage.ref(`restaurants/logos`);
    const listResult = await listRef.listAll();
    const photoData = await Promise.all(
      listResult.items.map(async (itemRef) => {
        const url = await itemRef.getDownloadURL();
        const name = itemRef.name;
        return { name, url };
      })
    );
    setPhotos(photoData);
  };

  if (!photos) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f6437b" />
        <Text style={styles.loadingText}>Loading reservation data...</Text>
      </View>
    );
  }

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const renderListItem = ({ item }) => {
    const imageUrlLogo = photos.find((obj) => {
      return obj.name.startsWith(item.logo);
    });
    const imageUrlRest = photos.find((obj) => {
      return obj.name.startsWith(item.restPhoto);
    });
    const logo = imageUrlLogo ? imageUrlLogo.url : null;
    const restImage = imageUrlRest ? imageUrlRest.url : null;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("BirthdayPage", {
            restaurantId: item.id,
            item: item,
            photos: photos,
          })
        }
      >
        <View style={styles.designFlatList}>
          <Image
            source={restImage ? { uri: restImage } : null}
            style={styles.images}
          />
          <View style={styles.logoContainer}>
            <TouchableOpacity>
              <View style={styles.addToFavorite}>
                <FontAwesome5
                  name="heart"
                  style={{ fontSize: 18, marginTop: 0, color: "red" }}
                />
              </View>
            </TouchableOpacity>
            <Image source={logo ? { uri: logo } : null} style={styles.logo} />
          </View>
          <View style={styles.info}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {item.name}
            </Text>
          </View>
          <View style={styles.desc}>
            <Text> {item.location}</Text>
            <View style={styles.rateStyle}>
              <FontAwesome5
                name="star"
                style={{ fontSize: 15, marginTop: 2, color: "red" }}
              />
              <Text>{item.rate}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.firstBar}>
        <View style={styles.arrow}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome5 name="arrow-left" size={30} color="#f6437b" />
          </TouchableOpacity>
        </View>
        <View style={styles.search}>
          <TextInput
            placeholder="Search Here"
            onChangeText={handleSearch}
            value={searchText}
          />
        </View>
        <View>
          <TouchableOpacity>
            <FontAwesome5
              name="shopping-bag"
              style={{ fontSize: 25, marginTop: 9, color: "gary" }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.favorite}>
          <TouchableOpacity>
            <FontAwesome5
              name="heart"
              style={{ fontSize: 25, marginTop: 0, color: "red" }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor:'#f6437b',

    backgroundColor: "#ffff",
  },
  firstBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    color: "white",
    padding: "1%",
  },
  images: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },

  info: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  designFlatList: {
    width: 380,
    justifyContent: "center",

    alignSelf: "center",
    backgroundColor: "#f4f5f5",

    marginTop: 20,
  },
  rateStyle: {
    borderRadius: 30,
    width: 40,
    flexDirection: "row",
    //  justifyContent:"space-between",
  },
  desc: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  search: {
    backgroundColor: "#f0f0f0",
    width: "70%",
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    margin: 7,
  },
  favorite: {
    margin: 10,
  },
  logoContainer: {
    position: "absolute",
    zIndex: 1,
    top: 10,
    left: 300,
    right: 10,
    bottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: 70,
    resizeMode: "contain",
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 20,
  },
  addToFavorite: {
    backgroundColor: "white",
    borderRadius: 40,
    width: 25,
    height: 25,
    justifyContent: "center",

    alignItems: "center",
  },
  arrow: {
    justifyContent: "center",
    alignItems: "center",
    left: "10%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
});
