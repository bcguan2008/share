/**
 * 演示 hpack demo
 */
 const { HUFFMAN_TABLE, STATIC_TABLE } = require('./hpack-table');

 const INDEX_HEADER_FILED = '1';
 const INCREMENTAL_INDEXING_HEADER_FILED = '01';
 const NOT_INDEX_HEADER_FILED = "0000";
 const NEVER_INDEX_HEADER_FILED = '0001'
 
 //const hexString = '7adcd07f66a281b0dae053fad0321aa49d13fda992a49685340c8a6adca7e28104416e277fb521aeba0bc8b1e632586d975765c53facd8f7e8cff4a506ea5531149d4ffda97a7b0f49587c2b81769a744b842d29b8728ec330db2eaecb9f';
 //const hexString = '418a24952f450824952e43d3';
 //const hexString = '87'
 //const hexString = '4085aec1cd48ff86a8eb10649cbf';
 //const hexString = '40853d8698d57fa19d29ad171860845a7f51d86916a6da12658b526cf4bca55e835b41913da75c87a7'
 //const hexString = '7adcd07f66a281b0dae053fad0321aa49d13fda992a49685340c8a6adca7e28104416a273fb521aeba0bc8b1e632586d975765c53facd8f7e8cff4a506ea5531149d4ffda97a7b0f49587c2b81769a744b840e29b8728ec330db2eaecb9f';
 //const hexString = '408b4148b1275ad1ad49e33505023f30';
 const hexString='5a839bd9ab'
 
 
 /**
  * 根据基数分割字符串
  */
  const splitBy = (str, radix = 2) => {
 
     let strArray = str.split('');
     let result = [];
 
     let arr = [];
     for (let i = 0; i < strArray.length; i++) {
         if (arr.length === radix) {
             result.push(arr.join(''))
             arr = [];
         }
 
         arr.push(strArray[i]);
     }
     if (arr.length === radix) {
         result.push(arr.join(''))
         arr = [];
     }
     return result;
 }
 
 
 
 const getHeaderInfo = (bytes) => {
     let type;
     let value;
     if (bytes.startsWith(INDEX_HEADER_FILED)) {
         type = bytes.slice(0, 1);
         value = parseInt(bytes.slice(1, 8), 2);
 
     }
     else if (bytes.startsWith(INCREMENTAL_INDEXING_HEADER_FILED)) {
         type = bytes.slice(0, 2);
         value = parseInt(bytes.slice(2, 8), 2);
     }
     else if (bytes.startsWith(NOT_INDEX_HEADER_FILED)) {
         type = bytes.slice(0, 4);
         value = parseInt(bytes.slice(4, 8), 2);
     }
     else if (bytes.startsWith(NEVER_INDEX_HEADER_FILED)) {
         type = bytes.slice(0, 4);
         value = parseInt(bytes.slice(4, 8), 2);
     }
 
     return {
         type, value
     }
 }
 
 
 
 const huffmanDecode = (bytes) => {
 
     let resultArray = [];
 
     const decode = (bytes, result) => {
 
         if (bytes.length <= 8) {
             return
         }
 
         //huffman 编码的前 8 位是编码信息：是否huffman + 长度
         const isHuffman = bytes.slice(0, 1);
         let encodeLength = parseInt(bytes.slice(1, 8), 2);
         const encodeBody = bytes.slice(8, bytes.length);
 
         if (!isHuffman) {
             console.log('编码非 huffman')
         }
 
         let matchStr = '';
         let decodeStr = '';
 
         for (let i = 0; i < encodeLength * 8; i++) {
             matchStr += encodeBody[i];
             if (HUFFMAN_TABLE[matchStr]) {
                 decodeStr = HUFFMAN_TABLE[matchStr].letter;
                 result.push(decodeStr);
 
                 decodeStr = '';
                 matchStr = ''
             }
         }
 
         resultArray.push(result.join(''));
         result = []
 
         //缩短 bytes 长度
         bytes = encodeBody.slice(encodeLength * 8, encodeBody.length);
         decode(bytes, result)
 
         return result;
     }
 
     let result = [];
     decode(bytes, result);
 
     return resultArray
 
 }
 
 const hpackDecode = (hexString) => {
     
     const arr =  splitBy(hexString).map((item) => {
         return parseInt(item, 16).toString(2).padStart(8, '0')
     })
     const result = arr.join('');
 
     let headerTypeBytes = result.slice(0, 8);
     let encodeBytes = result.slice(8, result.length);
 
     let headerInfo = getHeaderInfo(headerTypeBytes)
 
     console.log('headerInfo',headerInfo)
 
     if (headerInfo.type === INDEX_HEADER_FILED) {
         return STATIC_TABLE[headerInfo.value];
     }
     else if (headerInfo.type === INCREMENTAL_INDEXING_HEADER_FILED) {
         let key = STATIC_TABLE[headerInfo.value][0];
 
         //表里取不到的新值，需要加到动态表,比如 pragma:no-cache
         if (!key) {
             const decodeStr = huffmanDecode(encodeBytes);
             return decodeStr
         }
 
         const value = huffmanDecode(encodeBytes)[0];
         return [key, value]
     }
     else if (headerInfo.type === NOT_INDEX_HEADER_FILED) {
         //不缓存，比如 path：/ga.gif
         const decodeStr = huffmanDecode(encodeBytes)
         return decodeStr
 
     }
     else if (headerInfo.type === NEVER_INDEX_HEADER_FILED) {
         //TODO
     }
     
 
     return result;
 }
 
 console.log(hpackDecode(hexString))
 
 