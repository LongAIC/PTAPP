import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Pressable,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import Icons from "@/components/common/Icons";
import { useGetPostQuery } from "@/serviceFTECH";
export default function newsPage() {
  const insets = useSafeAreaInsets();
  const { data, isLoading } = useGetPostQuery({ limit: 10 });

  return (
    <>
      <View style={{ paddingTop: insets.top }} className="p-3 bg-yellow-500  ">
        <View className="flex flex-row items-center justify-between gap-2 pt-2">
          <Link href="/">
            <View className="flex flex-row items-center">
              <Icons.Ionicons name="arrow-back" size={24} color="white" />
              <Text className="text-white text-[16px] font-bold ml-2">
                Tin Tức PTCOCO
              </Text>
            </View>
          </Link>
        </View>
      </View>
      <ScrollView className="flex-1 bg-[#fff] mt-2 pb-3">
        <View className="flex flex-row items-center justify-between gap-2 ">
          <View className="flex flex-row items-center bg-white w-full pt-3 py-2">
            <Text className="text-[16px] font-bold ml-2">Tin tức</Text>
          </View>
        </View>
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          <View className="flex-row flex-wrap justify-between px-2 bg-white">
            {data?.data?.map((item) => (
              <Link href={`/posts/${item.id}`} key={item.id} asChild>
                <TouchableOpacity className="bg-white mb-2 w-[49%] border border-gray-200 rounded-[8px]">
                  <View className="flex flex-col items-center">
                    <Image
                      source={{
                        uri: item.image
                          ? item.image
                          : "https://ftechwebsite.com/PTCOCO/wp-content/uploads/2024/11/86004bd119e9d07e376413ebace4373b-2883913672886655493.jpg",
                      }}
                      className="w-full h-[100px] object-cover"
                    />
                    <View className="w-full p-2">
                      <Text
                        className="text-[13px] font-bold text-left"
                        numberOfLines={2}
                      >
                        {item.title}
                      </Text>
                      <Text className="text-gray-500 text-[12px] mt-1 text-left">
                        {item.date}
                      </Text>
                      <Text
                        className="text-gray-600 text-[14px] mt-1 text-left"
                        numberOfLines={2}
                      >
                        {item.description
                          ? item.description
                          : "Chưa có nội dung "}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        )}
      </ScrollView>
    </>
  );
}
