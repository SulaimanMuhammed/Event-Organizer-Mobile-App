// Page1.js

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const Planner= () => (
  <View style={styles.container}>
    <Text>Page 2</Text>
  </View>
);

export default Planner
