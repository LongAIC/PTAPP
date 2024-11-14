import { useController } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

import DisplayError from "./DisplayError";
export default function TextField(props) {
  //? Props
  const {
    label,
    errors,
    name,
    type = "text",
    control,

    direction,
    styleLabel,
    styleInput,
    ...inputProps
  } = props;

  //? Form Hook
  const { field } = useController({ name, control, rules: { required: true } });
  //? Handlers
  const onChangeHandler = (value) => {
    const inputValue = value;

    if (type === "number" && inputValue.length !== 0) {
      field.onChange(parseInt(inputValue));
    } else {
      field.onChange(inputValue);
    }
  };

  //? Render(s)
  return (
    <View className="w-full">
      {label && (
        <Text
          className={
            styleLabel ? styleLabel : "text-[14px] text-gray-700 font-bold"
          }
        >
          {label}
        </Text>
      )}
      <TextInput
        className={
          styleInput
            ? styleInput
            : "w-full px-3 transition-colors border border-gray-200 rounded-md outline-none bg-zinc-50/30 focus:border-blue-600 leading-none"
        }
        id={name}
        value={field?.value}
        name={field.name}
        onBlur={field.onBlur}
        onChangeText={onChangeHandler}
        ref={field.ref}
        {...inputProps}
      />
      {errors ? (
        <DisplayError errors={errors} />
      ) : (
        <View className="h-4"></View>
      )}
    </View>
  );
}
