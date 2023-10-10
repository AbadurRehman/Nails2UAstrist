import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Touchable,
  TextInput,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Container from "../../components/Container";
import ResponsiveText from "../../components/ResponsiveText";
import { wp } from "../../components/Responsiveness";
import Header from "../../components/Header";
import Folio from "../../components/Folio";
import Fonts from "../../theme/fonts";
import Colors from "../../theme/Colors";
import { getPortfolioDetails, getImages, deleteImage, postUploadImage, editUploadImage } from "../../utils/Actions";
import LottieView from "lottie-react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const DataSet2 = [
  {
    id: "1",
    title: "Gel treatment",

    image: require("../../assets/images/reshape.png"),
  },
  {
    id: "2",
    title: "Reshape Nails",
    image: require("../../assets/images/suggest1.png"),
  },
  {
    id: "3",
    title: "Acrylic Nails",
    image: require("../../assets/images/reshape1.png"),
  },
  {
    id: "4",
    title: "French manicure",
    image: require("../../assets/images/reshape2.png"),
  },
  {
    id: "5",
    title: "Gel treatment",

    image: require("../../assets/images/reshape.png"),
  },
  {
    id: "6",
    title: "Reshape Nails",
    image: require("../../assets/images/suggest1.png"),
  },
];
const Potfolio = (props) => {
  const [portfolioDetails, setPortfolioDetails] = useState({});
  const [images, setImages] = useState([]);
  const [pageLoad, setPageLoad] = useState(true);
  const [pageLoadDelete, setPageLoadDelete] = useState(false);
  const [Imageindex, setImageindex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [imageTitle, setimageTitle] = useState("");
  const [editid, setEditid] = useState("");

  const promise1 = new Promise(async (resolve, reject) => {
    await getPortfolioDetails(async (res) => {
      if (res.errors.length) {
        if (typeof res.errors == "string") {
          reject(res.errors);
        } else {
          reject(res.errors[0]);
        }
      } else {
        resolve(res.records);
      }
    });
  });

  const promise2 = new Promise(async (resolve, reject) => {
    await getImages(async (res) => {
      if (res.errors.length) {
        if (typeof res.errors == "string") {
          reject(res.errors);
        } else {
          reject(res.errors[0]);
        }
      } else {
        resolve(res.records);
      }
    });
  });

  useEffect(() => {
    const fetchData = async () => {
      Promise.all([promise1, promise2])
        .then((values) => {
          setPortfolioDetails(values[0]);
          setImages(values[1]);
          setPageLoad(false);
        })
        .catch((err) => {
          alert(err);
        });
    };

    fetchData().catch(console.error);
  }, []);

  const onDeleteImage = async (id, i) => {
    setImageindex(i);
    setPageLoadDelete(true);
    await deleteImage(id, async (res) => {
      setPageLoadDelete(false);
      setImageindex(null);
      if (res.errors.length) {
        if (typeof res.errors == "string") {
          alert(res.errors);
        } else {
          alert(res.errors[0]);
        }
      } else {
        const filteredItems = images.slice(0, i).concat(images.slice(i + 1, images.length));
        setImages(filteredItems);
      }
    });
  };

  const onUploadImage = async (imageObj) => {
    const data = {
      title: imageTitle,
      image_url: imageObj[0],
    };

    await postUploadImage(data, async (res) => {
      if (res.errors.length) {
        if (typeof res.errors == "string") {
          alert(res.errors);
        } else {
          alert(res.errors[0]);
        }
      } else {
        setimageTitle("");
        await getImages(async (res) => {
          if (res.errors.length) {
            if (typeof res.errors == "string") {
              alert(res.errors);
            } else {
              alert(res.errors[0]);
            }
          } else {
            setImages(res.records);
          }
        });
      }
    });
  };

  const editPotifilio = async (imageObj) => {
    const data = {
      title: imageTitle,
      image_url: imageObj[0],
      portfolio_id: editid,
    };

    await editUploadImage(data, async (res) => {
      if (res.errors.length) {
        if (typeof res.errors == "string") {
          alert(res.errors);
        } else {
          alert(res.errors[0]);
        }
      } else {
        setimageTitle("");
        await getImages(async (res) => {
          if (res.errors.length) {
            if (typeof res.errors == "string") {
              alert(res.errors);
            } else {
              alert(res.errors[0]);
            }
          } else {
            setImages(res.records);
          }
        });
      }
    });
  };

  const launchCam = () => {
    launchCamera(
      {
        mediaType: "photo",
        storageOptions: {
          // skipBackup: true,
          // path: 'Pictures/myAppPicture/', //-->this is neccesary
          privateDirectory: true,
        },
      },
      (response) => {
        if (response["didCancel"]) {
          setModalVisible(false);
        } else {
          if (editid != "") {
            editPotifilio(response["assets"]);
          } else {
            onUploadImage(response["assets"]);
          }
          setModalVisible(false);
        }
      }
    );
  };
  const launchGal = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        storageOptions: {
          // skipBackup: true,
          // path: 'Pictures/myAppPicture/', //-->this is neccesary
          privateDirectory: true,
        },
      },
      (response) => {
        if (response["didCancel"]) {
          setModalVisible(false);
        } else {
          if (editid != "") {
            editPotifilio(response["assets"]);
          } else {
            onUploadImage(response["assets"]);
          }
          setModalVisible(false);
        }
      }
    );
  };

  if (pageLoad) {
    return (
      <View
        style={{
          flex: 1,
          borderRadius: 10,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottieView
          style={{ width: wp(20), height: wp(20) }}
          source={require("../../assets/loader.json")}
          autoPlay
          loop
        />
      </View>
    );
  } else {
    return (
      <Container>
        <Header {...props} title={"PORTFOLIO"} />
        <ScrollView>
          <View style={{ paddingHorizontal: wp(5), paddingVertical: wp(5) }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <ResponsiveText style={{ fontFamily: Fonts.NunitoBold, fontSize: 4.5 }}>
                {portfolioDetails.username}
              </ResponsiveText>
              <View style={{ flexDirection: "row" }}>
                <ResponsiveText style={{ fontFamily: Fonts.NunitoBold, fontSize: 4.5 }}>
                  {Number(portfolioDetails.rating).toFixed(1)}
                </ResponsiveText>
                <Image
                  style={{ marginLeft: 10, width: wp(4), height: wp(4) }}
                  source={require("../../assets/images/red_star.png")}
                />
              </View>
            </View>

            <ResponsiveText style={{ fontSize: 3.5, marginVertical: wp(2) }}>
              Total Jobs Done{"         "}
              {portfolioDetails["Jobs done"]}
            </ResponsiveText>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: wp(5),
              }}
            >
              <ResponsiveText style={{ fontFamily: Fonts.NunitoBold, fontSize: 4.5 }}>Portfolio</ResponsiveText>
              <TouchableOpacity
                style={{
                  borderStyle: "dashed",
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: Colors.DarkGrey,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: wp(1),
                  width: wp(17),
                  height: wp(7),
                }}
                onPress={() => {
                  // setImagePic(!imagePic);
                  setModalVisible(true);
                }}
              >
                <Image source={require("../../assets/images/Plus.png")} />
                <ResponsiveText style={{ fontSize: 3.5 }}>Upload</ResponsiveText>
              </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
              {images?.length > 0 &&
                images?.map((item, index) => (
                  <View key={index}>
                    <Folio
                      item={item}
                      Imageindex={Imageindex}
                      pageLoadDelete={pageLoadDelete}
                      index={index}
                      Images={images}
                      deleteImage={onDeleteImage}
                      editPotfoilo={(id, name) => {
                        setimageTitle(name);
                        setEditid(id);
                        setModalVisible(true);
                      }}
                    />
                  </View>
                ))}
            </View>
          </View>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
            setEditid("");
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              setEditid("");
            }}
            activeOpacity={0.9}
            style={styles.modalContainer}
          >
            <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={1} style={styles.modalContent}>
              <View style={styles.modalInner}>
                <View style={styles.container}>
                  <TextInput
                    style={{
                      fontSize: 12,
                      paddingHorizontal: 20,
                      borderRadius: wp(6),
                      backgroundColor: "#F8F8F8",
                      borderWidth: 1,
                      borderColor: "#D4D3D3",
                      width: wp(70),
                      height: wp(11),
                      alignItems: "center",
                      color: "black",
                    }}
                    value={imageTitle}
                    placeholderTextColor="gray"
                    onChangeText={(text) => setimageTitle(text)}
                    placeholder="Enter Title"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 20,
                    // borderWidth: 1,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.Primary,
                      paddingVertical: 10,
                      borderRadius: wp(2),
                      width: wp(30),
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: wp(2),
                    }}
                    onPress={() => {
                      launchCam();
                      setModalVisible(false);
                    }}
                  >
                    <Image style={styles.cameraImagewhite} source={require("../../assets/images/camera.png")} />
                    <ResponsiveText style={styles.font}>Picture</ResponsiveText>
                  </TouchableOpacity>
                  <View style={styles.imageUpload} />

                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.Primary,
                      paddingVertical: 10,
                      borderRadius: wp(2),
                      alignItems: "center",
                      width: wp(30),
                      justifyContent: "center",
                      marginLeft: wp(2),
                    }}
                    onPress={() => {
                      launchGal();
                      setModalVisible(false);
                    }}
                  >
                    <Image style={styles.cameraImagewhite} source={require("../../assets/images/gallery.png")} />
                    <ResponsiveText style={styles.font}>Gallery</ResponsiveText>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </Container>
    );
  }
};
const styles = {
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  modalContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
  },
  saveChangesContainer: {
    backgroundColor: Colors.Primary,
    width: wp(30),
    height: wp(10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(2),
  },
  modalContent: {
    height: "30%",
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    // position: 'absolute',
    // bottom: wp(15),
  },
  imageUpload: {
    width: wp(0.5),
    height: wp(22),
    backgroundColor: "#2C3145",
    borderRadius: 10,
    // marginVertical: wp(5.5),
    marginHorizonal: wp(4),
  },
  font: {
    fontSize: 4,
    color: "white",
  },

  cameraImagewhite: {
    tintColor: "white",
    resizeMode: "contain",
    width: wp(5.5),
    height: wp(5.5),
    // marginRight: wp(2),
    marginBottom: wp(2),
  },
};
export default Potfolio;
