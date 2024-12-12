import { View, Text, Image, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import Icons from "@/components/common/Icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";

const categories = [
  {
    id: 1,
    name: "Thời trang nam",
    image:
      "https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b",
  },
  {
    id: 2,
    name: "Thời trang nữ",
    image:
      "https://down-vn.img.susercontent.com/file/75ea42f9eca124e9cb3cde744c060e4d",
  },
  {
    id: 3,
    name: "Điện thoại",
    image:
      "https://down-vn.img.susercontent.com/file/31234a27876fb89cd522d7e3db1ba5ca",
  },
  {
    id: 4,
    name: "Thiết bị điện tử",
    image:
      "https://down-vn.img.susercontent.com/file/978b9e4cb61c611aaaf58664fae133c5",
  },
  {
    id: 5,
    name: "Máy tính & Laptop",
    image:
      "https://down-vn.img.susercontent.com/file/c3f3edfaa9f6dafc4825b77d8449999d",
  },
  {
    id: 6,
    name: "Đồng hồ",
    image:
      "https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260",
  },
];

const step2 = () => {
  const insets = useSafeAreaInsets();
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }}></Stack.Screen>
      <View style={{ paddingTop: insets.top }} className="p-3 bg-white">
        <View className="flex flex-row items-center justify-between gap-2 pt-2">
          <Link href="/stepRegisterStore/step1">
            <View className="flex flex-row items-center">
              <Icons.Ionicons name="arrow-back" size={20} color="black" />
              <Text className="text-black text-[16px] font-medium ml-2">
                Bước 2 trên 4
              </Text>
            </View>
          </Link>
        </View>
      </View>
      <View className="flex h-full bg-white px-3 pt-4">
        <View className="flex flex-col gap-2">
          <Text className="text-[24px] font-[500] pb-2">
            Lựa chọn loại hàng hóa của bạn
          </Text>
          <Text className="text-[14px] text-[#757575]">
            Bạn cần lựa chọn ngành hàng bạn kinh doanh bằng cách lựa chọn các ô
            dưới đây !
          </Text>
        </View>
        <ScrollView className="flex-1 mt-4">
          <View className="flex-row flex-wrap justify-between">
            {categories.map((category) => (
              <View className="w-[30%] mb-4" key={category.id}>
                <TouchableOpacity
                  className={`border rounded-lg p-2 ${
                    selectedCategory === category.id
                      ? "border-yellow-500"
                      : "border-gray-200"
                  }`}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Image
                    source={{ uri: category.image }}
                    className="w-full h-[80px] rounded-lg"
                    resizeMode="cover"
                  />
                  <Text className="text-center mt-2 text-[12px]">
                    {category.name}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View className="flex flex-row items-center justify-center w-full mt-4 bg-yellow-500 rounded-[60px]">
            <Link href="/stepRegisterStore/step3">
              <TouchableOpacity className="bg-yellow-500 rounded-[60px] px-2 py-4 w-full">
                <Text className="text-[14px] text-[#fff] font-[500] text-center w-full">
                  Tiếp tục
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default step2;
