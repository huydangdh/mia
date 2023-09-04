import React, { useState, useRef } from 'react';
import { Button, Container, Image } from 'react-bootstrap';
import Cropper from 'react-cropper';
import { createWorker } from 'tesseract.js';

const ChineseDictApp: React.FC = () => {
  const [hanzi, setHanzi] = useState<string>('');
  const [imageData, setImageData] = useState<string>('');
  const [imgCropped, setImgCropped] = useState<string>('');
  const [ocrText, setOcrText] = useState<string>('');

  const cropperRef = useRef<Cropper>(null);

  const handleSearch = async () => {
    try {
      const encodedHanzi = encodeURI(hanzi).replace(/%/g, '').toLowerCase();
      const url = `https://corsproxy.io/?https://www.fantiz5.com/zi/ziyuantu/${encodedHanzi}.png`;
      const response = await fetch(url, {
        headers: {
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        },
      });
      if (!response.ok) {
        throw new Error('Lỗi khi tải ảnh');
      }
      const data = await response.blob();
      const outImg = await blobToBase64(data);
      setImageData(outImg);
    } catch (error) {
      console.error('Lỗi khi xử lý tìm kiếm:', error);
    }
  };

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      setImgCropped(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const OCR = async () => {
    try {
      const worker = await createWorker({
        logger: (m) => console.log(m),
      });
      await worker.loadLanguage('chi_sim');
      await worker.initialize('chi_sim');
      const { data: { text } } = await worker.recognize(imgCropped);
      setOcrText(text);
      await worker.terminate();
    } catch (error) {
      console.error('Lỗi khi thực hiện OCR:', error);
    }
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  };

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
        <Button variant='primary' type="button" onClick={handleSearch}>Tìm kiếm</Button>
        <p></p>
        <Image fluid src={imageData} alt="ImageData" />
      </form>
      <div>
        <h2>Thu nhỏ ảnh:</h2>
        <div className="img-cropper-container">
          <Cropper
            src={imageData}
            style={{ height: 400, width: '100%' }}
            initialAspectRatio={16 / 9}
            guides={false}
            cropend={onCrop}
            ref={cropperRef}
          />
        </div>
        <Button variant='primary' type="button" onClick={OCR}>OCR</Button>
        <div>
          <h3>Kết quả OCR:</h3>
          <textarea
            rows={4}
            cols={50}
            readOnly
            value={ocrText}
          />
        </div>
      </div>
    </Container>
  );
};

export default ChineseDictApp;

