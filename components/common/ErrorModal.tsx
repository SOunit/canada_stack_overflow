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
    // <View>
    //   <View style={styles.backdrop}></View>
    //   <View style={styles.position}>
    //     <Card
    //       containerStyle={{
    //         width: "90%",
    //         backgroundColor: "rgb(255,186,185)",
    //       }}
    //     >
    //       <Text style={styles.text}>{props.text}</Text>
    //       <Button title="OK" onPress={removeErrorModalHandler}></Button>
    //     </Card>
    //   </View>
    // </View>
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

// const styles = StyleSheet.create({
//   text: {
//     color: "red",
//     textAlign: "center",
//   },
//   position: {
//     position: "relative",
//     zIndex: 12,
//     margin: "-5rem",
//   },
//   backdrop: {
//     position: "absolute",
//     width: "100%",
//     height: "100vh",
//     top: "0",
//     left: "0",
//     zIndex: 10,
//     background: "rgba(0,0,0,0.75)",
//   },
// });

// export default ErrorModal;

// import React, { useState } from "react";
// import { Button, Overlay } from "react-native-elements";
// import { View, Text, StyleSheet } from "react-native";

// type OverlayComponentProps = {};

// const ErrorModal: React.FunctionComponent<OverlayComponentProps> = () => {
//   const [visible, setVisible] = useState(true);

//   const toggleOverlay = () => {
//     setVisible(false);
//   };

//   return (
//     <View>
//       {/* <Button
//         title="Open Overlay"
//         onPress={toggleOverlay}
//         buttonStyle={styles.button}
//       /> */}
//       <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
//         <Text style={styles.textPrimary}>Sorry!</Text>
//         <Text style={styles.textSecondary}>Something Went wrong!</Text>
//         <Button title="OK" onPress={toggleOverlay} />
//       </Overlay>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     margin: 10,
//   },
//   textPrimary: {
//     marginVertical: 20,
//     textAlign: "center",
//     fontSize: 20,
//   },
//   textSecondary: {
//     marginBottom: 10,
//     textAlign: "center",
//     fontSize: 17,
//   },
// });

export default ErrorModal;
