import { FlashList } from "@shopify/flash-list";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";

import {
  DiscountProduct,
  EmptySearchList,
  Icons,
  ListProducts,
  ProductPrice,
  ResponsiveImage,
  ShowWrapper,
} from "@/components";
import { useDebounce } from "@/hooks";
import { useGetProductQuery } from "@/serviceFTECH";

import { truncate } from "@/utils";

export default function SerachScreen() {
  //? Props

  //? States
  const [key, setKey] = useState("");
  const [page, setPage] = useState(1);

  //? Assets

  //? Search Products Query
  const { data, error, isError, isFetching, isSuccess, refetch } =
    useGetProductQuery({
      key,
    });

  //? Handlers
  const handleChange = (value) => {
    setKey(value);
  };

  // const onEndReachedThreshold = () => {
  //   if (!hasNextPage) return;
  //   setPage(Number(page) + 1);
  // };

  const handleRemoveSearch = () => {
    setKey("");
  };
  //? Render(s)

  return (
    <>
      <Stack.Screen
        options={{
          title: "Tìm kiếm",
          headerBackTitleVisible: false,
          headerTintColor: "black",
          headerBackTitleStyle: {
            color: "black",
          },
        }}
      />
      <View className="flex flex-col h-full  bg-white  pt-3 px-2">
        <View className="flex flex-row items-center rounded-md bg-zinc-200/80 ">
          <View className="p-2  ">
            <Icons.EvilIcons name="search" size={24} color="#1F2937" />
          </View>
          <TextInput
            className="flex-grow p-2 text-left bg-transparent outline-none input focus:border-none"
            type="text"
            value={key}
            placeholder="Tìm kiếm sản phẩm"
            onChangeText={handleChange}
          />
          <Pressable type="button" className="p-2" onPress={handleRemoveSearch}>
            <Icons.AntDesign
              name="close"
              size={14}
              className="icon text-gray-500"
            />
          </Pressable>
        </View>
        <View className="flex-1 ">
          <ShowWrapper
            error={error}
            isError={isError}
            refetch={refetch}
            isFetching={isFetching}
            isSuccess={isSuccess}
            dataLength={data ? data?.data.length : 0}
            emptyComponent={<EmptySearchList />}
            type="list"
          >
            <View className="h-full w-full">
              {data?.data?.length &&
                data?.data?.length > 0 &&
                key.length > 0 && (
                  <View className="flex-1">
                    <Text className="font-semibold text-base ml-5 mt-4">Kết quả tìm kiếm cho "{key}"</Text>
                    <ListProducts
                      className="mt-2 "
                      products={data.data}
                      
                    />
                  </View>
                )}
            </View>
          </ShowWrapper>
        </View>
      </View>
    </>
  );
}
