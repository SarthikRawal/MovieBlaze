import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams, router } from "expo-router";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center ">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">{value || 'N/A'}</Text>
  </View>
);

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() => {
    return fetchMovieDetails(id as string);
  });

  return (
    <View className="flex-1 bg-primary">
      <ScrollView>
        <View>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}` }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>
        <View className="px-5 mt-5 items-start justify-center flex-col">
          <Text className="text-white text-2xl font-bold">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-2 mt-2">
            <Text className="text-white text-sm">{movie?.release_date?.split('-')[0]}</Text>
            <Text className="text-white text-sm">{movie?.runtime} minutes</Text>
          </View>
          <View className="flex-row items-center gap-x-1 bg-dark-100 rounded-md px-2 py-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white text-sm">{Math.round((movie?.vote_average ?? 0) * 10) / 10}</Text>
            <Text className="text-light-300 text-sm">{movie?.vote_count} votes</Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo label="Genres" value={movie?.genres?.map((genre) => genre.name).join(', ') || 'N/A'} />
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo label="Budget" value={`$${Math.round(movie?.budget ?? 0) / 1_000_000}M` || 'N/A'} />
            <MovieInfo label="Revenue" value={`$${Math.round(movie?.revenue ?? 0) / 1_000_000}M` || 'N/A'} />
          </View>
          <MovieInfo label="Production Companies" value={movie?.production_companies?.map((company) => company.name).join(', ') || 'N/A'} />
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute bottom-9 right-0 left-0 mx-5 items-center justify-center rounded-lg py-3.5 flex-row flex bg-accent z-50"
      >
        <Image source={icons.arrow} className="size-5 rotate-180 mt-0.5" tintColor="white" />
        <Text className="text-white text-base font-bold ml-2">Back</Text>
      </TouchableOpacity>
    </View>
  );
}
