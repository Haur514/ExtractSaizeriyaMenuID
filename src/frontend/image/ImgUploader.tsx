import React, { useEffect, useRef, useState } from "react";
import ImgPreview from "./ImgPreview";
import ImgUploadButton from "./ImgUploadButton";


const IMAGE_ID = 'image';

function generateImageSource(
  files: FileList, 
  setPrevImage: React.Dispatch<React.SetStateAction<PrevImage[]>>){
  const fileNames: string[] = [];
  const imageSources: string[] = [];
  const prevImages: PrevImage[] = [];
  for(let i = 0; i < files.length; i++){
    const file = files[i];
    const fileReader = new FileReader();
    fileNames.push(file.name);
    fileReader.onload = () => {
      imageSources.push(fileReader.result as string);
      prevImages.push({
        fileName: file.name,
        imageSource: fileReader.result as string,
      })
      setPrevImage(prevImages);
    };
    fileReader.readAsDataURL(file);
  }
}

type PrevImage = {
  fileName: string;
  imageSource: string;
}

export default function ImgUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageFiles, setImageFiles] = useState<FileList | null>(null);

  const [prevImages, setPrevImages] = useState<PrevImage[]>([]);

  const selectFile = () => {
    if (!fileInputRef.current) return;
    // ローカルフォルダーから画像選択のダイアログが表示される。
    fileInputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length <= 0) return;

    generateImageSource(files, setPrevImages);
    setImageFiles(files);
  };

  useEffect(() => {
    if(imageFiles != null){
      generateImageSource(imageFiles, setPrevImages);
    }
  },[imageFiles]);

  return (
    <div>
    <form>
      <div onClick={selectFile} role="presentation">
        画像をアップロード
        {/* ダミーインプット: 見えない */}
        <ImgUploadButton
          fileInputRef={fileInputRef}
          onChange={handleFileChange}
          id={IMAGE_ID}
        />
      </div>

      {/* キャンセルボタン */}
      <div>
        <button>× キャンセル</button>
        <button type="submit">画像を送信</button>
      </div>
    </form>

    {prevImages.map((e) => {
      return(
        <ImgPreview fileName={e.fileName} imageSource={e.imageSource} />
      )
    })}
 
    </div>
  );
}