import { Stack } from "expo-router";
import { ScrollView } from "react-native";
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
} from "@/components";

import { Link } from "expo-router";
import { useGetFeedInfoQuery } from "@/services";
import { useGetHomeInfoQuery } from "@/serviceFTECH";
import { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";

export default function FeedScreen() {
  //? Assets
  const [data, setData] = useState(null);

  const dataHomePage = ({
    data: {},
    isLoading,
    isSuccess,
    isFetching,
    error,
    isError,
    refetch,
  } = useGetHomeInfoQuery(
    {},
    {
      selectFromResult: ({ data, ...args }) => ({
        data: data?.data || {},
        ...args,
      }),
    }
  ));

  const sliders =
    dataHomePage.data.length > 0
      ? dataHomePage.data
          .filter((item) => {
            return item.layoutName === "slide_home";
          })[0]
          .data[0].map((item) => ({
            isPublic: true,
            image: {
              url: item.anh_slide,
              link: item.link,
            },
          }))
      : [];
  const onSale =
    dataHomePage.data.length > 0
      ? dataHomePage.data.filter((item) => {
          return item.layoutName === "sp_hot" && item.data[0].type == "onsale";
        })[0].data[0].dataproduct
      : [];

  const topic =
    dataHomePage.data.length > 0
      ? dataHomePage.data.filter((item) => {
          return item.layoutName === "chu_de_homnay";
        })
      : [];

  const hot =
    dataHomePage.data.length > 0
      ? dataHomePage.data.filter((item) => {
          return item.layoutName === "sp_hot" && item.data[0].type == "hot";
        })[0].data[0]
      : [];

  const normal =
    dataHomePage.data.length > 0
      ? dataHomePage.data.filter((item) => {
          return item.layoutName === "sp_hot" && item.data[0].type == "normal";
        })[0].data[0]
      : [];

  //? Render(s)
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
        <ScrollView className="bg-white flex h-full px-3">
          <>
            {/* <MainSlider data={sliders} />
            <Categories
              childCategories={{
                categories: childCategories,
                title: "Tất cả danh mục",
              }}
              color={currentCategory?.colors?.start}
              name={currentCategory?.name}
              homePage
            />
            <DiscountSlider currentCategory={currentCategory} />
            <BannerOne data={bannerOneType} />
            <BestSellsSlider categorySlug={currentCategory?.slug} />
            <BannerTwo data={bannerTwoType} />
            <MostFavouraiteProducts categorySlug={currentCategory?.slug} /> */}

            {/* ------------------------------------------------------------------------------------- */}

            <MainSlider data={sliders} />
            <Categories
              childCategories={{
                categories: childCategories,
                title: "Tất cả danh mục",
              }}
              color={currentCategory?.colors?.start}
              name={currentCategory?.name}
              homePage
            />
            <FtechDiscountSlider products={onSale} />
            <BannerOneFtech
              data={
                topic.filter((item) => item.data[0].layout == "slide")[0]
                  ?.data[0]?.dataChude
              }
            />
            <BestSellsSliderFtech data={hot.dataproduct} />
            <BannerTwoFtech
              data={
                topic.filter((item) => item.data[0].layout == "grid")[0]
                  ?.data[0]?.dataChude
              }
            />
            <MostFavoriteProductsFtech products={normal.dataproduct} />
          </>
        </ScrollView>
      </ShowWrapper>
    </>
  );
}
