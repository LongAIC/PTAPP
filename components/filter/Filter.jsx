import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import Icons from "../common/Icons";
import Modal from "../common/Modal";
import RangeSlider from "../common/RangeSlider";

import {
  useAppDispatch,
  useAppSelector,
  useDebounce,
  useDisclosure,
} from "@/hooks";
import { loadFilters, resetFilter, updateFilter } from "@/store";
import CategorySelector from "../common/Selector";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Slider from "@react-native-community/slider";

const Filter = (props) => {
  //? Props
  const { province, ratings, minPrices, maxPrices, handleChangeRoute } = props;

  //? Assets
  const dispatch = useAppDispatch();
  const [isFilters, filtersHandlers] = useDisclosure();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  //? State
  const filters = useAppSelector((state) => state.filters);

  //? Debounced Values
  const debouncedMinPrice = useDebounce(filters.minPrice, 1200);
  const debouncedMaxPrice = useDebounce(filters.maxPrice, 1200);

  // Thêm states để quản lý
  const [showProvinces, setShowProvinces] = useState(false);
  const [showDistricts, setShowDistricts] = useState(false);
  const [showWards, setShowWards] = useState(false);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);

  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const MIN_DEFAULT = 0;
  const MAX_DEFAULT = 2000000;
  const [minValue, setMinValue] = useState(MIN_DEFAULT);
  const [maxValue, setMaxValue] = useState(MAX_DEFAULT);

  const [selectedRating, setSelectedRating] = useState(1);

  const formatPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Fetch provinces
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

  useEffect(() => {
    setSelectedProvince(province);
    setMinValue(minPrices ? minPrices : MIN_DEFAULT);
    setMaxValue(maxPrices ? maxPrices : MAX_DEFAULT);
    setSelectedRating(ratings ? ratings : null);
  }, [province, minPrices, maxPrices, ratings]);

  //? Handlers
  const handlefilter = () => {
    handleChangeRoute({
      provinceName: selectedProvince ? selectedProvince : null,
      rating: selectedRating ? selectedRating : null,
      minPrice: minValue,
      maxPrice: maxValue,
    });
    if (filtersHandlers.close) filtersHandlers.close();
  };

  const handleResetFilters = () => {
    setSelectedProvince(null);
    setSelectedRating(null);
    setMinValue(MIN_DEFAULT);
    setMaxValue(MAX_DEFAULT);
    handleChangeRoute({
      provinceName: null,
      wardName: null,
      rating: null,
      minPrice: 0,
      maxPrice: MAX_DEFAULT,
    });
  };

  //? Re-Renders
  //*   load Filters
  // useEffect(() => {
  //   dispatch(
  //     loadFilters({
  //       price:
  //         mainMaxPrice && mainMinPrice ? `${mainMinPrice}-${mainMaxPrice}` : "",
  //       discount: "false",
  //       inStock: "false",
  //       ...params,
  //     })
  //   );
  // }, [params.category, mainMaxPrice, mainMinPrice, dispatch]);
  //*   Change Route After Debounce
  // useEffect(() => {
  //   if (Number(debouncedMinPrice) && mainMinPrice !== Number(debouncedMinPrice))
  //     handleChangeRoute({
  //       price: `${debouncedMinPrice}-${debouncedMaxPrice}`,
  //     });
  // }, [debouncedMinPrice]);

  // useEffect(() => {
  //   if (Number(debouncedMaxPrice) && mainMaxPrice !== Number(debouncedMaxPrice))
  //     handleChangeRoute({
  //       price: `${debouncedMinPrice}-${debouncedMaxPrice}`,
  //     });
  // }, [debouncedMaxPrice]);

  useEffect(() => {
    if (filtersHandlers.close) filtersHandlers.close();
  }, [filters.discount, filters.inStock, debouncedMaxPrice, debouncedMinPrice]);

  const handleApplyFilter = () => {
    filtersHandlers.close();
  };

  //? Render(s)
  return (
    <>
      <View>
        <Pressable className="flex flex-row items-center justify-start gap-x-1 ml-[-14px]">
          <Icons.Ionicons
            name="filter"
            size={16}
            className="text-neutral-600"
          />
          <Text className="text-base text-neutral-600">Lọc</Text>
        </Pressable>
      </View>
      <Modal
        isShow={isFilters}
        onClose={filtersHandlers.close}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={filtersHandlers.close}
        className="mt-40 flex-1 bg-red-500 ml-0"
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Modal.Content
            onClose={filtersHandlers.close}
            style={{}}
            className="flex flex-col h-[95vh] w-[105%] px-5 bg-white pt-5"
          >
            <Modal.Header onClose={filtersHandlers.close}>
              Bộ lọc tìm kiếm
            </Modal.Header>
            <Modal.Body>
              <ScrollView
                className=""
                contentContainerStyle={{
                  paddingBottom: insets.bottom + 160, // Tăng padding bottom để tránh che phủ nút
                }}
              >
                <View className="flex-1">
                  <View className="">
                    <Text className="text-lg font-medium mb-3">Địa điểm</Text>

                    {/* Province Selector */}
                    <View className="mb-4 ">
                      <TouchableOpacity
                        className="border border-gray-300 rounded-lg p-3 pr-2 flex-row justify-between items-center"
                        onPress={() => setShowProvinces(!showProvinces)}
                      >
                        <Text className="text-gray-600">
                          {selectedProvince
                            ? selectedProvince
                            : "Chọn tỉnh/thành phố"}
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
                                  setSelectedDistrict(null);
                                  setSelectedWard(null);
                                  setShowProvinces(false);
                                }}
                              >
                                <Text>{province.name}</Text>
                              </TouchableOpacity>
                            ))}
                          </ScrollView>
                        </View>
                      )}
                    </View>
                  </View>

                  <View>
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
                  </View>
                </View>
                <View>
                  <Text className="text-lg font-medium mb-3">Hạng</Text>
                  <View className="flex-row gap-x-3 items-center justify-center">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <TouchableOpacity
                        key={rating}
                        onPress={() => {
                          setSelectedRating(rating);
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
                <View className="bottom-0 left-0 right-0 flex-row gap-x-3 p-4 bg-white border-t border-gray-200 mt-10">
                  <TouchableOpacity
                    onPress={handleResetFilters}
                    className="flex-1 py-3 bg-gray-100 rounded-lg"
                  >
                    <Text className="text-center text-gray-700 font-medium">
                      Thiết lập lại
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handlefilter}
                    className="flex-1 py-3 bg-black rounded-lg"
                  >
                    <Text className="text-center text-white font-medium">
                      Áp dụng bộ lọc
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </Modal.Body>
          </Modal.Content>
        </GestureHandlerRootView>
      </Modal>
    </>
  );
};

export default Filter;
