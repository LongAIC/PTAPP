import { Stack, useLocalSearchParams, Link } from "expo-router";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useEffect } from "react";
import { FlashList } from "@shopify/flash-list";
import React, { useState, useCallback, useMemo, useRef } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Overlay } from "react-native-elements";

import {
  Filter,
  ProductCard,
  ProductSkeleton,
  Sort,
  SubCategories,
  ListProducts,
  FeedHeader,
  Icons,
  RangeSlider,
} from "@/components";
import { useChangeRoute } from "@/hooks";
import {
  useGetProductscatQuery,
  useGetChildCategoryQuery,
} from "@/serviceFTECH";
import { store } from "@/store";
export default function ProductsScreen() {
  const params = useLocalSearchParams();
  const MIN_DEFAULT = 0;
  const MAX_DEFAULT = 2000000;
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [showProvinces, setShowProvinces] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [isOpenSheetLocation, setIsOpenSheetLocation] = useState(false);
  const [isOpenSheetPrice, setIsOpenSheetPrice] = useState(false);
  const [isOpenSheetRating, setIsOpenSheetRating] = useState(false);
  const [sortType, setSortType] = useState(null);

  const id = params?.idCat?.toString() ?? "";
  const limit = parseInt(params?.limit?.toString() ?? 10); // Chuyển limit thành số
  const page = parseInt(params?.page?.toString() ?? 0); // Chuyển page thành số
  const provinceName = params?.provinceName?.toString();
  const minPrice = params?.minPrice;
  const maxPrice = params?.maxPrice;
  const rating = params?.rating?.toString();

  const [dataProduct, setDataProduct] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [minValue, setMinValue] = useState(MIN_DEFAULT);
  const [maxValue, setMaxValue] = useState(MAX_DEFAULT);

  const [banchaySort, setBanchaySort] = useState(false);
  const [moiSort, setMoiSort] = useState(false);
  const [ratingSort, setRatingSort] = useState(false);
  const [giaSort, setGiaSort] = useState(false);

  const [productData, setProductData] = useState([]);

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const bottomSheetRef = useRef(null);

  const sortByDate = (data) => {
    if (!Array.isArray(data) || data.length === 0) return [];

    return [...data].sort((a, b) => {
      if (!a.date || !b.date) return 0;

      try {
        const [dayA, monthA, yearA] = a.date.split("/");
        const [dayB, monthB, yearB] = b.date.split("/");

        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);

        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) return 0;

        return dateB - dateA;
      } catch (error) {
        console.warn("Error sorting dates:", error);
        return 0;
      }
    });
  };

  

  const sortByRating = (data) => {
    if (!Array.isArray(data) || data.length === 0) return [];

    return [...data].sort((a, b) => {
      const ratingA = parseFloat(a.rating) || 0;
      const ratingB = parseFloat(b.rating) || 0;
      return ratingB - ratingA;
    });
  };

  const sortByPrice = (data) => {
    if (!Array.isArray(data) || data.length === 0) return [];

    return [...data].sort((a, b) => {
      const priceA = a.price
        ? parseFloat(a.price.replace(/[^0-9.-]+/g, ""))
        : 0;
      const priceB = b.price
        ? parseFloat(b.price.replace(/[^0-9.-]+/g, ""))
        : 0;
      return priceB - priceA;
    });
  };

  const handleSort = (type) => {
    if (sortType === type) {
      setSortType(null);
      setDataProduct(data);
      return;
    }

    setSortType(type);
    switch (type) {
      case "date":
        setDataProduct(sortByDate(dataProduct));
        break;
      case "rating":
        setDataProduct(sortByRating(dataProduct));
        break;
      case "price":
        setDataProduct(sortByPrice(dataProduct));
        break;
      default:
        setDataProduct(data);
    }
  };

  useEffect(() => {
    if (sortType) {
      handleSort(sortType);
    } else {
      setDataProduct(data);
    }
  }, [data]);

  const handleSheetChanges = useCallback((index) => {
    setIsOpenSheet(index !== -1);
  }, []);

  const { width } = Dimensions.get("window");
  // Chiều rộng của mỗi item khi hiển thị dạng list
  const itemWidth = width - 20;

  useEffect(() => {
    setSelectedProvince(provinceName);
    setSelectedRating(rating);
    setMinValue(minPrice ? minPrice : MIN_DEFAULT);
    setMaxValue(maxPrice ? maxPrice : MAX_DEFAULT);
  }, [provinceName, rating, minPrice, maxPrice]);

  const {
    data,
    hasNextPage,
    count,
    isFetching: isFetchingProduct,
  } = useGetProductscatQuery(
    {
      id,
      limit,
      page,
      tinhthanh: selectedProvince,
      thuhang: selectedRating,
      minprice: minValue,
      maxprice: maxValue,
    },
    {
      selectFromResult: (result) => {
        const { data, ...args } = result;
        return {
          hasNextPage: data?.hasNextPage,
          data: data?.data,
          count: data?.data.length,
          isFetchingProduct: data == undefined ? false : result.isFetching,
          ...args,
        };
      },
    }
  );

  console.log("hasNextPage", hasNextPage);
  useEffect(() => {
    setDataProduct(data);
  }, [data]);


  const { data: dataChildCategories, isFetching: isFetchingChildCategories } =
    useGetChildCategoryQuery({
      id: id,
    });

  const formatPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleResetPrice = () => {
    setMinValue(MIN_DEFAULT);
    setMaxValue(MAX_DEFAULT);
    setIsBottomSheetVisible(false);
    bottomSheetRef.current?.close();
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("https://provinces.open-api.vn/api/p/");
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  //? Handlers
  const changeRoute = useChangeRoute();

  const openSheet = () => {
    setIsBottomSheetVisible(true);
    bottomSheetRef.current?.expand();
  };

  // Thêm snapPoints cho Bottom Sheet
  const [snapPoints, setSnapPoints] = useState(["20%"]);

  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => (
            <FeedHeader
              {...props}
              title="Home"
              icon="menu-outline"
              category={dataChildCategories?.name}
            />
          ),
        }}
      />

      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView
          className="bg-[#f4f4f4] h-full flex "
          style={{ opacity: isBottomSheetVisible ? 0.1 : 1 }}
          onScroll={({ nativeEvent }) => {
            const { layoutMeasurement, contentOffset, contentSize } =
              nativeEvent;
            const isEndReached =
              layoutMeasurement.height + contentOffset.y >=
              contentSize.height - 20;

            if (isEndReached && !isFetchingProduct) {
              if (hasNextPage) {
                changeRoute({
                  page: Number(page) + 1,
                });
              }
            }
          }}
          scrollEventThrottle={16}
        >
          <View className="px-3  bg-white blur-3xl">
            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-row gap-x-1 py-2"
              >
                <TouchableOpacity
                  className={`flex-row justify-between items-center border ${
                    sortType === "date"
                      ? "bg-[#fff4e0] border-[#f80]"
                      : "bg-[#fff] border border-[#f4f4f4]"
                  } px-3 py-1 rounded-full mr-2`}
                  onPress={() => handleSort("date")}
                >
                  <Text
                    className={`text-13 ${
                      sortType === "date" ? "text-[#f80]" : "text-[#000]"
                    }`}
                  >
                    Mới nhất
                  </Text>
                </TouchableOpacity>
                <View className="w-[1px] h-[14px] bg-[#e0e0e0] mx-3 mt-[7px]"></View>

                <TouchableOpacity
                  className={`flex-row justify-between items-center border ${
                    sortType === "rating"
                      ? "bg-[#fff4e0] border-[#f80]"
                      : "bg-[#fff] border border-[#f4f4f4]"
                  } px-3 py-1 rounded-full mr-2`}
                  onPress={() => handleSort("rating")}
                >
                  <Text
                    className={`text-13 ${
                      sortType === "rating" ? "text-[#f80]" : "text-[#000]"
                    }`}
                  >
                    Đánh giá cao
                  </Text>
                </TouchableOpacity>

                <View className="w-[1px] h-[14px] bg-[#e0e0e0] mx-3 mt-[7px]"></View>

                <TouchableOpacity
                  className={`flex-row justify-between items-center border ${
                    sortType === "price"
                      ? "bg-[#fff4e0] border-[#f80]"
                      : "bg-[#fff] border border-[#f4f4f4]"
                  } px-3 py-1 rounded-full mr-2`}
                  onPress={() => handleSort("price")}
                >
                  <Text
                    className={`text-13 ${
                      sortType === "price" ? "text-[#f80]" : "text-[#000]"
                    }`}
                  >
                    Giá
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>

          <View className="px-6 py-1 bg-white blur-3xl mt-2">
            <View>
              <TouchableOpacity>
                <View className="w-full items-center flex-row items-center justify-center">
                  <Icons.Ionicons
                    name="location-outline"
                    size={24}
                    color="black"
                  />
                  <View className="w-[100%] flex-row justify-start items-center ml-1">
                    <Text className="text-13 text-[#808080] mr-2">
                      Khu vực:
                    </Text>
                    <View className="flex-row items-center">
                      <Text
                        onPress={() => {
                          setIsOpenSheetLocation(true);
                          setIsOpenSheetRating(false);
                          setIsOpenSheetPrice(false);
                          openSheet();
                        }}
                        className="text-13 mr-1"
                      >
                        {selectedProvince || "Toàn Quốc"}
                      </Text>
                      <Icons.Ionicons
                        name="chevron-down-sharp"
                        size={12}
                        color="black"
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <View className="flex-row justify-start items-center h-[50px]">
                <TouchableOpacity
                  className={`flex-row justify-between items-center border ${
                    minValue == MIN_DEFAULT && maxValue == MAX_DEFAULT
                      ? "bg-[#fff] border border-[#f4f4f4]"
                      : "bg-[#fff4e0] border-[#f80]"
                  } px-3 py-1 mr-2 rounded-full`}
                  onPress={() => {
                    setIsOpenSheetPrice(true);
                    setIsOpenSheetLocation(false);
                    setIsOpenSheetRating(false);
                    openSheet();
                  }}
                >
                  <Text
                    className={`text-13 ${minValue == MIN_DEFAULT && maxValue == MAX_DEFAULT ? "text-[#000]" : " text-[#f80]"}`}
                  >
                    Giá
                  </Text>
                  <Icons.Ionicons
                    name="chevron-down-sharp"
                    size={12}
                    color={
                      minValue == MIN_DEFAULT && maxValue == MAX_DEFAULT
                        ? "#808080"
                        : "#f80"
                    }
                    className="ml-1"
                  />
                </TouchableOpacity>
                <View
                  className={`flex-row justify-between items-center ${
                    selectedRating
                      ? "bg-[#fff4e0] border-[#f80] border"
                      : "bg-[#fff] border border-[#f4f4f4]"
                  } px-3 py-1 mr-2 rounded-full`}
                >
                  <Text
                    className={`text-13 ${
                      selectedRating ? "text-[#f80]" : "text-[#000] "
                    }`}
                    onPress={() => {
                      setIsOpenSheetRating(true);
                      setIsOpenSheetLocation(false);
                      setIsOpenSheetPrice(false);
                      openSheet();
                    }}
                  >
                    Theo hạng
                  </Text>
                  <Icons.Ionicons
                    name="chevron-down-sharp"
                    size={12}
                    color={selectedRating ? "#f80" : "#808080"}
                    className="ml-1"
                  />
                </View>
              </View>
            </View>
          </View>

          <View className="py-3 bg-white mt-2">
            <Text className="text-base text-neutral-600 font-bold px-3 mb-2 ">
              Danh mục sản phẩm
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 12,
                paddingVertical: 10,
              }}
              pagingEnabled
              snapToInterval={Dimensions.get("window").width / 4}
              decelerationRate="fast"
            >
              {isFetchingChildCategories ? (
                <ProductSkeleton />
              ) : (
                <View className="flex flex-row space-x-10 items-center">
                  {dataChildCategories?.data?.map((item, index) => (
                    <Link
                      href={{
                        pathname: `/products`,
                        params: { idCat: item.ID },
                      }}
                      key={index}
                      asChild
                    >
                      <TouchableOpacity className="w-[70px]">
                        <View className="items-center">
                          <Image
                            source={{
                              uri: item.image
                                ? item.image
                                : "https://ftechwebsite.com/PTCOCO/wp-content/uploads/2024/07/668517630fe24.png",
                            }}
                            className="w-14 h-14 rounded-lg mb-1"
                          />
                          <Text className="text-xs mt-1 text-center">
                            {item.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </Link>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>

          <View className="px-0 flex-1 bg-white mt-2">
            <View id="_products" className="w-full h-[100%] flex px-3 mt-2">
              {/* Filters & Sort */}
              <View className="divide-y-2 divide-neutral-200 w-full">
                <View className="flex flex-row justify-between ">
                  <Text className="text-base text-neutral-600">
                    Tất cả sản phẩm
                  </Text>

                  <View className="flex-row justify-between items-center">
                    <Text className="text-base text-neutral-600">
                      {count} sản phẩm
                    </Text>
                    {/* <Sort handleChangeRoute={handleChangeRoute} className /> */}
                  </View>
                </View>
              </View>
              {/* Products */}
              {isFetchingProduct && page == 0 && <ProductSkeleton />}
              {dataProduct && dataProduct?.length > 0 ? (
                <ListProducts products={dataProduct} page={page} />
              ) : (
                <Text className="text-center text-red-500 text-16 py-3">
                  Không tìm thấy sản phẩm
                </Text>
              )}

              {/* Loading indicator when fetching more data */}
              {isFetchingProduct && page > 0 && (
                <View className="py-4 items-center">
                  <ActivityIndicator size="large" color="#f80" />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        {isBottomSheetVisible && (
          <TouchableOpacity
            className="px-3 py-2 rounded-full absolute bottom-0 w-full h-screen"
            onPress={() => {
              setIsBottomSheetVisible(false);
              bottomSheetRef.current?.close();
            }}
          ></TouchableOpacity>
        )}

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
          backgroundStyle={{ backgroundColor: "white" }}
          enableContentPanningGesture={false}
          onClose={() => setIsBottomSheetVisible(false)}
        >
          <BottomSheetView>
            {isOpenSheetLocation && (
              <View className="mb-4 px-3 ">
                <Text className="text-base text-neutral-600 font-bold mb-2">
                  Địa điểm
                </Text>
                <TouchableOpacity
                  className="border border-gray-300 rounded-lg p-3 pr-2 flex-row justify-between items-center"
                  onPress={() => {
                    setSnapPoints(["50%"]);
                    setShowProvinces(!showProvinces);
                  }}
                >
                  <Text className="text-gray-600">
                    {selectedProvince || "Chọn tỉnh/thành phố"}
                  </Text>
                  <Icons.AntDesign
                    name={showProvinces ? "up" : "down"}
                    size={16}
                    color="#666"
                  />
                </TouchableOpacity>

                {showProvinces && (
                  <View className="border border-gray-300 rounded-lg mt-1 max-h-60">
                    <ScrollView>
                      {provinces.map((province) => (
                        <TouchableOpacity
                          key={province.code}
                          className="p-3 border-b border-gray-200"
                          onPress={() => {
                            setSelectedProvince(province.name);

                            setShowProvinces(false);
                            setIsBottomSheetVisible(false);
                            bottomSheetRef.current?.close();
                            setSnapPoints(["25%"]);
                          }}
                        >
                          <Text>{province.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>
            )}

            {isOpenSheetRating && (
              <View className="mb-4 px-3 ">
                <Text className="text-base text-neutral-600 font-bold mb-2">
                  Hạng
                </Text>
                <View className="flex-row gap-x-3 items-center justify-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <TouchableOpacity
                      key={rating}
                      onPress={() => {
                        if (selectedRating === rating) {
                          setSelectedRating(null);
                        } else {
                          setSelectedRating(rating);
                        }
                        setIsBottomSheetVisible(false);
                        bottomSheetRef.current?.close();
                      }}
                      className={`w-10 h-10 rounded-full items-center justify-center ${
                        selectedRating === rating ? "bg-black" : "bg-gray-200"
                      }`}
                    >
                      <Text
                        className={`font-medium ${
                          selectedRating === rating
                            ? "text-white"
                            : "text-gray-700"
                        }`}
                      >
                        {rating}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {isOpenSheetPrice && (
              <View className="mb-4 px-3 ">
                <Text className="text-lg font-medium ">Giá </Text>
                <View className="px-2 py-4">
                  <RangeSlider
                    sliderWidth={300}
                    min={MIN_DEFAULT}
                    max={MAX_DEFAULT}
                    initialMin={minValue}
                    initialMax={maxValue}
                    step={10}
                    onValueChange={(range) => {
                      setMinValue(range.min);
                      setMaxValue(range.max);
                    }}
                    thumbTintColor="#000000"
                    minimumTrackTintColor="#000000"
                    maximumTrackTintColor="#000000"
                  />
                  <View className="flex-col justify-between mt-6">
                    <View className="mb-4">
                      <Text className="text-gray-600">Giá tối thiểu</Text>
                      <View className="border border-gray-300 rounded-lg p-2">
                        <Text className="text-gray-600">
                          {formatPrice(minValue)}đ
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text className="text-gray-600">Giá tối đa</Text>
                      <View className="border border-gray-300 rounded-lg p-2">
                        <Text className="text-gray-600">
                          {formatPrice(maxValue)}đ
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View className="bottom-0 left-0 right-0 flex-row gap-x-3 p-4 bg-white border-t border-gray-200 mt-10">
                  <TouchableOpacity
                    onPress={handleResetPrice}
                    className="flex-1 py-3 bg-gray-100 rounded-lg"
                  >
                    <Text className="text-center text-gray-700 font-medium">
                      Thiết lập lại
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setIsBottomSheetVisible(false);
                      bottomSheetRef.current?.close();
                    }}
                    className="flex-1 py-3 bg-black rounded-lg"
                  >
                    <Text className="text-center text-white font-medium">
                      Áp dụng bộ lọc
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </>
  );
}
