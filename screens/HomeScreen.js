import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        `https://sliceofgourmet.com/wp-json/wp/v2/posts?per_page=5&page=${page}`
      );
      setRecipes((prevRecipes) => [...prevRecipes, ...response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [page]);

  const renderItem = ({ item }) => {
    const featuredImage = item.jetpack_featured_media_url
      ? item.jetpack_featured_media_url
      : 'https://via.placeholder.com/150';

    return (
      <TouchableOpacity onPress={() => navigation.navigate('Recipe', { id: item.id })}>
        <View style={styles.listItem}>
          <Image source={{ uri: featuredImage }} style={styles.image} />
          <Text style={styles.title}>{item.title.rendered}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <FlatList
      data={recipes}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
});

export default HomeScreen;
