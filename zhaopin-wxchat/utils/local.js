export default{
    set(key,value){
        wx.setStorageSync(key,JSON.stringify(value));
    },
    get(key){
        return JSON.parse(wx.getStorageSync(key));
    },
    remove(key){
        wx.removeStorageSync(key);
    },
    clear(){
        wx.clearStorageSyncr();
    },
    isKey(key){
        let rst=wx.getStorageSync(key);
        if(rst){
            return true;
        }else{
            return false;
        }
    }
}
