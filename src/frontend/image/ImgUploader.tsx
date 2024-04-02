import React, { useEffect, useRef, useState } from "react";
import ImgPreview from "./ImgPreview";
import ImgUploadButton from "./ImgUploadButton";


const IMAGE_ID = 'image';

async function generateImageSource(
  files: FileList, 
  setFileNames: React.Dispatch<React.SetStateAction<string[]>>, 
  setImageSources: React.Dispatch<React.SetStateAction<string[]>>){
  const fileNames: string[] = [];
  const imageSources: string[] = [];
  for(const file of Array.from(files)){
    console.log("OK")
    console.log(file);
    const fileReader = new FileReader();
    fileNames.push(file.name);
    fileReader.onload = () => {
      imageSources.push(fileReader.result as string);
    }
  }
  setFileNames(fileNames);
  setImageSources(imageSources);
  console.log("hoge")
  console.log(fileNames);
  console.log(imageSources[0]);
}

export default function ImgUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [imageSources, setImageSources] = useState<string[]>([])

  const selectFile = () => {
    if (!fileInputRef.current) return;
    // ローカルフォルダーから画像選択のダイアログが表示される。
    fileInputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length <= 0) return;

    generateImageSource(files, setFileNames, setImageSources);
    setImageFiles(files);
  };

  useEffect(() => {
    if(imageFiles != null){
      generateImageSource(imageFiles, setFileNames, setImageSources);
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

    <ImgPreview fileName={fileNames[0]} imageSource={imageSources[0]} />
    <ImgPreview fileName={fileNames[1]} imageSource={imageSources[1]} />
    </div>
  );
}