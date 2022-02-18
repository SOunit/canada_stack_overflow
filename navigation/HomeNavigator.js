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
    PostList: {
      screen: PostList,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: () => menuButton(navigation),
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
          headerRight: (
            <TouchableOpacity
              style={{ alignItems: "center", marginRight: 20 }}
              onPress={() => navigation.navigate("CommentCreate")}
            >
              <FontAwesome name="pencil-square-o" size={24} color="#fff" />
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
