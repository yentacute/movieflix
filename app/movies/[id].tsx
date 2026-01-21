import { icons } from "@/assets/constants/icons";
import { fetchMovieDetails, genreMovieList } from "@/services/api";
import useFetch from "@/services/useFetch";

import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MovieDetails = () => {
  interface MovieCard {
    label: string;
    value: string | number | React.ReactNode;
    type?: string;
    textStyle?: string;
    cardStyle?: string;
  }
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() => fetchMovieDetails(id));
  const { data: genreList } = useFetch(() => genreMovieList());

  const MovieInfo = ({
    label,
    value,
    type = "text",
    textStyle,
    cardStyle,
  }: MovieCard) => {
    return (
      <View
        className={`flex-col gap-y-1 mt-6 items-start justify-start text-left ${cardStyle}`}
      >
        <Text className="text-light-200 text-sm">{label}</Text>
        {type === "text" ? (
          <Text className={textStyle ?? "text-sm text-white"}>{value}</Text>
        ) : (
          value
        )}
      </View>
    );
  };
  const router = useRouter();
  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBlockEnd: 32 }}>
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
          <View className="flex-row items-start justify-between w-full">
            <MovieInfo label="Release date" value={movie?.release_date} />
            <MovieInfo
              label="Status"
              value={movie?.status}
              textStyle="font-bold text-light-200"
              cardStyle="w-1/2"
            />
          </View>
          <MovieInfo
            label="Generes"
            value={
              <FlatList
                data={genreList}
                horizontal={false}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                numColumns={6}
                columnWrapperStyle={{ gap: 8 }}
                contentContainerStyle={{ gap: 8 }}
                ItemSeparatorComponent={() => <View className="" />}
                renderItem={({ item }) => (
                  <Text className="text-white bg-white/20 rounded-md text-xs p-1">
                    {item.name}
                  </Text>
                )}
                keyExtractor={(item) => item.id.toString()}
                className="overflow-hidden"
              />
            }
            textStyle="font-bold text-light-200"
          />
          <MovieInfo
            label="Countries"
            value={
              <FlatList
                data={movie?.production_companies || []}
                horizontal={false}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                numColumns={3}
                columnWrapperStyle={{ gap: 8 }}
                contentContainerStyle={{ gap: 8 }}
                ItemSeparatorComponent={() => <View className="" />}
                renderItem={({ item }) => (
                  <Text className="font-bold text-light-100 text-xs p-1">
                    {item.name}
                  </Text>
                )}
                keyExtractor={(item) => item.iso_3166_1}
                className="overflow-hidden"
              />
            }
            textStyle="font-bold text-light-200"
          />
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-light-100 w-full h-10 flex-row items-center justify-center gap-2 mt-6 rounded-md leading-10"
          >
            <Text className="font-semibold">Visit Homepage</Text>
            <Image source={icons.arrow} className="size-5" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
