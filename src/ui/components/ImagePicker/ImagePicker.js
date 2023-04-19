import * as ExpoImagePicker from 'expo-image-picker'

const ImagePicker = async () => {
    let result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0
    });

    if (!result.canceled) {
        return result.assets[0].uri
    }
}

export default ImagePicker