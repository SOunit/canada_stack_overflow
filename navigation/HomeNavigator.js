import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";
import CustomHeaderButton from "../components/common/CustomHeaderButton";
import PostList from "../screens/PostList";
import PostDetail from "../screens/PostDetail";
import defaultNavOptions from "./defaultNavOptions";
import Colors from "../constants/Colors";

const leftHeader = (navigation) => (
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
          headerLeft: leftHeader(navigation),
        };
      },
    },
    PostDetail: {
      screen: PostDetail,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: (
            <HeaderBackButton
              tintColor={Colors.primary}
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
