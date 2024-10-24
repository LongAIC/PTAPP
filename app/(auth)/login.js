import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Text, View, Image, TouchableOpacity } from "react-native";

import {
  Button,
  HandleResponse,
  Logo,
  TextField,
  ResponsiveImage,
} from "@/components";
import { useAppDispatch } from "@/hooks";
import { useLoginMutation } from "@/serviceFTECH";
import { logInSchema } from "@/utils";
import { userLogin } from "@/store";

export default function LoginScreen() {
  //? Assets
  const dispatch = useAppDispatch();
  const router = useRouter();

  //? Login User
  const [login, { data, isSuccess, isError, isLoading, error }] =
    useLoginMutation();

  //? Form Hook
  const {
    handleSubmit,
    formState: { errors: formErrors },
    setFocus,
    control,
  } = useForm({
    resolver: yupResolver(logInSchema),
    defaultValues: { email: "", password: "" },
  });

  //? Focus On Mount
  useEffect(() => {
    setFocus("name");
  }, []);

  //? Handlers
  const onSubmit = ({ email, password }) => {
    console.log(email, password);
    if (email && password) {
      login({
        email,
        password,
      });
    }
  };

  const onSuccess = () => {
    if (isSuccess && data) {
      const userInfo = {
        id: data.data.ID,
        displayName: data.data.display_name,
        email: data.data.user_email,
        eventRegisted: data.data.eventRegisted,
        phoneNumber: data.data.phoneNumber,
      };
  
      dispatch(userLogin({ userInfo }));
      
      router.back();
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Đăng nhập",
          headerBackTitleVisible: true,
        }}
      />
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.message || "Xảy ra lỗi"}
          message={data?.message}
          onSuccess={onSuccess}
        />
      )}
      <View className="h-[100%]  bg-white">
        <View className="w-[100%] h-[100%] px-8  space-y-4 ">
          <View>
            <Image
              source={require("@/assets/app_images/Ellipse1.png")}
              className="mr-4 absolute"
            />
            <Image
              source={require("@/assets/app_images/Ellipse2.png")}
              className="mr-4 absolute"
            />
          </View>

          <View className=" w-[100%]">
            <TextField
              errors={formErrors.email}
              placeholder="Nhập email của bạn"
              name="email"
              keyboardType="email-address"
              styleInput="w-[100%] bg-white border-slate-200 border rounded p-4 text-sm"
              autoCapitalize="none"
              control={control}
              label={"Email"}
              styleLabel="text-lg"
            />
            <TextField
              errors={formErrors.password}
              secureTextEntry
              placeholder="Nhập mật khẩu"
              name="password"
              styleInput="w-[100%] bg-white border-slate-200 border rounded p-4 text-sm"
              control={control}
              label={"Mật khẩu"}
              styleLabel="text-lg"
            />
          </View>
          <View className="flex-row mb-4">
            <Text>Quên mật khẩu? </Text>
            <Link href="/forgetPassword" className="text-blue-400 ">
              Đặt lại mật khẩu
            </Link>
          </View>
          <View className=" mt-10">
            <Button isLoading={isLoading} onPress={handleSubmit(onSubmit)}>
              Đăng nhập
            </Button>
          </View>

          <View className="flex-1 justify-center ">
            <View className="absolute bottom-0  mb-5 justify-center items-center flex-row  w-full  ">
              <Text>Bạn chưa có tài khoản? </Text>
              <Link href="/register" className="text-blue-400 ">
                Đăng ký ngay
              </Link>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
