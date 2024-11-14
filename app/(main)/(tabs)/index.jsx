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
        <ScrollView className="bg-white flex h-full px-3 ">
          <MainSlider data={sliders} />

          <CategoriesProduct data={dm_sp} />

          <FtechDiscountSlider
            className="mt-2 mb-2"
            products={onSale}
            title="Đang giảm giá"
            showMore
          />

          <BannerOneFtech
            className="mt-2 mb-2"
            data={
              topic.filter((item) => item.data[0].layout == "slide")[0]?.data[0]
                ?.dataChude
            }
          />
          <BestSellsSliderFtech data={hot.dataproduct} className="mt-2 mb-2" />
          <BannerTwoFtech
            className="mt-2 mb-2"
            data={
              topic.filter((item) => item.data[0].layout == "grid")[0]?.data[0]
                ?.dataChude
            }
          />
          <MostFavoriteProductsFtech
            products={normal.dataproduct}
            className="mt-2 mb-2"
          />
        </ScrollView>
      </ShowWrapper>
    </>
  );
}
