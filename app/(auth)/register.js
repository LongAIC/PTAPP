import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";

import { Button, HandleResponse, Logo, TextField } from "@/components";
import { useAppDispatch } from "@/hooks";
import { useCreateUserMutation } from "@/services";
import { userLogin } from "@/store";
import { registerSchema } from "@/utils";

export default function RegisterScreen() {
  //? Assets
  const dispatch = useAppDispatch();
  const router = useRouter();

  //? Create User
  const [createUser, { data, isSuccess, isError, isLoading, error }] =
    useCreateUserMutation();

  //? Form Hook
  const {
    handleSubmit,
    formState: { errors: formErrors },
    setFocus,
    control,
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  //? Focus On Mount
  useEffect(() => {
    setFocus("name");
  }, []);

  //? Handlers
  const onSubmit = ({ name, email, password }) => {
    if (name && email && password) {
      router.push({
        pathname: "/otp",
        params: {
          type: "signUp",
          email,
          name,
          password,
          
        },
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
          title: "Đăng ký",
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
      <ScrollView className="  bg-white">
        <View className="w-[100%]  px-8  ">
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

          <View className=" mt-9">
            <TextField
              errors={formErrors.name}
              placeholder="Nhập họ và tên của bạn"
              name="name"
              control={control}
              label={"Họ và tên"}
              styleLabel="text-lg"
              styleInput="w-[100%] bg-white border-slate-200 border rounded p-4 text-base "
            />

            <TextField
              errors={formErrors.email}
              placeholder="Nhập email của bạn"
              name="email"
              keyboardType="email-address"
              styleInput="w-[100%] bg-white border-slate-200 border rounded p-4 text-base"
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
              styleInput="w-[100%] bg-white border-slate-200 border rounded p-4 text-base"
              control={control}
              label={"Mật khẩu"}
              styleLabel="text-lg"
            />
            <TextField
              errors={formErrors.confirmPassword}
              secureTextEntry
              placeholder="Xác nhận mật khẩu"
              name="confirmPassword"
              styleInput="w-[100%] bg-white border-slate-200 border rounded p-4 text-base"
              control={control}
              label={"Xác nhận mật khẩu"}
              styleLabel="text-lg"
            />
          </View>
          <View className="flex-row mb-4 mt-5">
            <Text>
              Bằng việc đăng ký, bạn đã đồng ý với Điều khoản, Chính sách bảo
              mật và Sử dụng Cookie{" "}
            </Text>
          </View>
          <View className=" mt-10 mb-7">
            <Button isLoading={isLoading} onPress={handleSubmit(onSubmit)}>
              Đăng ký tài khoản
            </Button>
          </View>

          <View className="justify-center ">
            <View className=" bottom-0  mb-5 justify-center items-center flex-row  w-full  ">
              <Text>Bạn đã có tài khoản? </Text>
              <Link href="/login" className="text-blue-400 ">
                Đăng nhập ngay
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
