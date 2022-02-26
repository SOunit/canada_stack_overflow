import { Button, Text, Overlay } from "react-native-elements";
import { StyleSheet } from "react-native";
import { useState } from "react";

const ErrorModal = (props: any) => {
  const removeErrorModalHandler = () => {
    // e.preventDefault();
    props.onRemove();
    setIsVisible(false);
  };
  const [isVisible, setIsVisible] = useState<boolean>(true);

  return (
    <Overlay onBackdropPress={removeErrorModalHandler} isVisible={isVisible}>
      <Text style={styles.textPrimary}>Sorry!</Text>
      <Text style={styles.textSecondary}>Something Went wrong!</Text>
      <Button title="OK" onPress={removeErrorModalHandler} />
    </Overlay>
  );
};
const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17,
  },
});
export default ErrorModal;
