class IdExtracter{
    public static extractIds(originalText: string): string[]{
        const words: string[] = originalText.split(/\s+/);
        let ret: string[] = [];
        for(const word of words){
            if(word.length === 4 && this.isNumber(word)){
                ret.push(word);
            }
        }
        ret = ret.filter((element, index) => {
            return ret.indexOf(element) === index;
        }).sort();
        return ret;
    }

    // 0以上の整数か？
    private static isNumber(val: string){
    var regexp = new RegExp(/^[1-9]+(\[0-9]+)?$/);
    return regexp.test(val);
  }
}

export default IdExtracter;