import { View, Text, ActivityIndicator, Image } from "react-native";
import React from "react";
import { useLocalSearchParams, Link } from "expo-router";
import { Stack } from "expo-router";
import { Icons } from "@/components";
import { useGetPostDetailQuery } from "@/serviceFTECH";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function PostDetail() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { data, isLoading } = useGetPostDetailQuery(
    { id },
    {
      skip: !id,
    }
  );
  console.log(data);
  return (
    <>
      <Stack.Screen
        options={{
          title: "Tin tức",
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      <View style={{ paddingTop: insets.top }} className="p-3 bg-yellow-500  ">
        <View className="flex flex-row items-center justify-between gap-2 pt-2">
          <Link href="/news">
            <View className="flex flex-row items-center">
              <Icons.Ionicons name="arrow-back" size={24} color="white" />
              <Text className="text-white text-[16px] font-bold ml-2">
                Tin Tức PTCOCO
              </Text>
            </View>
          </Link>
        </View>
      </View>
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="small" color="#000" />
        </View>
      ) : (
        <View>
          <Image
            source={{
              uri: data.data?.image
                ? data.data?.image
                : "https://ftechwebsite.com/PTCOCO/wp-content/uploads/2024/11/86004bd119e9d07e376413ebace4373b-2883913672886655493.jpg",
            }}
            className="w-full h-[130px]"
          />
          <View className="p-3 ">
            <Text className="text-[16px] font-bold">{data.data?.title}</Text>
            <Text className="text-[14px] text-gray-500 mt-1">
              {data.data?.created_at}
            </Text>
            <Text className="text-[14px] text-gray-500 mt-1">
              {data.data?.content.replace(/<[^>]*>?/g, "") != ""
                ? data.data?.content.replace(/<[^>]*>?/g, "")
                : "Không có nội dung"}
            </Text>
          </View>
        </View>
      )}
    </>
  );
}
