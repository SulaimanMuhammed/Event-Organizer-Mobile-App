import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import { app, storage } from "../Firebase"; // Import your Firebase configuration

const Offers = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [photos, setPhotos] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore(app);
        const offersCollection = collection(db, "offers");
        const unsubscribe = onSnapshot(offersCollection, (snapshot) => {
          const fetchedOffers = snapshot.docs.map((doc) => doc.data());
          setCarouselData(fetchedOffers);
        });
        const listRef = storage.ref(`restaurants/offers`);
        const listResult = await listRef.listAll();
        const photoData = await Promise.all(
          listResult.items.map(async (itemRef) => {
            const url = await itemRef.getDownloadURL();
            const name = itemRef.name;
            return { name, url };
          })
        );

        setPhotos(photoData);

        return () => unsubscribe(); // Cleanup function
      } catch (error) {
        console.log("Error fetching offers:", error);
      }
    };

    fetchData();
  }, []);
  const renderItem = ({ item }) => {
    const imageUrlRest =
      photos &&
      photos.find((obj) => {
        return obj.name.startsWith(item.photo);
      });

    const restImage = imageUrlRest ? imageUrlRest.url : null;

    return (
      <View style={styles.offerContainer}>
        <Text style={styles.offerName}>{item.name}</Text>

        {/* {matchingPhoto && ( */}
        <Image
          source={restImage ? { uri: restImage } : null}
          style={styles.offerImage}
        />
        <Text style={styles.offerDescription}>{item.description}</Text>
        {/* )} */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={carouselData}
        renderItem={renderItem}
        sliderWidth={300}
        itemWidth={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6437b",
    borderRadius: 5,
  },
  offerContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    // padding: 16,
    justifyContent: "center",
    alignItems: "center",
    top: "4%",
    // marginHorizontal: 8,
    // shadowColor: "#000000",
    // shadowOpacity: 0.1,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // elevation: 2,
  },
  offerName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  offerDescription: {
    fontSize: 16,
  },
  offerImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 8,
  },
});

export default Offers;
