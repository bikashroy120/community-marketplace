import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

const db = getFirestore(app);
export default function AddPostScreen() {
  const [categoryList, setCategoryList] = useState([]);
  const [image, setImage] = useState(null);
  const storage = getStorage();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
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

  const handelSubmit = async (value, { resetForm }) => {
    setLoading(true);
    try {
      console.log(value);

      // Upload image to Firebase Storage
      const resp = await fetch(image);
      const blob = await resp.blob();
      const storageRef = ref(storage, "communityPost/" + Date.now() + ".jpg");
      const snapshot = await uploadBytes(storageRef, blob);

      // Get download URL of the uploaded image
      const downloadUrl = await getDownloadURL(storageRef);

      // Add additional form data
      value.image = downloadUrl;
      value.userName = user?.fullName;
      value.userEmail = user?.primaryEmailAddress?.emailAddress;
      value.userImage = user?.imageUrl;

      // Add form data to Firestore collection
      const docRef = await addDoc(collection(db, "UserPost"), value);

      if (docRef.id) {
        Alert.alert("Success!!!", "Post add success!");
        setLoading(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error handling form submission:", error);
      throw error; // Re-throw the error to be caught by the caller
      setLoading(false);
    }
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ marginTop: 50, marginBottom: 20, paddingHorizontal: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 25 }}>Add New Post</Text>
        <Text style={{ color: "gray" }}>Create New and Start Selling</Text>
        <Formik
          initialValues={{
            name: "",
            category: "",
            desc: "",
            address: "",
            price: "",
            userName: "",
            userEmail: "",
            userImage: "",
          }}
          validate={(values) => {
            const errors = {};

            if (!values.name) {
              errors.name = "Title is required";
            }

            if (!values.category) {
              errors.category = "Category is required";
            }

            if (!values.desc) {
              errors.desc = "Description is required";
            }

            if (!values.price) {
              errors.price = "Price is required";
            } else if (isNaN(values.price)) {
              errors.price = "Price must be a number";
            }

            if (!values.address) {
              errors.address = "Address is required";
            }

            return errors;
          }}
          onSubmit={handelSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
            errors,
          }) => (
            <View>
              <TouchableOpacity
                onPress={() => pickImage()}
                style={{ marginVertical: 10 }}
              >
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

              <View style={{ marginBottom: 10 }}>
                <TextInput
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values?.name}
                  style={styles.input}
                  placeholder="Title"
                />
                {errors.name && (
                  <Text style={styles.error} className="text-red-500">
                    {errors.name}
                  </Text>
                )}
              </View>
              <View style={{ marginBottom: 10 }}>
                <TextInput
                  onChangeText={handleChange("desc")}
                  onBlur={handleBlur("desc")}
                  value={values?.desc}
                  style={styles.input}
                  numberOfLines={5}
                  placeholder="Description"
                />
                {errors.desc && (
                  <Text style={styles.error} className="text-red-500">
                    {errors.desc}
                  </Text>
                )}
              </View>
              <View style={{ marginBottom: 10 }}>
                <TextInput
                  onChangeText={handleChange("price")}
                  onBlur={handleBlur("price")}
                  value={values?.price}
                  style={styles.input}
                  placeholder="Price"
                  keyboardType="number-pad"
                />
                {errors.price && (
                  <Text style={styles.error} className="text-red-500">
                    {errors.price}
                  </Text>
                )}
              </View>

              <View
                style={{ borderWidth: 1, borderRadius: 10, marginBottom: 10 }}
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
              <View style={{ marginBottom: 10 }}>
                <TextInput
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                  value={values?.address}
                  style={styles.input}
                  placeholder="Address"
                />
                {errors.address && (
                  <Text style={styles.error} className="text-red-500">
                    {errors.address}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                onPress={() => handleSubmit()}
                disabled={loading}
                style={{
                  backgroundColor: loading ? "#ccc":"blue",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                {loading ? (
                  <ActivityIndicator color={"#fff"} />
                ) : (
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 18,
                    }}
                  >
                    Submit
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
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
  error: {
    color: "red",
  },
});
