import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import Container from "../../components/Container";
import ResponsiveText from "../../components/ResponsiveText";
import Header from "../../components/Header";
import { Rating, AirbnbRating } from "react-native-ratings";
import { wp } from "../../components/Responsiveness";
import Colors from "../../theme/Colors";
import ArtistReviews from "../../components/ArtistReviews";
import Fonts from "../../theme/fonts";
import { getRatings } from "../../utils/Actions";
import LottieView from "lottie-react-native";

const Reviews = (props) => {
  const [data, setData] = useState([]);
  const [allRatings, setAllRatings] = useState(0);
  const [pageLoad, setPageLoad] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getRatings(async (res) => {
        setPageLoad(false);
        if (res.errors.length) {
          if (typeof res.errors == "string") {
            alert(res.errors);
          } else {
            alert(res.errors[0]);
          }
        } else {
          setAllRatings(res.records.overall_rating);
          setData(res.records.ratings);
        }
      });
    };
    fetchData().catch(console.error);
  }, []);

  if (pageLoad) {
    return (
      <View
        style={{ flex: 1, borderRadius: 10, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}
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
        <Header {...props} title={"REVIEWS & FEEDBACK"} />
        <ScrollView>
          <View style={{ alignItems: "center", paddingVertical: wp(5) }}>
            <ResponsiveText style={{ fontSize: 4.5, color: Colors.DarkGrey }}>Overall Rating</ResponsiveText>
            <ResponsiveText style={{ marginTop: wp(5), fontSize: 12, color: "black" }}>
              {allRatings ? allRatings.toFixed(1) : 0}
            </ResponsiveText>
            <AirbnbRating
              size={25}
              defaultRating={allRatings ? allRatings : 0}
              showRating={false}
              selectedColor={"#FF5050"}
            />
            <ResponsiveText style={{ marginTop: wp(1), fontSize: 3.5 }}>Based on {data?.length} Reviews</ResponsiveText>
          </View>
          <View style={{ paddingHorizontal: wp(5) }}>
            <ResponsiveText
              style={{
                fontFamily: Fonts.NunitoBold,
                fontSize: 4,
                marginVertical: wp(5),
              }}
            >
              Customer Reviews
            </ResponsiveText>
            {data &&
              data.map((item, index) => (
                <View key={index}>
                  <ArtistReviews
                    index={index}
                    onPress={() => {
                      props.navigation.navigate("BookArtist", {
                        item: item.title,
                      });
                    }}
                    item={item}
                  />
                </View>
              ))}
          </View>
        </ScrollView>
      </Container>
    );
  }
};

export default Reviews;
