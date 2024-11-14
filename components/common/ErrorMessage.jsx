import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text, StyleSheet, View} from 'react-native';

export default function ErrorMessage({errorText}) {
  return (
    <View style={styles.errorContainer}>
      <MaterialIcons name={'error'} style={styles.errorIcon} />
      <Text style={styles.errorText}>{errorText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    display: 'relative',
    flexDirection: 'row',
    marginTop: 5
  },
  errorIcon: {
    fontSize: 14,
    color: 'red',
    textAlign: 'left',
    marginRight: 5,
    alignSelf: 'center'
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    textAlign: 'left',
    marginRight: 10,
  },
});