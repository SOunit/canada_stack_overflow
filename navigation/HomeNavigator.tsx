import { Platform, TouchableOpacity } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";
import CustomHeaderButton from "../components/common/CustomHeaderButton";
import PostList from "../screens/PostList";
import PostDetail from "../screens/PostDetail";
import CommentCreate from "../screens/CommentCreate";
import defaultNavOptions from "./defaultNavOptions";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import createPost from "../screens/post/create-post";
import { POST_LIST } from "../constants/screen-names";

const menuButton = (navigation) => (
  <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    <Item
      title="Menu"
      iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
      onPress={() => {
        navigation.toggleDrawer();
      }}
    />
  </HeaderButtons>
);

const HomeNavigator = createStackNavigator(
  {
    [POST_LIST]: {
      screen: PostList,
      navigationOptions: ({ navigation }) => {
        return {
          title: "Post List",
          headerLeft: () => menuButton(navigation),
          headerRight: () => (
            <TouchableOpacity
              style={{ alignItems: "center", marginRight: 20 }}
              onPress={() => navigation.navigate("CreatePost")}
            >
              <FontAwesome
                name="pencil-square-o"
                size={24}
                color={Platform.OS === "android" ? "white" : Colors.primary}
              />
            </TouchableOpacity>
          ),
        };
      },
    },
    CreatePost: {
      screen: createPost,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: () => (
            <HeaderBackButton
              tintColor={Platform.OS === "android" ? "white" : Colors.primary}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        };
      },
    },
    PostDetail: {
      screen: PostDetail,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: () => (
            <HeaderBackButton
              tintColor={Platform.OS === "android" ? "white" : Colors.primary}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ alignItems: "center", marginRight: 20 }}
              onPress={() => navigation.navigate("CommentCreate")}
            >
              <FontAwesome
                name="pencil-square-o"
                size={24}
                color={Platform.OS === "android" ? "white" : Colors.primary}
              />
            </TouchableOpacity>
          ),
        };
      },
    },
    CommentCreate: {
      screen: CommentCreate,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: () => (
            <HeaderBackButton
              tintColor={Platform.OS === "android" ? "white" : Colors.primary}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        };
      },
    },
  },
  { defaultNavigationOptions: defaultNavOptions }
);

export default HomeNavigator;
