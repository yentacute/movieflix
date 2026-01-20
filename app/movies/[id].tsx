import { icons } from "@/assets/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const MovieDetails = () => {
  interface MovieCard {
    label: string;
    value: string | number | undefined;
  }
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() => fetchMovieDetails(id));
  const MovieInfo = ({ label, value }: MovieCard) => {
    return (
      <View className="flex-col gap-y-1 mt-6 w-full">
        <Text className="text-light-200 text-sm">{label}</Text>
        <Text className="text-white">{value}</Text>
      </View>
    );
  };
  return (
    <View className="bg-primary flex-1">
      <ScrollView>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          ></Image>
        </View>
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-2 mt-1.5">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>
          <View>
            <View className="flex-row items-center gap-2 bg-white/15 px-3 py-1 rounded-md mt-3">
              <Image source={icons.star} className="size-3.5" />
              <Text className="text-white text-sm font-bold">
                {Math.round((movie?.vote_average || 0) * 10) / 10} / 10
              </Text>
              <Text className="text-light-200 text-sm ">
                ({movie?.vote_count} votes)
              </Text>
            </View>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
