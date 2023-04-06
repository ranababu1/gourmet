import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const RecipeScreen = ({ route }) => {
  const { id } = route.params;
  const [recipe, setRecipe] = useState(null);

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`https://sliceofgourmet.com/wp-json/wp/v2/posts/${id}`);
      setRecipe(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  if (!recipe) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const featuredImage = recipe.jetpack_featured_media_url
    ? recipe.jetpack_featured_media_url
    : 'https://via.placeholder.com/150';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: featuredImage }} style={styles.image} />
      <Text style={styles.title}>{recipe.title.rendered}</Text>
      <Text style={styles.content}>{recipe.content.rendered.replace(/<\/?[^>]+(>|$)/g, '')}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
});

export default RecipeScreen;
