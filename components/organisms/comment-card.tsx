import { Feather } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-elements";
import Colors from "../../constants/Colors";
import { Comment } from "../../models/comment";

const CommentCard = ({
  comment,
  onToggleVote,
  userId,
}: {
  comment: { id: string; data: Comment };
  onToggleVote: (commentId: string) => void;
  userId: string;
}) => {
  return (
    <Card key={comment.id} containerStyle={{ marginTop: 15 }}>
      <Text>{comment.data.text}</Text>
      <Card.Divider style={styles.divider} />
      <TouchableOpacity
        style={[
          styles.thumbsButton,
          comment.data.voteUserIdList?.includes(userId)
            ? styles.clicked
            : styles.unClicked,
        ]}
        onPress={() => onToggleVote(comment.id)}
      >
        <Feather
          name="thumbs-up"
          size={15}
          style={{ marginRight: 5 }}
          color={
            comment.data.voteUserIdList?.includes(userId) ? "#fff" : "#000"
          }
        />
        <Text
          style={{
            color: comment.data.voteUserIdList?.includes(userId)
              ? "#fff"
              : "#000",
          }}
        >
          {comment.data.voteCount}
        </Text>
      </TouchableOpacity>
    </Card>
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

export default CommentCard;
