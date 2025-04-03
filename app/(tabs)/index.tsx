import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import SearchBar from "@/components/SearchBar";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React from "react";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appWrite";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError
  } = useFetch(() => fetchMovies({
    query: ''
  }));

  // Track movie names to skip duplicates during rendering
  const seenMovieNames = React.useRef(new Set()).current;

  // Clear the set when trending movies change
  React.useEffect(() => {
    seenMovieNames.clear();
  }, [trendingMovies]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="w-full absolute z-0"
      />
      <ScrollView className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
      >
        <Image
          source={icons.logo}
          className="w-12 h-10 mt-20 mb-5 mx-auto"
        />

        {moviesLoading || trendingMoviesLoading ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
        ) : moviesError || trendingMoviesError ? (
          <Text className="text-red-500 text-center text-lg mt-10">
            Error: {moviesError?.message || trendingMoviesError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push('/search')}
              placeholder="Search for a movie"
            />
            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  data={trendingMovies}
                  className="mb-4 mt-3"
                  renderItem={({ item, index }) => {
                    // Skip rendering if we've seen this movie name before
                    if (seenMovieNames.has(item.title)) {
                      return null;
                    }

                    // Add the movie name to our set
                    seenMovieNames.add(item.title);

                    // Render the movie card
                    return <TrendingCard movie={item} index={index} />;
                  }}
                  keyExtractor={(item) => item.movie_id.toString()}
                />
              </View>
            )}
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                {/* {movies?.results.length} */}
                Latest Movies

              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => (
                  <MovieCard {...item} />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: 'flex-start',
                  marginBottom: 10,
                  gap: 20,
                  paddingRight: 10
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
