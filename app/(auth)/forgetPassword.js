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
import { useLoginMutation } from "@/services";
import { userLogin } from "@/store";
import { logInSchema } from "@/utils";

export default function ForgetPasswordScreen() {
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
    if (email && password) {
      login({
        body: { email, password },
      });
    }
  };

  const onSuccess = () => {
    dispatch(userLogin(data.data.token));
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Quên mật khẩu",
          headerBackTitleVisible: true,
        }}
      />
      {/*  Handle Login Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.message || "发生异常"}
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

          <View className=" w-[100%] ">
            <Text className="text-slate-600 mb-10">
              Nhập email của bạn cho quá trình xác minh. Chúng tôi sẽ gửi mã OTP
              vào email của bạn
            </Text>
            <TextField
              errors={formErrors.email}
              placeholder="Nhập email của bạn"
              name="email"
              keyboardType="email-address"
              styleInput="w-[100%] bg-white border-slate-200 border rounded p-4 text-sm mb-10"
              autoCapitalize="none"
              control={control}
              label={"Email"}
              styleLabel="text-lg"
              
            />
          </View>

          <View className="">
            <Button isLoading={isLoading} onPress={handleSubmit(onSubmit)}>
              Gửi mã OTP
            </Button>
          </View>
          

          
        </View>
      </View>
    </>
  );
}
