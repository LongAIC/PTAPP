import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Text, StyleSheet, View} from 'react-native';

export default function Message({messageText}) {
  return (
    <View style={styles.errorContainer}>
      <AntDesign name={'checkcircle'} style={styles.errorIcon} />
      <Text style={styles.errorText}>{messageText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    display: 'relative',
    flexDirection: 'row',
    marginTop: 5,
  },
  errorIcon: {
    fontSize: 14,
    color: 'green',
    textAlign: 'left',
    marginRight: 5,
    alignSelf: 'center',
  },
  errorText: {
    fontSize: 14,
    color: 'green',
    textAlign: 'left',
    marginRight: 10,
  },
});
