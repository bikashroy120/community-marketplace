import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';


WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {

    useWarmUpBrowser();
 
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
     
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);

  return (
    <View>
        <Image 
            source={require("./../../assets/image/loginScreen.jpg")}
            className=" w-full h-[400px] object-cover"
        />
        <View className=" p-8 bg-white mt-[-20px] rounded-t-3xl">
                <Text className="text-[25px] font-bold mb-3">Community MarketPlace</Text>
                <Text className="font-semibold text-[14px] text-gray-500">Buy Sell Marketplace where you can sell old item and make real money</Text>
                <TouchableOpacity onPress={onPress} className=" mt-20 py-3 px-4 bg-blue-500 text-white text-center rounded-full">
                    <Text className="text-white text-center font-bold text-[18px]">Get Started</Text>
                </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({})