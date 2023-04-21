import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView, FlatList, StyleSheet, Image, TextInput} from 'react-native';
import { FontAwesome5 } from 'react-native-vector-icons';
import { useEffect, useState } from 'react'

const data = [
  {
    id:1,
    name: "Aenean leo",
    rate:"4",
    place:"description goes here",
    photoSrc: require('../photos/restaurant1.jpg'),
    logo:require('../photos/logo.png')
  },
  {
    id:2,
    name: "In turpis",
    place:"description goes here",
    rate:"4",
    photoSrc: require('../photos/restaurant1.jpg'),
    logo:require('../photos/logo.png')
  },
  {
    id:3,
    name: "Lorem Ipsum",
    place:"description goes here",
    rate:"4",
    photoSrc: require('../photos/restaurant2.jpg'),
    logo:require('../photos/logo.png')
  },
  {
    id:4,
    name: "Lorem Ipsum",
    place:"description goes here",
    rate:"4",
    photoSrc: require('../photos/restaurant2.jpg'),
    logo:require('../photos/logo.png')
  },
];






//////////////
export default function Birthday({navigation}) {
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      navigation.setParams({ tabBarVisible: true });
    });
  
    navigation.setParams({ tabBarVisible: false });
  
    return unsubscribe;
  }, [navigation]);
  
      //search goes here       
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };
  return (
    <SafeAreaView style={styles.container}>



          <View style={styles.firstBar}>
          <View style={styles.search}>          
                <TextInput
                 placeholder="Search Here"
                 onChangeText={handleSearch}
                 value={searchText}
                />
                              {/* <FlatList
                                data={filteredData}
                                renderItem={({ item }) => <Text>{item.title}</Text>}
                                keyExtractor={(item) => item.id}
                              /> */}        
          </View>
          <View >
              <TouchableOpacity>
              <FontAwesome5 name="shopping-bag" style={{ fontSize:25, marginTop:9, color:"gary"}}/>
              </TouchableOpacity>
               
           </View>
           <View style={styles.favorite}>
                <TouchableOpacity>
                <FontAwesome5 name="heart" style={{ fontSize:25, marginTop:0, color:"red"}}/>
                </TouchableOpacity>
               
           </View>
          </View> 
            <FlatList 
                    data={data} 
                    renderItem={({ item}) => (
                      <TouchableOpacity onPress={() => navigation.navigate("BirthdayPage", {item: item, photoSrc: item.photoSrc, logo:item.logo})}>


                            <View style={styles.designFlatList}> 
                                     <Image
                                            source={item.photoSrc}
                                            style={styles.images}
                                         />
                                         
                                         <View style={styles.logoContainer}>
                                                <TouchableOpacity>
                                                      <View style={styles.addToFavorite}>
                                                      
                                                      <FontAwesome5 name="heart" style={{ fontSize:18, marginTop:0, color:"red"}}/>
                                                      </View>
                                                </TouchableOpacity>
                                              <Image
                                                source={item.logo}
                                                style={styles.logo}
                                              />
                                            </View>
                                       <View style={styles.info}>
                                              <Text style={{fontSize:16, fontWeight:"bold"}}> 
                                              {item.name}
                                              </Text>
                                              {/* <FontAwesome5 name="birthday-cake" style={{ fontSize:25, marginTop:3, color:"red"}}/>  */}
                                              
                                       </View>
                                            <View style={styles.desc}>

                                              <Text> {item.place}</Text>
                                              <View style={styles.rateStyle}>
                                                    <FontAwesome5 name="star" style={{ fontSize:15, marginTop:2, color:"red"}}/>
                                              <Text >{item.rate}</Text>
                                              </View>
                                            </View>

                                      
                                    </View>
                           </TouchableOpacity>
                                  )}
                                  keyExtractor={item => item.id}
                                />
  </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    //backgroundColor:'#f6437b',
    backgroundColor:'#ffff',
    
  },
  firstBar:{
     flexDirection:"row",
     justifyContent:"space-between",
     color:"white"
  },
  images:{
  width:"100%",
  height:150,
  borderTopLeftRadius:5,
  borderTopRightRadius:5,
  
  },
 
  info:{
    flexDirection:"row",
    justifyContent:"space-between",

  },
  designFlatList:{
    width:380,
    justifyContent:'center',
   
    alignSelf:"center",
    backgroundColor:"#f4f5f5",
     
    marginTop:20,
   

  },
  rateStyle:{
     
     borderRadius:30,
     width:40,
     flexDirection:"row",
    //  justifyContent:"space-between",
    
     
     
    }, 
    desc:{
      flexDirection:"row",
      justifyContent:"space-between"

    }
    ,
    search:{
         backgroundColor:"#f0f0f0",
         width:'80%',
         borderRadius:5,
         height:40,
         justifyContent:"center",
         margin:7
    },
    favorite:{
      margin:10
    },
    logoContainer: {
      
      position: 'absolute',
      zIndex: 1,
      top: 10,
      left: 300,
      right: 10,
      bottom: 10,
      justifyContent: "space-between",
      alignItems: 'center',
    },
    logo: {
      width: "100%",
      height: 70,
      resizeMode: 'contain',
      backgroundColor:"white",
      borderRadius:5,
      marginBottom:20
    },
    addToFavorite:{
      backgroundColor:"white",
      borderRadius:40,
      width:25,
      height:25,
      justifyContent:"center",
     
      alignItems:"center"

    }

})