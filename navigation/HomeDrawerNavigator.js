import { View } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import defaultNavOptions from "./defaultNavOptions";
import HomeNavigator from "./HomeNavigator";
import * as authActions from "../store/actions/auth";

const HomeDrawerNavigator = createDrawerNavigator(
  {
    Home: HomeNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();

      return (
        <View style={{ flex: 1, padding: 5 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Logout"
              type="outline"
              onPress={() => {
                dispatch(authActions.logout());
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

export default HomeDrawerNavigator;
