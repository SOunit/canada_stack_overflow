import { useEffect, useRef } from "react";
import { NavigationActions } from "react-navigation";
import { useTypedSelector } from "../hooks/use-typed-selector";
import MainNavigator from "./main-navigator";

const NavigationContainer = () => {
  const isAuth = useTypedSelector((state) => !!state.auth.token);
  const navRef = useRef();

  useEffect(() => {
    if (!isAuth) {
      navRef.current?.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
    }
  }, [isAuth]);

  return <MainNavigator ref={navRef} />;
};

export default NavigationContainer;
