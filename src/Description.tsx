import { useState } from "react";
import InputForm from "./frontend/InputForm";
import OutputDisplay from "./frontend/OutputDisplay";
import ImgUploader from "./frontend/image/ImgUploader";

function Description() {
  const [menuIds, setMenuIds] = useState<string[]>([]);

  return (
    <div className="text-left">
      <h1>サイゼリヤのメニューID取得方法</h1>
      <h2>Step. 1</h2>
      <span>サイゼリヤのホームページからメニューのスクリーンショットを撮ってくる．</span>
      <h2>Step. 2</h2>
      <span>撮ってきたスクリーンショットを1枚にまとめる．</span>
      <ImgUploader />
      <h2>Step. 3</h2>
      <span>Google DriveにStep. 2でまとめた画像をアップし，「右クリック」 &rarr; 「アプリを開く」 &rarr; 「Google Documentで開く」を選択． </span>
      <h2>Step. 4</h2>
      <span>Google Document上に表記されたテキスト情報を「Ctrl + a」 &raar; 「Ctrl + c」でコピー．</span>
      <h2>Step. 5</h2>
      <span>コピーした内容を，以下のオレンジ枠内に貼り付け，送信をクリック．</span>
      <InputForm setMenuIds={setMenuIds} />
      <OutputDisplay menuIds={menuIds} />
    </div>
  );
}

export default Description;
