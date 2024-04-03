import html2canvas from "html2canvas";
import React, { useEffect, useRef, useState } from "react";
import ImgPreview from "./ImgPreview";
import ImgUploadButton from "./ImgUploadButton";

const IMAGE_ID = 'image';

const saveAsImage = (uri: string) => {
  const downloadLink = document.createElement("a");

  if (typeof downloadLink.download === "string") {
    downloadLink.href = uri;

    // ファイル名
    downloadLink.download = "component.jpeg";

    // Firefox では body の中にダウンロードリンクがないといけないので一時的に追加
    document.body.appendChild(downloadLink);

    // ダウンロードリンクが設定された a タグをクリック
    downloadLink.click();

    // Firefox 対策で追加したリンクを削除しておく
    document.body.removeChild(downloadLink);
  } else {
    window.open(uri);
  }
}

const onClickExport = () => {
  // 画像に変換する component の id を指定
  const target = document.getElementById("prev-image");
  if(target != null){
    html2canvas(target).then(canvas => {
      const targetImgUri = canvas.toDataURL("img/jpeg", 1.0);
      saveAsImage(targetImgUri);
    });
  } 
}


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
        <ImgUploadButton
          fileInputRef={fileInputRef}
          onChange={handleFileChange}
          id={IMAGE_ID}
        />
      </div>
    </form>

    <div id="prev-image" className="w-full">
      {prevImages.map((e) => {
        return(
          <ImgPreview prevImage={e} />
        )
      })}
    </div>
    <button onClick={() => onClickExport()}>PING</button>
    </div>
  );
}