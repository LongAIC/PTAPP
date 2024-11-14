import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";

import { SubmitModalBtn } from "../common/Buttons";
import HandleResponse from "../common/HandleResponse";
import Modal from "../common/Modal";
import TextField from "../common/TextField";

import { useEditPhoneUserMutation } from "@/serviceFTECH";
import { mobileSchema } from "@/utils";
import { useUserInfo } from "@/hooks";
import { useAppDispatch } from "@/hooks/useRedux";
import { updateUserPhone } from "@/store/slices/user.slice";

const UserMobileModal = (props) => {
  //? Props
  const { isShow, onClose, editedData } = props;
  const { userInfo } = useUserInfo();
  const dispatch = useAppDispatch();

  //? Patch Data
  const [editPhoneUser, { data, isSuccess, isLoading, error, isError }] =
    useEditPhoneUserMutation();

  //? Form Hook
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm({
    resolver: yupResolver(mobileSchema),
    defaultValues: { mobile: editedData ? editedData : "" },
  });

  //? Handlers
  const submitHander = async ({ mobile }) => {
    console.log(userInfo);
    try {
      const result = await editPhoneUser({
        phone: mobile,
        id: userInfo?.id,
      }).unwrap();

      // Sau khi API thành công, update phone trong store
      if (result) {
        dispatch(updateUserPhone(mobile));
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
          <Modal.Header onClose={onClose}>
            Ghi và chỉnh sửa số điện thoại di động
          </Modal.Header>
          <Modal.Body>
            <View className="flex flex-col justify-between">
              <TextField
                label="Số điện thoại"
                control={control}
                errors={formErrors.mobile}
                name="mobile"
                inputMode="tel"
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

export default UserMobileModal;
