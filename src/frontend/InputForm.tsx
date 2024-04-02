import { SubmitHandler, useForm } from "react-hook-form";
import IdExtracter from "../backend/IdExtracter";

type Inputs = {
  originalText: string;
};

type Props = {
  setMenuIds: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function InputForm({setMenuIds}: Props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    setMenuIds(IdExtracter.extractIds(data.originalText));
  };

  return (
    <div className="w-full p-2">
      <form onSubmit={handleSubmit(onSubmit)} className="border border-orange-600">
        <input {...register("originalText")} className="border border-black w-3/4 m-2 p-2"/>      
        <input className="btn btn-blue border border-black m-2 p-2" type="submit" />
      </form>
    </div>
  );
}