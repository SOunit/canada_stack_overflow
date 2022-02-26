import { Button, Text, Overlay } from "react-native-elements";
import { StyleSheet } from "react-native";
import { FC, useState } from "react";

type Props = { onRemove: any };

const ErrorModal: FC<Props> = ({ onRemove }) => {
  const removeErrorModalHandler = () => {
    onRemove();
    setIsVisible(false);
  };
  const [isVisible, setIsVisible] = useState<boolean>(true);

  return (
    <Overlay onBackdropPress={removeErrorModalHandler} isVisible={isVisible}>
      <Text style={styles.title}>Sorry!</Text>
      <Text style={styles.text}>Something Went wrong!</Text>
      <Button title="OK" onPress={removeErrorModalHandler} />
    </Overlay>
  );
};
const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
  title: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
  },
  text: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17,
  },
});
export default ErrorModal;
