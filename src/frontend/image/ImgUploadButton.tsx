import { InputHTMLAttributes } from "react";

export type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: InputHTMLAttributes<HTMLInputElement>['id'];
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function ImgUploadButton({
  onChange,
  id,
  fileInputRef,
  ...rest
}: Props) {
  return (
    <div className="w-full p-2">
      <form className="border border-orange-600">
        <input 
          type="file" 
          accept="image/*" 
          multiple={true} 
          onChange={onChange}
          className="border border-black w-3/4 m-2 p-2"/>      
        <input className="btn btn-blue border border-black m-2 p-2" type="submit" />
      </form>
    </div>
  );
}