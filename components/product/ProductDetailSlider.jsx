import React, { useState, useRef } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { height, width } = Dimensions.get("window");

const ProductDetailScreen = (props) => {
  const { imagesData } = props;
  const flatListRef = useRef(null);
  const scrollToSelectedImage = (index) => {
    flatListRef.current.scrollToIndex({ animated: true, index: index });
  };

  return (
    <View className="">
      <View className="mt-3 h-[257] justify-center">
        <FlatList
          ref={flatListRef}
          pagingEnabled
          horizontal
          data={imagesData}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="h-[250] w-[100vw] mr-4">
              <Image
                source={{ uri: item }}
                className="h-[250] rounded-lg"
                resizeMode="cover"
                style={{ width: width }}
              />
            </View>
          )}
        />
      </View>
      <View style={{}}>
        <FlatList
          horizontal
          data={imagesData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                width: width / 5,
                height: width / 5,
                marginRight: 10,
              }}
              className="rounded-lg"
              onPress={() => scrollToSelectedImage(index)}
            >
              <Image
                source={{ uri: item }}
                className="rounded-lg"
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default ProductDetailScreen;
