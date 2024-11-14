import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { View, Text } from "react-native";

import { SubmitModalBtn } from "../common/Buttons";
import HandleResponse from "../common/HandleResponse";
import Modal from "../common/Modal";
import TextField from "../common/TextField";

import { useEditUserMutation } from "@/serviceFTECH";
import { nameSchema } from "@/utils";
import { useDisclosure, useUserInfo } from "@/hooks";
import { updateUserName } from "@/store/slices/user.slice";
import { useAppDispatch } from "@/hooks/useRedux";

const UserNameModal = (props) => {
  //? Props
  const { isShow, onClose, editedData } = props;
  const { userInfo } = useUserInfo();
  const dispatch = useAppDispatch();

  //? Edit User Query
  const [editUser, { data, isSuccess, isLoading, isError, error }] =
    useEditUserMutation();

  //? Form Hook
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm({
    resolver: yupResolver(nameSchema),
    defaultValues: { name: editedData ? editedData : "" },
  });

  //? Handlers

  const submitHander = async ({ name }) => {
    try {
      const result = await editUser({
        username: name, // map name thành username theo API
        id: userInfo?.id, // thêm uid vào
      }).unwrap();

      // Sau khi API thành công, update phone trong store
      if (result) {
        dispatch(updateUserName(name));
        onClose?.(); // Đóng modal nếu cần
      }
    } catch (error) {
      console.error("Failed to update phone:", error);
    }
  };

  //? Render(s)
  return (
    <>
      {/* Handle Edit User Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.message}
          message={data?.message}
          onSuccess={onClose}
        />
      )}

      <Modal isShow={isShow} onClose={onClose} effect="bottom-to-top">
        <Modal.Content
          onClose={onClose}
          className="flex flex-col px-5 py-3 bg-white rounded-lg gap-y-5 "
        >
          <Modal.Header onClose={onClose}>Gửi và chỉnh sửa họ tên</Modal.Header>
          <Modal.Body>
            <View className="flex flex-col justify-between">
              <TextField
                label="Họ và tên"
                control={control}
                errors={formErrors.name}
                name="name"
                className="py-3 mt-2"
              />

              <View className="py-3 border-t-2 border-gray-200 lg:pb-0 ">
                <SubmitModalBtn
                  onPress={handleSubmit(submitHander)}
                  isLoading={isLoading}
                >
                  Xác nhận
                </SubmitModalBtn>
              </View>
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default UserNameModal;
