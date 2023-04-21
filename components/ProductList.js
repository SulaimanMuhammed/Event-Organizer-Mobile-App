import React, { Component } from 'react';
import { View, SafeAreaView, Text, FlatList, Image, TouchableOpacity } from 'react-native';

class ProductList extends Component {
  state = {
    activeCategoryIndex: 0,
  };

  handleCategoryPress = (index) => {
    this.setState({ activeCategoryIndex: index });
    this.flatListRef.scrollToIndex({ index, animated: true });
  };

  handleProductPress = (item) => {
    // handle product press event here
  };

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.handleProductPress(item)}>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
          <Image source={item.source} style={{ width: 50, height: 50, marginRight: 10 }} />
          <View>
            <Text style={{ fontSize: 16 }}>{item.name}</Text>
            <Text style={{ fontSize: 12, color: 'gray' }}>{item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderCategoryItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => this.handleCategoryPress(index)}
        style={{ backgroundColor: index === this.state.activeCategoryIndex ? 'gray' : 'white', padding: 10 }}
      >
        <Text style={{ fontSize: 16, color: index === this.state.activeCategoryIndex ? 'white' : 'black' }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, }}>
        <FlatList
          ref={(ref) => {
            this.flatListRef = ref;
          }}
          data={this.props.data}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
            this.setState({ activeCategoryIndex: index });
          }}
        />
        <FlatList
          data={this.props.data}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={{ flex: 1 }}
        />
        <FlatList
          data={this.props.data}
          renderItem={this.renderCategoryItem}
          keyExtractor={(item) => item.name}
          style={{ width: 100, backgroundColor: 'white' }}
        />
      </SafeAreaView>
    );
  }
}

export default ProductList;
