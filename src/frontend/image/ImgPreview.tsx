
type Props = {
    fileName: string,
    imageSource: string | undefined;
}
export default function ImgPreview({fileName, imageSource}: Props) {

  return (
    <div className="w-44">
    {fileName ? (
        <img src={imageSource} alt="アップロード画像"/>
    ) : (
        '+ 画像をアップロード'
    )}
    </div>
  );
}
