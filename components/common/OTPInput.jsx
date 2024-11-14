import React, {useState, useRef} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const OTPInput = ({pinCount = 6, onOtpChange}) => {
  const [otp, setOtp] = useState(new Array(pinCount).fill(''));
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    onOtpChange && onOtpChange(newOtp.join(''));

    if (text && index < pinCount - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.otpContainer}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          style={styles.otpInput}
          keyboardType="numeric"
          maxLength={1}
          value={digit}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          ref={ref => (inputs.current[index] = ref)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    justifyContent: 'center',
    padding: 0,
    marginHorizontal: 5,
    fontSize: 20,
    display: 'flex',
    color: '#000',
  },
});

export default OTPInput;
