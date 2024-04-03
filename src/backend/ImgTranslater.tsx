class ImgTranslater{
    public static Base64ToImage(base64img: string, callback: Function) {
        var img = new Image();
        img.onload = function() {
            callback(img);
        };
        img.src = base64img;
    }

    public static ImageToBase64(img: HTMLImageElement, mime_type: string) {
        // New Canvas
        let canvas = document.createElement('canvas');
        canvas.width  = img.width;
        canvas.height = img.height;
        // Draw Image
        let ctx = canvas.getContext('2d');
        if(ctx !== null){
            ctx.drawImage(img, 0, 0);
        }
        // To Base64
        return canvas.toDataURL(mime_type);
    }
    

    public static TranslateImageBit(base64img: string){
        this.Base64ToImage(base64img, function(img: HTMLImageElement) {
            return ImgTranslater.ImageToBase64(img, "image/jpeg");
        })
    }
}

export default ImgTranslater;
