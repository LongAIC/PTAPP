import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function CategorySelector(props) {
  const { categories, selectedCategory, onSelectCategory, title } = props;
  const handlePress = (category) => {
    onSelectCategory(category); 
  };

  return (
    <View className=" ">
      {title && <Text className="text-base font-medium mb-4">{title}</Text>}
      <View className="flex-row flex-wrap items-center">
        {categories.map((category, index) => (
          <TouchableOpacity
            key={category}
            className="px-4 py-2 mr-2 rounded-lg border mb-3 "
            style={
              selectedCategory === category
                ? { backgroundColor: "#1A1A1A" }
                : { backgroundColor: "#fff" }
            }
            onPress={() => handlePress(category)}
          >
            <Text
              className=" text-sm"
              style={
                selectedCategory === category
                  ? { color: "white" }
                  : { color: "black" }
              }
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
