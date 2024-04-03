import { useState } from "react";
import InputForm from "./InputForm";
import OutputDisplay from "./OutputDisplay";
import ImgUploader from "./image/ImgUploader";

function Description() {
  const [menuIds, setMenuIds] = useState<string[]>([]);

  return (
    <div className="text-left">
      <h1>サイゼリヤのメニューID取得方法</h1>
      <h2>Step. 1</h2>
      <span>サイゼリヤのホームページからメニューのスクリーンショットを取得．</span>
      <h2>Step. 2</h2>
      <span>
      以下のフォームから複数枚のメニューのスクリーンショットを選択し，ダウンロードボタンをクリック．<br/>
      本ステップの実行により，複数枚のスクリーンショットが1枚にまとめられ，なおかつ白/黒に二値化される．二値化の理由は画像のサイズを削減し，後の処理を高速化することである．</span>
      <ImgUploader />
      <h2>Step. 3</h2>
      <span>Google DriveにStep. 2でまとめた画像をアップし，「右クリック」 &rarr; 「アプリを開く」 &rarr; 「Google Documentで開く」を選択． </span>
      <h2>Step. 4</h2>
      <span>Google Document上に表記されたテキスト情報を「Ctrl + a」 &rarr; 「Ctrl + c」でコピー．</span>
      <h2>Step. 5</h2>
      <span>コピーした内容を，以下のオレンジ枠内に貼り付け，送信をクリック．<br/>メニューのIDのみが取り出される．</span>
      <InputForm setMenuIds={setMenuIds} />
      <OutputDisplay menuIds={menuIds} />
    </div>
  );
}

export default Description;
