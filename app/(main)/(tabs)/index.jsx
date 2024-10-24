import { Stack } from "expo-router";
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
} from "@/components";

import { Link } from "expo-router";
import { productApiSlice, useGetFeedInfoQuery } from "@/services";
import { useGetHomeInfoQuery } from "@/serviceFTECH";
import { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { AntDesign } from "@expo/vector-icons";

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

  //Test Data FlagList
  const dataList = [
    {
      id: "215",
      uri: "https://s3-alpha-sig.figma.com/img/924e/6ada/ca44bad05d0f658b3726cc9b97824698?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jskFOSBXeuQOr7a6tN7BXIuWb7UuHtj-CyvONPnYt9NTQVRldACviFQdV1ALqodlXVJ8lYIjemzYREG9bYW2eJ-g0CidBhwu~iIMOpVoBUlOtWHaljekFPAK1vkMtBgS8LrZJVGtu-PX0MsNnzMiBXsZcbEJ~q3uOe~CD8TqNJDhTVA1UkoBqwfbGtkvFiCUnEDtWI5-1RtdBgXjAzU5LBr8cE4X54POqBuUnBChkjhZoHw-CZytScWy7poYXt2pSA4uEUHb-EbFE97fW6RivPhOs0-wjBt8xpxMX4-rh2gn~5~NzAuVJi-r5mK2QRz3H2PBMycmxoQWlqgfptdVpQ__",
      name: "Đơn vị thiết kế",
    },
    {
      id: "215",
      uri: "https://s3-alpha-sig.figma.com/img/a009/b318/0ab634fc1eb21e17fc56d0f4ede0d50e?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PiTJ7-bfUg4WC~yiDDDFngy-hui33Q~IEAk8hT-kS4peyYjvFvhibNawj~oUFp9bMCDgCm5jdsU8yrrXWtIaKUXhbuU2SnJ7WeZrMRRV9me5alNyPSYMx8c75~gZgXJrDBq4zRHkrqDNM5ZClXwXhFGscOzIhfObDERX2PyzeCqtgMOfiDLn6upuiRnOxXcy1Accw0UDVdjd~Zo6Lu49RT~~3hJHAH1RyeU76aBtwdd2oObpx2I7CMMqZ3Qsd1ni5moCrpyAXXfg77X7Wt2xouV9I2sIWRCnEcu0lcOCEHZIEhh1hlgGOq9jDyTYRDR78arwvLWpWLkVTAoiFEF~gA__",
      name: "Đơn vị thi công",
    },
    {
      id: "215",
      uri: "https://s3-alpha-sig.figma.com/img/81c2/43ac/38eab457a739c9fc2aa6739a682f8705?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qW12C9iAqCmldvVeLmGhUMNuEA1wncznGUawhX5HUiEKoVf9iBfY8RUrnY9SgEfy~JKiotm12Gz8kKr9TgK80wMXGHptzwY8lbkBzfj8ttyeler3glDknYTSyf3T64OGG3bzrGuuLXhYE1w2teJCsPdsF6ZQUlHvTy9Zuu8aLis8Ee6j1zTLxjgYFz~Q1zgLUGEsw~JvA1nx-62HZIBcNiWwsM1-ZRiNnd1lZfW8VCkzX5WaZL6GaQV7WjnQbnVir3SVG8Q0rBpEI2sZZNvUDSrnR3Dlu6ZYwqX0WWUAitDrlXtXx9WIy2SabL2sHbqT2eu69du5mN4HIW-b4Z5aqg__",
      name: "Đơn vị tư vấn giám sát",
    },
    {
      id: "215",
      name: "Đơn vị tư vấn giám sát",
      uri: "https://s3-alpha-sig.figma.com/img/a586/2a9a/07a8a0b9cb643a92657de56810e277bd?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Lre4K-JSexMgWepV3h2iYQLOTNs1KDeJNjEKhzRLgaZXAfQqIcd3LrRSOSU0wBI8iNpWDkg7EVMXgFKXl4zG~3MuU51E86OAg9ZATR5kf0vryXMPRoQ3szuvq4MQzHuFCzVdCI328fAh7SjW0ZEY7EHzdtqCqIOwzg-4EZou5cGrmt~GhLVsAUG37j5pSr2Z~W7rzxD4H0WvSkRzuMWj-8Yey0zzj9hb5xUfpuApNmTLHi5RDw3NAhv9mpRXCCteRr0l3OZq1Tk0W9NiqHc0rtycUy8UdAkMZIQwxsr~3ywQPxTqboC4jwL0cpl9feuh1PM0Oy39S2dlZJt2jdgVzg__",
    },
  ];

  const dataProduct = [
    {
      ID: "1",
      product_image:
        "https://ftechwebsite.com/PTCOCO/wp-content/uploads/2024/06/rz360x3001530080607a599img.jpg",
      product_name: "Đèn thả gỗ hiện đại",
      donvicungcap: "FTECH",
    },
    {
      ID: "1",
      product_image:
        "https://ftechwebsite.com/PTCOCO/wp-content/uploads/2024/06/rz360x3001530080607a599img.jpg",
      product_name: "Đèn thả gỗ hiện đại",
      donvicungcap: "FTECH",
    },
    {
      ID: "1",
      product_image:
        "https://ftechwebsite.com/PTCOCO/wp-content/uploads/2024/06/rz360x3001530080607a599img.jpg",
      product_name: "Đèn thả gỗ hiện đại",
      donvicungcap: "FTECH",
    },
    {
      ID: "1",
      product_image:
        "https://ftechwebsite.com/PTCOCO/wp-content/uploads/2024/06/rz360x3001530080607a599img.jpg",
      product_name: "Đèn thả gỗ hiện đại",
      donvicungcap: "FTECH",
    },
    {
      ID: "1",
      product_image:
        "https://ftechwebsite.com/PTCOCO/wp-content/uploads/2024/06/rz360x3001530080607a599img.jpg",
      product_name: "Đèn thả gỗ hiện đại",
      donvicungcap: "FTECH",
    },
    {
      ID: "1",
      product_image:
        "https://ftechwebsite.com/PTCOCO/wp-content/uploads/2024/06/rz360x3001530080607a599img.jpg",
      product_name: "Đèn thả gỗ hiện đại",
      donvicungcap: "FTECH",
    },
  ];

  const { width } = Dimensions.get("window"); // Lấy chiều rộng của màn hình

  const numColumns = 3; // Số lượng sản phẩm muốn hiển thị
  const itemWidth = width / numColumns; // Chiều rộng của mỗi item
  const gap = 2; // Khoảng cách giữa các item

  const numColumns2 = 2; // Số lượng sản phẩm muốn hiển thị
  const itemWidth2 = width / numColumns2; // Chiều rộng của mỗi item
  const gap2 = 11; // Khoảng cách giữa các item

  const renderItem = ({ item }) => (
    <Link
      href={{
        pathname: `/category`,
        params: {
          idCurent: item.id,
        },
      }}
      style={{ width: itemWidth - gap }}
    >
      <View className="flex  justify-center bg-[#fff] items-center  h-[100px]  p-5  rounded-full border-black">
        <Image
          source={{ uri: item.uri }}
          className="w-[50px] h-[50px] rounded-full" // Bạn có thể tùy chỉnh kích thước hình ảnh tại đây
        />
        <Text className="text-center mt-2 text-16">
          Đơn vị thi công ngoại thất
        </Text>
      </View>
    </Link>
  );
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
            <View className="">
              <View className="flex-row justify-between mt-4 mb-8">
                <View>
                  <Text className="text-base font-bold">Danh mục sản phẩm</Text>
                </View>
                <TouchableOpacity>
                  <Text className="{13} underline">Xem tất cả</Text>
                </TouchableOpacity>
              </View>
              <View>
                <ScrollView>
                  <FlatList
                    data={dataList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                      paddingBottom: 25,
                      marginLeft: -20,
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  />
                </ScrollView>
              </View>
            </View>

            {/* <FlashList
              data={dataProduct}
              renderItem={({ item }) => (
                <Link
                  className="mx-1"
                  style={{ width: itemWidth2 - gap2 }}
                  href={{
                    pathname: `/products/${item.ID}`,
                  }}
                  key={item.id}
                  asChild
                >
                  <TouchableOpacity className="overflow-hidden">
                    <Image
                      source={{
                        uri: item?.product_image,
                      }}
                      className="w-[100%] h-[212px] object-cover  z-50 rounded-lg"
                    />
                    <View className="h-[50px]">
                      <Text
                        numberOfLines={1}
                        className="text-[14px] font-[400] leading-5 pt-1"
                      >
                        {item?.product_name}
                      </Text>
                      <Text className="text-[10px] text-[#FF4405]">
                        Tư vấn trực tiếp
                      </Text>
                      <View className="flex flex-row my-1">
                        <Text className="text-[#808080] mr-1 line-through">
                          1.690.000 đ
                        </Text>
                        <Text className="text-[#FF4405] mr-1 text-[15px] font-bold">
                          1.490.000 đ
                        </Text>
                      </View>
                    </View>
                    <View className="mt-3 pt-1 border-t-[1px] border-[#F0F1F1] ">
                      <Text className="text-[14px] font-[400] leading-5 text-[#FF4405] font-bold">
                        {item?.donvicungcap}

                      </Text>
                      <Text className="text-[#808080]">38 sản phẩm </Text>
                    </View>
                  </TouchableOpacity>
                </Link>
              )}
              horizontal
              estimatedItemSize={200}
            /> */}

            <FtechDiscountSlider
              className="mt-2 mb-2"
              products={onSale}
              title="Đang giảm giá"
            />

            <BannerOneFtech
              className="mt-2 mb-2"
              data={
                topic.filter((item) => item.data[0].layout == "slide")[0]
                  ?.data[0]?.dataChude
              }
            />
            <BestSellsSliderFtech
              data={hot.dataproduct}
              className="mt-2 mb-2"
            />
            <BannerTwoFtech
              className="mt-2 mb-2"
              data={
                topic.filter((item) => item.data[0].layout == "grid")[0]
                  ?.data[0]?.dataChude
              }
            />
            <MostFavoriteProductsFtech
              products={normal.dataproduct}
              className="mt-2 mb-2"
            />
          </>
        </ScrollView>
      </ShowWrapper>
    </>
  );
}
