import { View, Text, Image, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import Icons from "@/components/common/Icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetCategoryStoreRegisterQuery } from "@/serviceFTECH/product.service";

const step2 = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [registerStoreData, setRegisterStoreData] = useState(null);
  const { data, isLoading, isError } = useGetCategoryStoreRegisterQuery();
  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem("registerStoreData");
      setRegisterStoreData(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const gotoStep3 = async () => {
    try {
      const existingData = await AsyncStorage.getItem("registerStoreData");
      const parsedData = JSON.parse(existingData);
      const updatedData = {
        ...parsedData,
        categories: selectedCategories,
      };
      await AsyncStorage.setItem(
        "registerStoreData",
        JSON.stringify(updatedData)
      );
      router.push("/stepRegisterStore/step3");
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
    }
  };

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
      <ScrollView className="flex h-full bg-white px-3 pt-4">
        <View className="flex flex-col gap-2">
          <Text className="text-[24px] font-[500] pb-2">
            Lựa chọn loại hàng hóa của bạn
          </Text>
          <Text className="text-[14px] text-[#757575]">
            Bạn cần lựa chọn ngành hàng bạn kinh doanh bằng cách lựa chọn các ô
            dưới đây !
          </Text>
        </View>
        {data?.data?.length > 0 ? (
          <View className="flex-1 mt-4">
            <View className="flex-row flex-wrap justify-between">
              {data?.data?.map((category) => (
                <View className="w-[24%] mb-2" key={category.id}>
                  <TouchableOpacity
                    className={`flex flex-col items-center justify-center border rounded-lg p-2 ${
                      selectedCategories.includes(category.id)
                        ? "border-yellow-500"
                        : "border-gray-200"
                    }`}
                    onPress={() => toggleCategory(category.id)}
                  >
                    <Image
                      source={{ uri: category.image }}
                      className="w-[50px] h-[50px] rounded-[100px]"
                      resizeMode="cover"
                    />
                    <Text className="text-center mt-2 text-[12px]">
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <View
              className={`flex flex-row items-center justify-center w-full mt-4 rounded-[60px] ${selectedCategories.length > 0 ? "bg-yellow-500" : "bg-gray-300"}`}
            >
              {selectedCategories.length > 0 ? (
                <TouchableOpacity
                  className="bg-yellow-500 rounded-[60px] px-2 py-4 w-full"
                  onPress={() => {
                    gotoStep3();
                  }}
                >
                  <Text className="text-[14px] text-[#fff] font-[500] text-center w-full">
                    Tiếp tục
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    gotoStep3();
                  }}
                  className="bg-gray-300 rounded-[60px] px-2 py-4 w-full"
                  disabled
                >
                  <Text className="text-[14px] text-[#fff] font-[500] text-center w-full">
                    Tiếp tục
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
    </>
  );
};

export default step2;
