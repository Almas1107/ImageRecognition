import { StyleSheet, Text, View, Button, Image } from "react-native";
import { useState } from "react";
import { Camera, CameraType } from "expo-camera";

export default function TabTwoScreen() {
  const [type, setType] = useState(CameraType.back);
  const [status, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState<string | null>(null);
  const [camera, setCamera] = useState<any>();

  if (!status || !status.granted) {
    return (
      <View style={styles.container}>
        <Text>Give access to camera</Text>
        <Button title="Give access" onPress={requestPermission} />
      </View>
    );
  }

  const handleFlipCamera = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };
  const CaptureImage = async () => {
    if (camera) {
      const result = await camera.takePictureAsync();
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={{
          flex: 1,
          width: "100%",
          flexDirection: "row",
        }}
        type={type}
        ref={(ref) => setCamera(ref)}
      >
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 200,
              height: 200,
              borderWidth: 2,
              borderColor: "white",
              position: "absolute",
            }}
          />
        )}
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignSelf: "flex-end",
          }}
        >
          <Button title="Flip camera" onPress={handleFlipCamera} />
          <Button title="Capture picture" onPress={CaptureImage} />
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
