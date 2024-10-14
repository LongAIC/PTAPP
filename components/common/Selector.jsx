import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const CategorySelector = (props) => {
  const [selectedCategory, setSelectedCategory] = useState();
  const { categories, title } = props;

  return (
    <View className="mt-4 ">
      <Text className="text-base font-medium mb-4">{title}</Text>
      <View className="flex-row flex-wrap">
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            className="px-4 py-2 mr-2 rounded-lg border mb-3 "
            style={selectedCategory === category ? {backgroundColor: '#1A1A1A'} : {backgroundColor: '#fff'}  }
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              className=" text-base"
              style={selectedCategory === category ? {color: 'white'} : {color: 'black'}}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CategorySelector;
