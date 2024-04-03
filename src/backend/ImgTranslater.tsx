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
    
    private static transImageData(img: HTMLImageElement){
        const cv = document.createElement('canvas');

        cv.width = img.naturalWidth;
        cv.height = img.naturalHeight;
    
        const ct = cv.getContext('2d');
    
        ct!.drawImage(img, 0, 0);
    
        let data = ct!.getImageData(0, 0, cv.width, cv.height);
        data = this.transBitImageData(data);

        const ctx = cv.getContext("2d");
        ctx?.putImageData(data, 0, 0);
        console.log(cv.toDataURL("image/jpeg"));
        return cv.toDataURL("image/jpeg");
    }

    private static transBitImageData(_imgd: ImageData){
        const imgd = _imgd;
        const pix = imgd.data;
        for (var i = 0, n = pix.length; i < n; i += 4) {
            if(pix[i] + pix[i+1] + pix[i+2] > 150){
                pix[i] = 255;
                pix[i+1] = 255;
                pix[i+2] = 255;
            }
            else{
                pix[i] = 0;
                pix[i+1] = 0;
                pix[i+2] = 0;
            }
        }
        return imgd;
    }

    public static TranslateImageBit(base64img: string, callback: Function){
        this.Base64ToImage(base64img, function(img: HTMLImageElement) {
            const base64img = ImgTranslater.transImageData(img);
            callback(base64img);
        })
    }
}

export default ImgTranslater;
