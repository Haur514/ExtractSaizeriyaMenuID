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
      <form>
        <input 
          type="file" 
          accept="image/*" 
          multiple={true} 
          onChange={onChange}
          className="bg-gray-300 p-1 border rounded border-gray-900"/>      
      </form>
    </div>
  );
}