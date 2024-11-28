import React, { useState, useRef } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native";

import Icons from "@/components/common/Icons";
const { height, width } = Dimensions.get("window");

const ProductDetailScreen = (props) => {
  const { imagesData } = props;
  const flatListRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const scrollToSelectedImage = (index) => {
    flatListRef.current.scrollToIndex({ animated: true, index: index });
  };

  return (
    <View className="">
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.9)",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setModalVisible(false)}
        >
          <Image
            source={{ uri: selectedImage }}
            style={{
              width: width,
              height: height * 0.7,
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
      </Modal>

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
            <View className="relative">
              <TouchableOpacity
                className="h-[250] w-[100vw] mr-4"
                onPress={() => {
                  setSelectedImage(item);
                  setModalVisible(true);
                }}
              >
                <Image
                  source={{ uri: item }}
                  className="h-[250] rounded-lg"
                  resizeMode="cover"
                  style={{ width: width }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                className="absolute bottom-4 right-8 bg-white/50 p-2 rounded-full"
                onPress={() => {
                  setSelectedImage(item);
                  setModalVisible(true);
                }}
              >
                <Icons.AntDesign name="arrowsalt" size={20} color="black" />
              </TouchableOpacity>
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
