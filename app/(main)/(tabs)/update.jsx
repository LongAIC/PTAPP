import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const { width } = Dimensions.get("window");

const update = () => {
  const scrollViewRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [shopImage, setShopImage] = useState(null);
  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentTab = Math.round(scrollPosition / width);
    setActiveTab(currentTab);
  };

  const SocialButton = ({ icon, label }) => {
    return (
      <TouchableOpacity className="flex flex-wrap gap-3 justify-center items-center py-3.5 w-full rounded-xl border border-solid border-neutral-200">
        <Image
          loading="lazy"
          source={{ uri: icon }}
          className="object-contain shrink-0 self-stretch my-auto w-7 aspect-square"
        />
        <View className="self-stretch my-auto">
          <Text>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const InputField = ({ label, icon, placeholder, type, rightIcon }) => {
    return (
      <View className="flex flex-col justify-center w-full">
        <View className="flex flex-col w-full max-md:max-w-full">
          <Text className="text-xl font-medium text-black">
            {label}
            <Text className="text-red-500">*</Text>
          </Text>
          <View className="flex overflow-hidden flex-wrap justify-between items-center p-4 mt-2 w-full rounded-xl border border-solid border-neutral-200">
            <View className="flex flex-col items-start self-stretch my-auto text-xl min-w-[240px] text-zinc-600 w-[434px] max-md:max-w-full">
              <View className="flex gap-2 justify-center items-center">
                <Image
                  loading="lazy"
                  source={{ uri: icon }}
                  className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                />
                <TextInput
                  placeholder={placeholder}
                  secureTextEntry={type === "password"}
                  className="self-stretch my-auto"
                  accessibilityLabel={placeholder}
                />
              </View>
            </View>
            {rightIcon && (
              <View className="flex flex-col justify-center items-center self-stretch my-auto w-6">
                <Image
                  loading="lazy"
                  source={{ uri: rightIcon }}
                  className="object-contain self-stretch my-auto w-6 aspect-square"
                />
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  const scrollToTab = (index) => {
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
    setActiveTab(index);
  };

  const renderTab1 = () => (
    <View className="flex flex-col justify-center p-8 bg-white rounded-2xl max-w-[587px] max-md:px-5">
      <View className="flex flex-col justify-center w-full max-w-[523px] max-md:max-w-full">
        <View className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
          <View className="flex gap-4 justify-center items-center self-stretch my-auto">
            <View className="flex gap-2.5 justify-center items-center self-stretch p-3.5 my-auto border border-solid border-neutral-200 rounded-[555px] w-[60px]">
              <Image
                loading="lazy"
                source={{
                  uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/e77e028b37fd9bedc8d7a57ccca9eaebc1facb666202f95d50d00c3575b4d020?apiKey=16759ba9ba0a4d9680ed8efcbaad9e22&",
                }}
                className="object-contain self-stretch my-auto w-8 aspect-square"
              />
            </View>
            <Text className="self-stretch my-auto text-2xl font-medium text-black">
              Sign in
            </Text>
          </View>
          <View className="flex gap-2.5 items-start self-stretch p-3.5 my-auto rounded-[555px] w-[60px]">
            <Image
              loading="lazy"
              source={{
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/282d7f72c163fb0b08995ca2113f0bd4129e3a64e6bef05312bda545c3ef77a0?apiKey=16759ba9ba0a4d9680ed8efcbaad9e22&",
              }}
              className="object-contain w-8 aspect-square"
            />
          </View>
        </View>
        <Text className="mt-6 text-xl leading-7 text-zinc-600 max-md:max-w-full">
          Login to your account - enjoy exclusive features & many more
        </Text>
      </View>

      <View className="flex flex-col justify-center mt-10 w-full max-w-[522px] max-md:max-w-full">
        <View>
          <InputField
            label="Email"
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/89b5a9c3c3c5ca1233c135e13ec0f35e616bb6ee513d790b0fe9754bce180ff7?apiKey=16759ba9ba0a4d9680ed8efcbaad9e22&"
            placeholder="Enter your email"
            type="email"
          />
          <View className="mt-8">
            <InputField
              label="Password"
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/e7641383f7b40c650084bc5727a6830d09c77708597b683c849fd6f9e493f873?apiKey=16759ba9ba0a4d9680ed8efcbaad9e22&"
              placeholder="Enter your password"
              type="password"
              rightIcon="https://cdn.builder.io/api/v1/image/assets/TEMP/1f781bfd76c77201218d055bcba705e94628293cb1961a9c7e816c688ea336ad?apiKey=16759ba9ba0a4d9680ed8efcbaad9e22&"
            />
          </View>

          <View className="flex flex-wrap gap-10 justify-between items-center mt-8 w-full text-xl max-md:max-w-full">
            <View className="flex gap-10 items-start self-stretch my-auto text-black">
              <View className="flex gap-2 justify-center items-center">
                <Image
                  loading="lazy"
                  source={{
                    uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/72b04b2f3b06ae42147267e23b9ef8466861e8781601aa9f42dcc02008d5116b?apiKey=16759ba9ba0a4d9680ed8efcbaad9e22&",
                  }}
                  className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                />
                <Text className="self-stretch my-auto">Remember me</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text className="self-stretch my-auto font-medium text-blue-700">
                forget password?
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex flex-col justify-center items-center mt-10 w-full text-xl max-w-[522px] max-md:max-w-full">
            <View className="flex flex-col justify-center items-center w-full leading-snug max-md:max-w-full">
              <TouchableOpacity className="gap-2 self-stretch py-3.5 w-full rounded-xl bg-zinc-400">
                <Text className="font-medium text-white capitalize text-center">
                  sign in
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="gap-2.5 self-stretch px-2.5 py-3.5 mt-3 w-full">
                <Text className="font-semibold text-blue-700 text-center">
                  Don't have an account? Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="flex flex-wrap gap-4 items-center mt-6 w-full text-black whitespace-nowrap">
          <Image
            loading="lazy"
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/a55a1955a00078d980e91fa7b523dd15e01a0983bf0994d64d70275a9fb63a2e?apiKey=16759ba9ba0a4d9680ed8efcbaad9e22&",
            }}
            className="object-contain flex-1 shrink self-stretch my-auto w-full aspect-[250] basis-0"
          />
          <Text className="self-stretch my-auto">OR</Text>
        </View>

        <View className="flex flex-col justify-center items-center mt-6 w-full font-medium leading-snug text-black whitespace-nowrap max-md:max-w-full">
          {/* {socialButtons.map((button, index) => (
            <View key={index} className={index > 0 ? "mt-3" : ""}>
              <SocialButton icon={button.icon} label={button.label} />
            </View>
          ))} */}
        </View>
      </View>
    </View>
  );

  const renderTab2 = () => (
    <View className="w-screen px-5 py-4">
      <TouchableOpacity className="h-40 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
        <Text className="text-gray-600">Tải lên hình ảnh gian hàng</Text>
      </TouchableOpacity>

      <Text className="text-lg font-bold mb-2">Mô tả gian hàng:</Text>
      <TextInput
        className="w-full border border-gray-300 rounded-lg p-3 h-32 mb-4"
        value={description}
        onChangeText={setDescription}
        placeholder="Nhập mô tả"
        multiline
        textAlignVertical="top"
      />
    </View>
  );

  const renderTab3 = () => (
    <View className="w-screen px-5 py-4">
      <Text className="text-lg font-bold mb-2">Tên sản phẩm:</Text>
      <TextInput
        className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        value={productInfo.name}
        onChangeText={(text) => setProductInfo({ ...productInfo, name: text })}
        placeholder="Nhập tên sản phẩm"
      />

      <Text className="text-lg font-bold mb-2">Giá:</Text>
      <TextInput
        className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        value={productInfo.price}
        onChangeText={(text) => setProductInfo({ ...productInfo, price: text })}
        placeholder="Nhập giá"
        keyboardType="numeric"
      />

      <Text className="text-lg font-bold mb-2">Số lượng:</Text>
      <TextInput
        className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        value={productInfo.quantity}
        onChangeText={(text) =>
          setProductInfo({ ...productInfo, quantity: text })
        }
        placeholder="Nhập số lượng"
        keyboardType="numeric"
      />
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {renderTab1()}
        {renderTab2()}
        {renderTab3()}
      </ScrollView>

      <View className="flex-row justify-center items-center py-4">
        {[0, 1, 2].map((index) => (
          <TouchableOpacity
            key={index}
            onPress={() => scrollToTab(index)}
            className="mx-1"
          >
            <View
              className={`w-2 h-2 rounded-full ${
                activeTab === index ? "bg-black" : "bg-gray-300"
              }`}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default update;
