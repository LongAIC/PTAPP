import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

import Icons from "./common/Icons";

export default function Search(props) {
  const { category } = props;

  //? Handlers
  const handleSearch = () => {
    router.push("/search");
  };

  //? Render(s)
  return (
    <TouchableOpacity
      onPress={handleSearch}
      className="flex flex-row rounded-md bg-white justify-between items-center  p-1 w-[86%]"
    >
      <Icons.EvilIcons name="search" size={24} color="#1F2937" />
      <Text className="flex-grow w-full py-1 px-3 text-left bg-transparent outline-none cursor-pointer text-gray-400 focus:border-none">
        {category ? "Danh mục: " + category : "Tìm kiếm sản phẩm ..."}
      </Text>
    </TouchableOpacity>
  );
}
