import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView, FlatList, StyleSheet, Image, TextInput} from 'react-native';
import { FontAwesome5 } from 'react-native-vector-icons';
import { useEffect, useState } from 'react'

const data = [
  {
    title: "Aenean leo",
   
    rate:"4",
    place:"restaurant"
  },
  {
    title: "In turpis",
    place:"cafe",


  
    rate:"4"
  },
  {
    title: "Lorem Ipsum",
 place:"restaurant",
   
    rate:"4"
  },
  {
    title: "Lorem Ipsum",
 place:"restaurant",
   
    rate:"4"
  },
];





//////////////
export default function Party({navigation}) {
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
                           <TouchableOpacity onPress={()=>navigation.navigate("Birthday")}>
                            <View style={styles.designFlatList}> 
                                     <Image
                                            source={require('../photos/birthday.jpg')}
                                            style={styles.images}
                                         />
                                       <View style={styles.info}>
                                              <Text style={{fontSize:16, fontWeight:"bold"}}> {item.title}</Text>
                                              <FontAwesome5 name="birthday-cake" style={{ fontSize:25, marginTop:3, color:"red"}}/> 
                                              <Text> {item.place}</Text>
                                       </View>
                                       <View style={styles.rateStyle}>
                                                    <FontAwesome5 name="star" style={{ fontSize:15}}/>
                                                    <Text >{item.rate}</Text>
                                      </View>
                                    </View>
                           </TouchableOpacity>
                                  )}
                                  keyExtractor={item => item.title}
                                />
  </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    //backgroundColor:'#f6437b',
    backgroundColor:'#fff',
    
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
    width:400,
    justifyContent:'center',
   
    alignSelf:"center",
    backgroundColor:"#f4f5f5",
     
    marginTop:20,
   

  },
  rateStyle:{
     
     borderRadius:30,
     width:20,
     flexDirection:"row",
     justifyContent:"space-between",
    
     
     
    }, 
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
    }

})