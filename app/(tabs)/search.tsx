import { icons } from "@/assets/constants/icons";
import { images } from "@/assets/constants/images";
import MovieCard from "@/components/MovieCard";
import Searchbar from "@/components/Searchbar";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }));

  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeOutId);
  }, [searchQuery]);
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 0 }}
        ListHeaderComponent={
          <>
            <View>
              <Image
                source={icons.logo}
                className="w-12 h-10 mt-20 mb-5 mx-auto"
              />
              <Searchbar
                placeholder="Search through 300+ movies online"
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}

            {!loading &&
              !error &&
              "SEARCH TERMS".trim() &&
              data?.length > 0 && (
                <View className="flex-row items-center mb-4">
                  <Text className=" text-xl text-white">
                    Search results for
                  </Text>
                  <Text className="text-accent ml-1 text-xl font-bold">{searchQuery.toUpperCase()} </Text>
                </View>
              )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className=" px-5  flex-1 items-center justify-center h-full">
              <Text className="text-gray-500 text-md">
                {searchQuery.trim() ? "No results found" : "Search for movies"}
              </Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => <MovieCard {...item} />}
        className="px-5"
      />
    </View>
  );
}
