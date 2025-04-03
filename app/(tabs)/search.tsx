import React from "react";
import { images } from "@/constants/images";
import { Text, View, Image, FlatList, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { updateSearchCount } from "@/services/appWrite";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({
    query: searchQuery
  }), false);


  useEffect(() => {
    
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);


  useEffect(() => {
    if (movies?.[0] && movies?.length > 0) {
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="w-full flex-1 absolute z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieCard {...item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        className="px-5"
        ListHeaderComponent={
          <>
            <View className="flex-row w-full mt-20 items-center justify-center">

              <Image source={icons.search} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search movies.."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {loading && (
              <ActivityIndicator size="large" color="#0000ff" className="my-3" />
            )}
            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error?.message}
              </Text>
            )}
            {!loading && !error &&
              searchQuery.trim() && movies?.length > 0 &&
              <Text className="text-white text-lg font-bold px-5 my-3">
                Search Result for{' '}
                <Text className="text-accent">
                  {searchQuery}
                </Text>
              </Text>
            }
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="flex-1 items-center justify-center">
              <Text className="text-gray-500 text-center">
                {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
