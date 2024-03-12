import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';

export default function Header() {

    const { user } = useUser();

    console.log(user)

  return (
    <View>
        <View className="flex flex-row items-center gap-2">
            <Image 
                source={{uri:user?.imageUrl}}
                className=" rounded-full w-12 h-12"
            />
            <View>
                <Text className="text-[16px]">Welcome</Text>
                <Text className=" text-[20px] font-bold">{user?.fullName}</Text>
            </View>
        </View>

        <View className=" bg-white py-3 border-[1px] border-blue-500 flex items-center flex-row px-5 mt-5 rounded-full shadow-lg">
            <Ionicons name="search" size={24} color="gray" />
             <TextInput 
                className="flex-1 text-[18px] pl-2 "
                placeholder='Search...'
             />
        </View>
    </View>
  )
}