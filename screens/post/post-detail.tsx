import { useSelector } from "react-redux";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, Card } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import firebaseApp from "../../firebase-app";

const PostDetail = ({ navigation }) => {
  // for toggle comment good button
  const userId = useSelector((state) => state.auth.userId);

  const postId = navigation.getParam("id");
  const selectedPost = useSelector((state) => state.posts)[postId];

  // const descendVoteSort = (arr) => {
  //   return arr.sort(
  //     (a, b) =>
  //       b[value].votedUserIdList.length - a[value].votedUserIdList.length
  //   );
  // };

  const toggleVoteHandler = (commentId: string) => {
    const votedUserIdList = [
      ...selectedPost.comments[commentId].votedUserIdList,
    ];

    let body;
    if (votedUserIdList.includes(userId)) {
      body = {
        votedUserIdList: votedUserIdList.filter((id: string) => id !== userId),
      };
    } else {
      body = { votedUserIdList: votedUserIdList.concat(userId) };
    }

    firebaseApp.update(`/posts/${postId}/comments/${commentId}`, body);
  };

  let commentList = [];
  for (let id in selectedPost.comments) {
    commentList.push(
      <Card key={id} containerStyle={{ marginTop: 15 }}>
        <Text>{selectedPost.comments[id].comment}</Text>
        <Card.Divider style={styles.divider} />
        <TouchableOpacity
          style={[
            styles.thumbsButton,
            selectedPost.comments[id].votedUserIdList.includes(userId)
              ? styles.clicked
              : styles.unClicked,
          ]}
          onPress={() => toggleVoteHandler(id)}
        >
          <Feather
            name="thumbs-up"
            size={15}
            style={{ marginRight: 5 }}
            color={
              selectedPost.comments[id].votedUserIdList.includes(userId)
                ? "#fff"
                : "#000"
            }
          />
          <Text
            style={{
              color: selectedPost.comments[id].votedUserIdList.includes(userId)
                ? "#fff"
                : "#000",
            }}
          >
            {selectedPost.comments[id].votedUserIdList.length - 1}
          </Text>
        </TouchableOpacity>
      </Card>
    );
  }

  return (
    <ScrollView>
      <Text h1 style={{ textAlign: "center" }}>
        {selectedPost.title}
      </Text>
      {commentList}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  divider: {
    marginTop: 15,
  },
  thumbsButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  clicked: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: Colors.primary,
  },
  unClicked: {
    borderWidth: 1,
  },
});

export default PostDetail;
