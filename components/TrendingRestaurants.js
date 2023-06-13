import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "../Firebase";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
const TrendingRestaurants = ({ navigation }) => {
  const [trendingRestaurants, setTrendingRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    fetchTrendingRestaurants();
    fetchRestaurantPhotos();
  }, []);

  const fetchTrendingRestaurants = async () => {
    try {
      const db = getFirestore(app);
      const ordersCollection = collection(db, "orders");
      const querySnapshot = await getDocs(ordersCollection);
      const orders = querySnapshot.docs.map((doc) => doc.data());
      const restaurantNames = orders.map((order) => order.item.name);
      const uniqueRestaurantNames = [...new Set(restaurantNames)];
      const birthdayCollection = collection(db, "birthday");
      const partyCollection = collection(db, "party");
      const trendingRestaurantsData = [];
      for (const name of uniqueRestaurantNames) {
        const birthdayQuery = query(
          birthdayCollection,
          where("name", "==", name)
        );
        const birthdaySnapshot = await getDocs(birthdayQuery);
        const birthdayData = birthdaySnapshot.docs.map((doc) => doc.data());
        const partyQuery = query(partyCollection, where("name", "==", name));
        const partySnapshot = await getDocs(partyQuery);
        const partyData = partySnapshot.docs.map((doc) => doc.data());
        trendingRestaurantsData.push(...birthdayData, ...partyData);
      }

      setTrendingRestaurants(trendingRestaurantsData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching trending restaurants:", error);
    }
  };

  const fetchRestaurantPhotos = async () => {
    try {
      const storage = getStorage(app);
      const listRef = ref(storage, "restaurants/logos");
      const listResult = await listAll(listRef);
      const photoData = await Promise.all(
        listResult.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          const name = itemRef.name;
          return { name, url };
        })
      );
      setPhotos(photoData);
    } catch (error) {
      console.error("Error fetching restaurant photos:", error);
    }
  };

  const renderTrendingRestaurant = ({ item }) => {
    const imageUrlLogo = photos.find((obj) => {
      return obj.name.startsWith(item.logo);
    });
    const logo = imageUrlLogo ? imageUrlLogo.url : null;
    return (
      <View style={styles.cartContainer}>
        <Image
          source={logo ? { uri: logo } : null}
          style={styles.restaurantPhoto}
        />
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          {/* <Text style={styles.restaurantRate}>{item.rate}</Text> */}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Trending</Text>
      {isLoading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#000000" />
      ) : (
        <FlatList
          data={trendingRestaurants}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderTrendingRestaurant}
          contentContainerStyle={styles.restaurantList}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  restaurantList: {
    flexDirection: "row",
  },
  cartContainer: {
    // width: 150,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    width: 120,
  },
  restaurantPhoto: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  restaurantInfo: {
    alignItems: "center",
  },
  restaurantName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  restaurantRate: {
    fontSize: 14,
    color: "#888",
  },
});

export default TrendingRestaurants;
