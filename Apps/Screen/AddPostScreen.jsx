import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

const db = getFirestore(app);
export default function AddPostScreen() {
  const [categoryList, setCategoryList] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    getCategoryData();
  }, []);

  console.log(image);

  const getCategoryData = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc);
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  //  ==== image picker funcation ======
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handelSubmit = (value)=>{
    value.image = image;
    console.log(value)
  }


  return (
    <View className=" mt-10 p-5">
      <Text className=" font-bold text-[25px]">Add New Post</Text>
      <Text className=" text-gray-500">Create New and Start Selling</Text>
      <Formik
        initialValues={{
          name: "",
          category: "",
          desc: "",
          address: "",
          price: "",
        }}
        onSubmit={(values) => handelSubmit(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
        }) => (
          <View>
            <TouchableOpacity onPress={() => pickImage()} className=" my-3">
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 120,
                    height: 100,
                    borderRadius: 15,
                    backgroundColor: "gray",
                  }}
                />
              ) : (
                <Image
                  source={require("../../assets/image/image-gallery.jpg")}
                  style={{
                    width: 120,
                    height: 100,
                    borderRadius: 15,
                    backgroundColor: "gray",
                  }}
                />
              )}
            </TouchableOpacity>

            <TextInput
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values?.name}
              style={styles.input}
              placeholder="Title"
            />
            <TextInput
              onChangeText={handleChange("desc")}
              onBlur={handleBlur("desc")}
              value={values?.desc}
              style={styles.input}
              numberOfLines={5}
              placeholder="Description"
            />
            <TextInput
              onChangeText={handleChange("price")}
              onBlur={handleBlur("price")}
              value={values?.price}
              style={styles.input}
              placeholder="Price"
              keyboardType="number-pad"
            />

            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 10,
                marginBottom: 5,
              }}
            >
              <Picker
                selectedValue={values?.category}
                onValueChange={(itemValue) =>
                  setFieldValue("category", itemValue)
                }
              >
                {categoryList &&
                  categoryList.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item?.name}
                      value={item?.name}
                    />
                  ))}
              </Picker>
            </View>

            <TextInput
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              value={values?.address}
              style={styles.input}
              placeholder="Address"
            />
            {/* <Button onPress={handleSubmit} title="Submit" /> */}
            <TouchableOpacity className="py-3 px-5 bg-blue-500 rounded-[10px] mt-5">
              <Text className=" text-white text-center font-semibold text-[18px]">
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 17,
    fontSize: 17,
    paddingTop: 15,
    marginTop: 10,
    marginBottom: 5,
    textAlignVertical: "top",
  },
});
