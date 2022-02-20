import { useSelector } from "react-redux";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, Card } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import firebaseApp from "../../firebase-app";
import { useEffect } from "react";

const PostDetail = ({ navigation }) => {
  // for toggle comment good button
  const userId = useSelector((state) => state.auth.userId);

  const postId = navigation.getParam("id");

  // set params to pass to navigator
  useEffect(() => {
    navigation.setParams({ postId });
  }, [postId]);

  const selectedPost = useSelector((state) => state.posts)[postId];

  const toggleVoteHandler = (commentId: string) => {
    // voteUserIdList not exist, add user
    if (!selectedPost.comments[commentId].voteUserIdList) {
      firebaseApp.update(`/posts/${postId}/comments/${commentId}`, {
        voteUserIdList: [userId],
        voteCount: 1,
      });
      return;
    }

    // voteUserIdList exist
    const voteUserIdList = [...selectedPost.comments[commentId].voteUserIdList];
    let body;
    if (voteUserIdList.includes(userId)) {
      body = {
        voteUserIdList: voteUserIdList.filter((id: string) => id !== userId),
        voteCount: selectedPost.comments[commentId].voteCount - 1,
      };
    } else {
      body = {
        voteUserIdList: voteUserIdList.concat(userId),
        voteCount: selectedPost.comments[commentId].voteCount + 1,
      };
    }

    firebaseApp.update(`/posts/${postId}/comments/${commentId}`, body);
  };

  let commentList = [];
  for (let id in selectedPost.comments) {
    commentList.push(
      <Card key={id} containerStyle={{ marginTop: 15 }}>
        <Text>{selectedPost.comments[id].text}</Text>
        <Card.Divider style={styles.divider} />
        <TouchableOpacity
          style={[
            styles.thumbsButton,
            selectedPost.comments[id].voteUserIdList?.includes(userId)
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
              selectedPost.comments[id].voteUserIdList?.includes(userId)
                ? "#fff"
                : "#000"
            }
          />
          <Text
            style={{
              color: selectedPost.comments[id].voteUserIdList?.includes(userId)
                ? "#fff"
                : "#000",
            }}
          >
            {selectedPost.comments[id].voteCount}
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
