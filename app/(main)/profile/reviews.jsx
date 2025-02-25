import { FlashList } from "@shopify/flash-list";
import { Stack } from "expo-router";
import { useState } from "react";
import { ScrollView, View, SafeAreaView, FlatList, Text } from "react-native";

import {
  ReveiwCard,
  ShowWrapper,
  EmptyCommentsList,
  ReveiwSkeleton,
  Icons
} from "@/components";
import { useGetReviewsQuery } from "@/services";

const ReviewsScreen = () => {
  //? Assets
  const reviews = [
    {
      id: "1",
      username: "Phụng Lê",
      rating: 5,
      comment:
        "Ứng dụng của bạn giúp tôi nhìn nhận vấn đề ô nhiễm môi trường là vấn đề đáng báo động tại Việt Nam. Cảm ơn các bạn rất nhiều!",
      time: "3h ago",
    },
    {
      id: "2",
      username: "Dennis Lau",
      rating: 5,
      comment: "Good app.",
      time: "3h ago",
    },
    {
      id: "3",
      username: "Karina789",
      rating: 5,
      comment: "Rất hữu ích!",
      time: "3h ago",
    },
    {
      id: "4",
      username: "phạm mai",
      rating: 5,
      comment: "Rat tot 🏃🏻‍♂️🏃🏻‍♂️",
      time: "3h ago",
    },
  ];
  //? Render(s)
  return (
    <>
      <Stack.Screen
        options={{
          title: "Bình luận của tôi",
          headerBackTitleVisible: false,
        }}
      />
      <SafeAreaView className="flex-1 bg-gray-100 p-4">
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-white p-4 mb-3 rounded-lg shadow-md">
              <View className="flex-row justify-between items-center">
                <Text className="font-bold text-base">{item.username}</Text>
                <Text className="text-gray-500 text-xs">{item.time}</Text>
              </View>
              <View className="flex-row my-1">
                {[...Array(item.rating)].map((_, index) => (
                  <Icons.FontAwesome
                    key={index}
                    name="star"
                    size={16}
                    color="#FFD700"
                  />
                ))}
              </View>
              <Text className="text-gray-700 mt-2">{item.comment}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
};

export default ReviewsScreen;
