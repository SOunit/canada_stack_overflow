import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native";
import { Text } from "react-native-elements";
import firebaseApp from "../../firebase-app";
import { useEffect } from "react";
import * as postActions from "../../store/actions/posts";
import CommentCard from "../../components/organisms/comment-card";
import { Comment } from "../../models/comment";

const PostDetail = ({ navigation }) => {
  const dispatch = useDispatch();

  // for toggle comment good button
  const userId = useSelector((state) => state.auth.userId);
  const postId = navigation.getParam("id");
  const selectedPost = useSelector((state) => state.posts)[postId];

  // set params to pass to navigator
  useEffect(() => {
    navigation.setParams({ postId });
  }, [postId]);

  const toggleVoteHandler = (commentId: string) => {
    // voteUserIdList not exist, add user

    // update firebase
    if (!selectedPost.comments[commentId].voteUserIdList) {
      // update redux state
      dispatch(postActions.updateVote(postId, commentId, userId, true));

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

      // update redux state
      dispatch(postActions.updateVote(postId, commentId, userId, false));
    } else {
      body = {
        voteUserIdList: voteUserIdList.concat(userId),
        voteCount: selectedPost.comments[commentId].voteCount + 1,
      };

      // update redux state
      dispatch(postActions.updateVote(postId, commentId, userId, true));
    }

    firebaseApp.update(`/posts/${postId}/comments/${commentId}`, body);
  };

  const descendVoteSort = (arr: { id: string; data: Comment }[]) => {
    return arr.sort((a, b) => b.data.voteCount - a.data.voteCount);
  };

  const getOrderedComments = (comments: Comment[]) => {
    let commentList = [];
    for (let id in comments) {
      commentList.push({ id, data: comments[id] });
    }
    if (commentList.length > 0) {
      commentList = descendVoteSort(commentList);
    }
    return commentList;
  };

  let commentList = getOrderedComments(selectedPost.comments);

  return (
    <ScrollView>
      <Text h1 style={{ textAlign: "center" }}>
        {selectedPost.title}
      </Text>
      {commentList.map((comment: { id: string; data: Comment }) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          onToggleVote={toggleVoteHandler}
          userId={userId}
        />
      ))}
    </ScrollView>
  );
};

export default PostDetail;
