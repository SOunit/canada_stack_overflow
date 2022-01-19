import { View, StyleSheet } from "react-native";
import { Input, Button, Card } from "react-native-elements";

const PostCreate = () => {
  return (
    <Card>
      <Input placeholder="Answer" multiline style={styles.input} />
      <Button title="Post" containerStyle={{ marginHorizontal: 10 }} />
    </Card>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 20,
    paddingHorizontal: 5,
  },
});

export default PostCreate;
