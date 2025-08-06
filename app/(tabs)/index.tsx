import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import InfoScreen from "../../components/Screens/Intro/InfoScreen";
import SplashScreen from "../../components/Screens/Intro/SplashScreen";
import Signup from "../../components/Screens/Authentication/Signup";
import Login from "../../components/Screens/Authentication/Login";
import UserHome from "../../components/Screens/UserHome/UserHome";
import UserProfile from "../../components/Screens/UserHome/UserProfile";
import UserMenu from "../../components/Screens/UserHome/UserMenu";
import ContactUs from "../../components/Screens/UserHome/ContactUs";
import AboutUs from "../../components/Screens/UserHome/AboutUs";
import UserQuestionnaire from "../../components/Screens/UserHome/UserQuestionnaire";
import UserResults from "../../components/Screens/UserHome/UserResults";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const Stack = createNativeStackNavigator();
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState<"User" | null>(null);

  console.log("userType", userType);
  const checkAuthStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem("token");
      
      if (userToken) {
        setUserType("User");
      } else {
        setUserType(null);
      }
    } catch (error) {
      console.error("Error checking authentication status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF8613" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.Container}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userType === "User" ? (
          <>
            <Stack.Screen name="UserHome" component={UserHome} />
            <Stack.Screen name="UserMenu">
              {(props) => <UserMenu {...props} setUserType={setUserType} />}
            </Stack.Screen>
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="ContactUs" component={ContactUs} />
            <Stack.Screen name="UserQuestionnaire" component={UserQuestionnaire} />
            <Stack.Screen name="UserResults" component={UserResults} />
            <Stack.Screen name="AboutUs" component={AboutUs} />
          </>
        ) : (
          <>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="InfoScreen" component={InfoScreen} />
            <Stack.Screen name="Login">
              {(props) => <Login {...props} setUserType={setUserType} />}
            </Stack.Screen>
            <Stack.Screen name="Signup">
              {(props) => <Signup {...props} setUserType={setUserType} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  Container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingTop: Platform.OS === "ios" ? 50 : 38,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
