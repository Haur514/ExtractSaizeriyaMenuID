type Props = {
  prevImage: PrevImage;
}

type PrevImage = {
  fileName: string;
  imageSource: string;
}

export default function ImgPreview({prevImage}: Props) {

  return (
    <div className="w-full object-contain" key={prevImage.imageSource}>
    {prevImage.fileName ? (
      <img className="w-full" src={prevImage.imageSource} alt="アップロード画像"/>
    ) : (
      '+ 画像をアップロード'
    )}
    </div>
  );
}
