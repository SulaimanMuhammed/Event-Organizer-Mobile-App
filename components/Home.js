// Home.js

import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, SafeAreaView, FlatList, TouchableOpacity, Dimensions} from 'react-native';


//import Carousel from 'react-native-reanimated-carousel';

const weddingSlider = [
  {
    key: 1,
    text: 'Welcome to Hafalat',
    rate: '3',
    image: {
      uri:
        '/photos/birthday-cake.png', 
    },
  },
  {
    key: 2,
    rate:'4',
    title: 'Party Like Never Before',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_mobile_recharge.png', 
    },
  },
  {
    key: 3,
    text: 'Welcome to Hafalat',
   rate:'3',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_mobile_recharge.png', 
    },
  },
  {
    key: 4,
    rate:'2',
    title: 'Party Like Never Before',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_mobile_recharge.png', 
    },
  },
];

const images = [
  {
    key: 435,
    uri: 'https://example.com/image1.jpg',
    title: 'Image 1',
  },
  {
    key: 65,
    uri: 'https://example.com/image2.jpg',
    title: 'Image 2',
  },
  {
    key: 455,
    uri: 'https://example.com/image3.jpg',
    title: 'Image 3',
  },
];
const data = [
  {
    key: 5436,
    title: "Aenean leo",
    body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    imgUrl: "https://picsum.photos/id/11/200/300",
  },
  {
    key: 3572,
    title: "In turpis",
    body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
    imgUrl: "https://picsum.photos/id/10/200/300",
  },
  {
    key: 4658,
    title: "Lorem Ipsum",
    body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: "https://picsum.photos/id/12/200/300",
  },
];

const Home = ({navigation}) => (
 

  <SafeAreaView style={styles.container}>
    <ScrollView>
   
    <View style={styles.logoAndCalendarPlace}>
    <View style={styles.logoSpace}>
       <Image
          style={styles.logo}
          source={require('../photos/birthday.png')}
          />
          <Text style={styles.heading}>
             Party like Never Before
            </Text>
    </View >
    <View style={styles.calendar} >
    <TouchableOpacity >
      <Image source={require('../photos/calendar.png')}  style={styles.calendarPhoto}/>
    </TouchableOpacity>
    </View>
    </View>
    {/* <View style={styles.content}> */}       
            <View style={styles.twoContents}>
                <View style={styles.secondPart}>   
                <TouchableOpacity onPress={() => navigation.navigate('Party')}>

                        <Text style={styles.secondTitle}>
                            Party
                          </Text>  
                          <Image
                            source={require('../photos/wedding.png')}
                            style={styles.mainImages}
                              />
                     </TouchableOpacity>             
               </View>   
                {/* here is the tags for birthay */}
                <View style={styles.secondPart}>
                <TouchableOpacity onPress={() => navigation.navigate('Birthday')}>
                    
                      <Text style={styles.secondTitle}>
                        Birthday
                      </Text>
                      <Image
                          source={require('../photos/birthday-cake.png')}
                          style={styles.mainImages}
                          />    
                </TouchableOpacity>
                </View>  
                      </View>
                      {/* Speical Reservation */}
 
                      <View style={styles.thirdPart}>
                        <Text style={styles.secondTitle}>
                         Offers
                        </Text>
                        {/* <Carousel
                              loop
                              width={width}
                              height={width / 2}
                              autoPlay={true}
                              data={[...new Array(6).keys()]}
                              scrollAnimationDuration={1000}
                              onSnapToItem={(index) => console.log('current index:', index)}
                              renderItem={({ index }) => (
                                  <View
                                      style={{
                                          flex: 1,
                                          borderWidth: 1,
                                          justifyContent: 'center',
                                      }}
                                  >
                                      <Text style={{ textAlign: 'center', fontSize: 30 }}>
                                          {index}
                                      </Text>
                                  </View>
                              )}
                          /> */}
                       </View>
 
                      {/* here is the tag for others */}
            
                        <View>
                          {/* <Text style={styles.secondTitle}>
                            Trending
                          </Text> */}
                        </View>
                        <View style={styles.trending}>
                  {/* birthday flatlist */}
                 
                  
                       </View>
                       {/* here goes offers */}


                       <View>
                          {/* <Text style={styles.secondTitle}>
                            Offers
                          </Text> */}
                        </View>
                        <View style={styles.trending}>
                  {/* birthday flatlist */}
                  <Text>Trending</Text>
                  <FlatList 
                    data={weddingSlider}
                    horizontal={true}
                    renderItem={({ item }) => (
                     <View style={styles.second}>  

                                      {/* <Image
                                            source={{ uri: item.image.uri }}
                                          style={styles.images}
                                            /> */}
                                            <Image
                                            source={require('../photos/1.png')}
                                            style={styles.images}
                                                />
                                                 <Text>{item.name}</Text>
                                      <Text>{item.rate}</Text>
                                      
                                    </View>
                                  )}
                                  keyExtractor={item => item.key}
                                />
                  
                       </View>



            {/* </View> */}
  {/* </View> */}
  </ScrollView>
  </SafeAreaView>
);

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"flex-start",
    //backgroundColor:'#f6437b',
    backgroundColor:'#ffff',
 
  },
  content:{
    // borderWidth:"1",
    // flexDirection:"row",
    opacity:"40"
  },
  logoAndCalendarPlace:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  mainImages:{
    width:"50%",
    height:"60%",
    marginLeft:"40%",
    marginTop:"10%"
  },
  images: {
    width: "90%",
    height: "50%",
    borderRadius: 10,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    margin:5,
    color:"white"
  },
  secondTitle:{
    fontSize:18,
    fontWeight:'600',
    marginLeft:10,
     color:"white"
  },
  secondPart:{ 
    backgroundColor: '#f6437b',
    margin:10,
    borderRadius:10,
    height:150,
    width:"40%"
  },
  thirdPart:{ 
    backgroundColor: '#f6437b',
    margin:10,
    borderRadius:10,
    height:200,
    width:"90%",
    marginLeft:"5%"
  },
  second:{
    backgroundColor: '#f6437b',
    margin:10,
    borderRadius:10,
    height:100,
    width:100,
    justifyContent:"center",
    alignItems:"center",
  },
  special:{
    margin:20
  },
  twoContents:{
    flexDirection:"row",
    justifyContent:"space-around"
  },
  trending:{
    //backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  logo:{
      width:200,
      height:100
  },
  logoSpace:{
    width:"50%"
  },
  calendar:{
    width:200,
    height:100,
   // backgroundColor:"white",
    borderRadius:5
},
calendarPhoto:{
  width:"50%",
  height:"100%",
  marginLeft:"40%"
},
 
});