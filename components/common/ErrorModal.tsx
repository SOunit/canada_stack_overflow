import { Card, Button } from "react-native-elements";
import { StyleSheet } from "react-native";
const ErrorModal = (props: any) => {
  const removeErrorModalHandler = (e: any) => {
    e.preventDefault();
    props.onRemove();
  };
  return (
    <div>
      <div
        onClick={removeErrorModalHandler}
        style={{
          position: "fixed",
          width: "100%",
          height: "100vh",
          top: "0",
          left: "0",
          zIndex: "10",
          background: "rgba(0,0,0,0.75)",
        }}
      ></div>
      <div style={{ position: "absolute", zIndex: "12", margin: "-5rem" }}>
        <Card
          containerStyle={{
            width: "90%",
            backgroundColor: "rgb(255,186,185)",
          }}
        >
          <h5 style={{ color: "red", textAlign: "center" }}>{props.text}</h5>
          <Button title="OK" onPress={removeErrorModalHandler}></Button>
        </Card>
      </div>
    </div>
  );
};

// the style part not working!!!
// const styles = StyleSheet.create({
//   text: {
//     color: "red",
//     textAlign: "center",
//   },
// });

export default ErrorModal;
