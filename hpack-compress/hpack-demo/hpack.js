/**
 * 演示 hpack demo
 */
const { HUFFMAN_TABLE, STATIC_TABLE } = require('./hpack-table');

const INDEX_HEADER_FILED = '1';
const INCREMENTAL_INDEXING_HEADER_FILED = '01';
const NOT_INDEX_HEADER_FILED = "0000";
const NEVER_INDEX_HEADER_FILED = '0001'

//const hexString = '41 8a 24 95 2f 45 08 24 95 2e 43 d3';
//const hexString = '87'
//const hexString = '40 85 ae c1 cd 48 ff 86 a8 eb 10 64 9c bf';
//const hexString = '40 85 3d 86 98 d5 7f a1 9d 29 ad 17 18 60 84 5a 7f 51 d8 69 16 a6 da 12 65 8b 52 6c f4 bc a5 5e 83 5b 41 91 3d a7 5c 87 a7'

//const hexString = '7a dc d0 7f 66 a2 81 b0 da e0 53 fa d0 32 1a a4 9d 13 fd a9 92 a4 96 85 34 0c 8a 6a dc a7 e2 81 04 41 6a 27 3f b5 21 ae ba 0b c8 b1 e6 32 58 6d 97 57 65 c5 3f ac d8 f7 e8 cf f4 a5 06 ea 55 31 14 9d 4f fd a9 7a 7b 0f 49 58 7c 2b 81 76 9a 74 4b 84 0e 29 b8 72 8e c3 30 db 2e ae cb 9f';
const hexString = '40 8b 41 48 b1 27 5a d1 ad 49 e3 35 05 02 3f 30';


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
            throw 'not huffman'
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
    const arr = hexString.split(' ').map((item) => {
        return parseInt(item, 16).toString(2).padStart(8, '0')
    })
    const result = arr.join('');

    let headerTypeBytes = result.slice(0, 8);
    let encodeBytes = result.slice(8, result.length);

    let headerInfo = getHeaderInfo(headerTypeBytes)

    console.log('headerInfo', headerInfo)

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
        //TODO
    }
    else if (headerInfo.type === NEVER_INDEX_HEADER_FILED) {
        //TODO
    }
    

    return result;
}

console.log(hpackDecode(hexString))
