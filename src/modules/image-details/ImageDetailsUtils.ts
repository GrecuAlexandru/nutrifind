import TextRecognition from 'react-native-text-recognition';

export const recognizeImage = (url: string) => {
  return TextRecognition.recognize(url);
};
