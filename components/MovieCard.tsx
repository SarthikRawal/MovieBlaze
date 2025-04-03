import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";

const MovieCard = ({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{ 
            uri: poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : 'https://placeholder.com/600x400/1a1a1a/fff.png' 
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-white text-lg" numberOfLines={1}>{title}</Text>
        <View className="flex-row items-center gap-2">
          <Image source={icons.star} className="w-4 h-4" />
          <Text className="text-white font-bold text-xs">{Math.round(vote_average / 2)}</Text>
        </View>
        <View className="text-xs text-light-300">
          <Text className="text-light-300">{release_date?.split('-')[0]}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
