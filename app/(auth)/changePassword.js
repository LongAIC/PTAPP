import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";

import {
  Button,
  HandleResponse,
  Logo,
  TextField,
  ResponsiveImage,
  Popup,
  Icons,
} from "@/components";
import { useAppDispatch } from "@/hooks";
import { useLoginMutation } from "@/services";
import { userLogin } from "@/store";
import { changePasswordSchema } from "@/utils";
import { useChangePasswordMutation } from "@/serviceFTECH";

export default function ForgetPasswordScreen() {
  //? Assets
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [changePassword] = useChangePasswordMutation();
  const { email } = useLocalSearchParams();
  const {
    handleSubmit,
    formState: { errors: formErrors },
    setFocus,
    control,
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  useEffect(() => {
    setFocus("password");
  }, [setFocus]);

  const onSubmit = async ({ password }) => {
    try {
      setIsLoading(true);

      const res = await changePassword({ email, password }).unwrap();
      if (res.code === "1235") {
        setModalVisible(true);
      }
    } catch (error) {}
    // setModalVisible(true)
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Đổi mật khẩu",
          headerBackTitleVisible: true,
        }}
      />

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

          <View className=" w-[100%] pt-20 ">
            <TextField
              errors={formErrors.password}
              placeholder="Nhập mật khẩu mới"
              control={control}
              name="password"
              secureTextEntry
              styleInput="w-[100%] bg-white border-slate-200 border rounded p-4 text-sm "
              autoCapitalize="none"
              label={"Mật khẩu mới"}
              styleLabel="text-lg"
            />

            <TextField
              errors={formErrors.confirmPassword}
              placeholder="Nhập lại mật khẩu"
              control={control}
              name="confirmPassword"
              secureTextEntry
              styleInput="w-[100%] bg-white border-slate-200 border rounded p-4 text-sm "
              autoCapitalize="none"
              label={"Nhập lại mật khẩu"}
              styleLabel="text-lg"
            />
          </View>

          <View className="">
            <Button isLoading={isLoading} onPress={handleSubmit(onSubmit)}>
              Xác nhận
            </Button>
          </View>
        </View>
      </View>
      <Popup visible={modalVisible} onClose={closeModal}>
        <Icons.AntDesign
          name={"checkcircleo"}
          style={{
            fontSize: 78,
            color: "#0C9409",
            textAlign: "left",
            alignSelf: "center",
          }}
        />
        <Text style={styles.modalText}>Đổi mật khẩu thành công</Text>
        <Text style={{ textAlign: "center", color: "#000" }}>
          Hãy dùng mật khẩu mới để đăng nhập vào hệ thống
        </Text>
        <View style={{ width: "100%", marginTop: 20 }}>
          <TouchableOpacity
            className="bg-red-500"
            style={{
              borderRadius: 10,
              paddingVertical: 15,
              width: "100%",
            }}
            onPress={() => router.push("/login")}
          >
            <Text style={{ textAlign: "center", color: "#fff", fontSize: 17 }}>
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
      </Popup>
    </>
  );
}

const styles = StyleSheet.create({
  textPressed: {
    color: "blue",
    transform: [{ scale: 0.9 }],
  },
  modalText: {
    marginTop: 15,
    fontSize: 17,
    color: "#000",
    fontWeight: "500",
    marginBottom: 15,
    textAlign: "center",
  },
  otpInput: {
    width: "80%",
    height: 50,
  },
});
