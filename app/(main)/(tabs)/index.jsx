import { Stack, useRouter } from "expo-router";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import {
  BannerOneFtech,
  BannerTwoFtech,
  BestSellsSliderFtech,
  Categories,
  DiscountSlider,
  Slider as MainSlider,
  MostFavoriteProductsFtech,
  FeedHeader,
  ShowWrapper,
  FtechDiscountSlider,
  CategoriesProduct,
  Icons,
} from "@/components";

import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { useGetHomeInfoQuery } from "@/serviceFTECH";
import { useState } from "react";

export default function FeedScreen() {
  const router = useRouter();
  const {
    data: dataHomePage,
    error,
    isError,
    isFetching,
    isSuccess,
    refetch,
  } = useGetHomeInfoQuery();

  const sliders =
    dataHomePage?.data?.length > 0
      ? dataHomePage.data
          .filter((item) => item.layoutName === "slide_home")[0]
          ?.data[0].map((item) => ({
            isPublic: true,
            image: {
              url: item.anh_slide,
              link: item.link,
            },
          }))
      : [];
  const onSale =
    dataHomePage?.data?.length > 0
      ? dataHomePage.data.filter(
          (item) =>
            item.layoutName === "sp_hot" && item.data[0].type == "onsale"
        )[0]?.data[0]?.dataproduct
      : [];

  const topic =
    dataHomePage?.data?.length > 0
      ? dataHomePage.data.filter((item) => item.layoutName === "chu_de_homnay")
      : [];

  const hot =
    dataHomePage?.data?.length > 0
      ? dataHomePage.data.filter(
          (item) => item.layoutName === "sp_hot" && item.data[0].type == "hot"
        )[0]?.data[0]
      : [];

  const normal =
    dataHomePage?.data?.length > 0
      ? dataHomePage.data.filter(
          (item) =>
            item.layoutName === "sp_hot" && item.data[0].type == "normal"
        )[0]?.data[0]
      : [];

  const dm_sp =
    dataHomePage?.data?.length > 0
      ? dataHomePage.data.filter((item) => item.layoutName === "dm_sp")[0]
          ?.data[0]
      : [];

  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => (
            <FeedHeader {...props} title="Home" icon="menu-outline" />
          ),
        }}
      />
      <ShowWrapper
        error={error}
        isError={isError}
        refetch={refetch}
        isFetching={isFetching}
        isSuccess={isSuccess}
        type="detail"
      >
        <ScrollView className="bg-[#f4f4f4] flex h-full">
          <MainSlider data={sliders} className="bg-white " />

          {/* //List các dịnh vụ */}

          <View className="pt-3 bg-white">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={{ paddingBottom: 13 }}
            >
              <View className="flex flex-row px-4 space-x-8">
                <View className="items-center">
                  <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
                    <Image
                      source={require("@/assets/images/live2.png")}
                      className="w-6 h-6"
                    />
                  </View>
                  <Text className="text-xs mt-1">Khuyến mãi</Text>
                </View>

                <View className="items-center">
                  <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
                    <Image
                      source={require("@/assets/images/live.png")}
                      className="w-6 h-6"
                    />
                  </View>
                  <Text className="text-xs mt-1">Mã giảm giá</Text>
                </View>

                <View className="items-center">
                  <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
                    <Image
                      source={require("@/assets/images/banhang.png")}
                      className="w-6 h-6"
                    />
                  </View>
                  <Text className="text-xs mt-1">Freeship</Text>
                </View>

                <View className="items-center">
                  <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
                    <Image
                      source={require("@/assets/images/pro.png")}
                      className="w-6 h-6"
                    />
                  </View>
                  <Text className="text-xs mt-1">Ưu đãi</Text>
                </View>
                <View className="items-center">
                  <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
                    <Image
                      source={require("@/assets/images/live2.png")}
                      className="w-6 h-6"
                    />
                  </View>
                  <Text className="text-xs mt-1">Khuyến mãi</Text>
                </View>

                <View className="items-center">
                  <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
                    <Image
                      source={require("@/assets/images/live.png")}
                      className="w-6 h-6"
                    />
                  </View>
                  <Text className="text-xs mt-1">Mã giảm giá</Text>
                </View>

                <View className="items-center">
                  <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
                    <Image
                      source={require("@/assets/images/banhang.png")}
                      className="w-6 h-6"
                    />
                  </View>
                  <Text className="text-xs mt-1">Freeship</Text>
                </View>

                <View className="items-center">
                  <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
                    <Image
                      source={require("@/assets/images/pro.png")}
                      className="w-6 h-6"
                    />
                  </View>
                  <Text className="text-xs mt-1">Ưu đãi</Text>
                </View>
              </View>
            </ScrollView>
          </View>

          <View className="px-3 mt-2 bg-white">
            <CategoriesProduct data={dm_sp} />
          </View>

          <View className="px-3 py-3 bg-white mt-2">
            <BannerTwoFtech
              className="mt-2 mb-2"
              data={
                topic.filter((item) => item.data[0].layout == "grid")[0]
                  ?.data[0]?.dataChude
              }
            />
          </View>

          {/* <View className="px-3 py-3 bg-white mt-2">
            <BannerOneFtech
              className="mt-2 mb-2"
              data={
                topic.filter((item) => item.data[0].layout == "slide")[0]
                  ?.data[0]?.dataChude
              }
            />
          </View> */}

          {/* <FtechDiscountSlider
            className="mt-2 mb-2"
            products={onSale}
            title="Đang giảm giá"
            showMore
          /> */}
          {/* <BestSellsSliderFtech data={hot.dataproduct} className="mt-2 mb-2" /> */}
          <View className="px-3 py-3 bg-white mt-2">
            <MostFavoriteProductsFtech
              products={normal?.dataproduct}
              className="mt-2 mb-2"
            />
          </View>
        </ScrollView>
      </ShowWrapper>
    </>
  );
}
