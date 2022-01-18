import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";

const PostDetail = ({ navigation }) => {
  const posts = useSelector((state) => state.posts);
  const id = navigation.getParam("id");

  console.log("==============================================", posts);

  return (
    <View>
      <Text>PostDetail</Text>
      <Text>{id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PostDetail;
