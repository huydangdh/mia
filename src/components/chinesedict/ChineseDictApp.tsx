import { useCallback, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import getCroppedImg from "./Crop";
import { Button, Container, Image } from "react-bootstrap";

function ChineseDictApp() {
  const [hanzi, setHanzi] = useState("");
  const [imageData, setImageData] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const header: RequestInit = {
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Encoding": "gzip, deflate, br",
    },
    mode: "no-cors",
  };

  const handleSearch = async () => {
    const encodedHanzi = encodeURI(hanzi).replace(/%/g, "").toLowerCase();
    const url = `https://www.fantiz5.com/zi/ziyuantu/${encodedHanzi}.png`;
    const response = await fetch(url, header);
    const data = await response.blob();
    setImageData(url);
  };

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageData, croppedAreaPixels);
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, imageData]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const handleCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );
  return (
    <Container>
      <form>
        <label>
          Hanzi:
          <input
            type="text"
            value={hanzi}
            onChange={(e) => setHanzi(e.target.value)}
          />
        </label>
        <Button onClick={handleSearch}>
          Search        </Button>
        <Image fluid src={imageData} alt="ImageData" />
      </form>

    </Container>
  );
}

export default ChineseDictApp;
