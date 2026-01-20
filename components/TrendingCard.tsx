import { icons } from "@/assets/constants/icons";
import { images } from "@/assets/constants/images";
import { genreMovieList } from "@/services/api";
import useFetch from "@/services/useFetch";
import { getMovieGenres } from "@/utils";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TrendingCard = ({
  movie: { movie_id, title, poster_url, vote_average, genre_ids },
  index,
}: TrendingCardProps) => {
  const { data: genreList } = useFetch(() => genreMovieList());

  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <View>
          <Image
            source={{ uri: poster_url }}
            className="w-30 h-48 rounded-lg"
            resizeMode="cover"
          />
          <View className="flex-row items-center gap-1 px-1 bg-white/50 absolute rounded-md top-2 right-2 h-4">
            <Image source={icons.star} className="size-2" />
            <Text className="text-white text-[8px]">
              {Math.round(vote_average * 10) / 10}
            </Text>
          </View>
          <View className="absolute bottom-0 -left-5 px-2 py-1 rounded-full z-1">
            <MaskedView
              maskElement={
                <Text className="text-white text-6xl font-bold">
                  {index + 1}
                </Text>
              }
            >
              <Image
                source={images.rankingGradient}
                className="size-14"
                resizeMode="cover"
              />
            </MaskedView>
          </View>
        </View>
        <Text className="text-white font-bold text-xs mt-2" numberOfLines={1}>
          {title}
        </Text>
        <Text
          className="text-light-300 font-bold text-[10px] mt-2"
          numberOfLines={1}
        >
          {getMovieGenres(genreList || [], genre_ids)}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;

const styles = StyleSheet.create({});
