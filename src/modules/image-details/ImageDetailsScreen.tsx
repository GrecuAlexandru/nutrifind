import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { Icons } from '../../assets';
import { Header } from '../../components';
import styles from './ImageDetailsStyles';
import { ImageDetailRouteType, responseType } from './ImageDetailsTypes';
import { recognizeImage } from './ImageDetailsUtils';

const ImageDetailsScreen = () => {
  const route = useRoute<RouteProp<ImageDetailRouteType, 'imageDetails'>>();
  const [response, setResponse] = useState<Array<responseType>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const uri = route?.params?.uri;
  const navigation = useNavigation();

  useEffect(() => {
    if (uri) {
      processImage(uri);
    }
  }, [uri]);

  const processImage = async (url: string) => {
    if (url) {
      try {
        const result = await recognizeImage(url);
        console.log(JSON.stringify(result, undefined, 4)); 
        setIsLoading(false);
        if (result.length > 0) {
          setResponse(result);
        } else {
          setResponse([]);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  console.log(JSON.stringify(response, undefined, 4)); 
  console.log('isLoading', isLoading);

  return (
    <>
      <Header
        title={'Text Detection'}
        leftIcon={Icons.back}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.outerView}>
        <Text style={styles.titleImage}>Image:</Text>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri }}
            style={styles.addedImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.titleResult}>Output:</Text>
        <ScrollView style={styles.imageContainer}>
          {isLoading ? (
            <Text style={styles.titleResult}>Please Wait...</Text>
          ) : response.length !== 0 ? (
            <View style={styles.resultWrapper}>
                  <Text style={styles.textStyle}>
                    {response}
                  </Text>
            </View>
          ) : (
            <Text style={styles.titleResult}>Sorry!🙁 No text found</Text>
          )}
        </ScrollView>
      </View>
    </>
  );
};
export default ImageDetailsScreen;
