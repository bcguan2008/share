/**
 * 根据一串输入字符，生成 huffman 表
 */

/**
 * 定义二叉树数据结构
 */
 function TreeNode(val, left, right) {
    this.val = val;
    this.left = left ? left : null;
    this.right = right ? right : null;
}

let template = 'https://faas-ali.llscdn.com/builds/tech-clingo/tech-clingo-frontend/cc-hybrid-multi-entry/commons/index.6a8e0c97.js';

/**
 * 按照 left = 0 ,right = 1 将路径打印成 table
 */
const printHuffmanTable = (treeNode) => {
    let result = [];
    let binaryStr = '0';

    const dfs = (treeNode, binaryStr) => {

        if (treeNode === null) {
            return
        }

        if (treeNode.left === null || treeNode.right === null) {
            result.push({
                letter: treeNode.val.letter,
                code: binaryStr
            });
        }

        dfs(treeNode.left, binaryStr + '0')
        dfs(treeNode.right, binaryStr + '1')
    }

    dfs(treeNode, binaryStr);
    return result;
}

const huffmanGenerator = (str) => {
    //step1：获得一个字符频次数组，比如[{letter:'a',freq:10}];
    const getFrequencyArray = (str) => {
        //每个字符出现的频次
        let frequencyHash = {};
        let frequencyArray = [];

        for (let i = 0; i < str.length; i++) {
            frequencyHash[str[i]] = (frequencyHash[str[i]] || 0) + 1;
        }

        Object.keys(frequencyHash).forEach((val, _index) => {
            frequencyArray.push({
                letter: val,
                freq: frequencyHash[val]
            })
        });

        frequencyArray.sort((a, b) => {
            return a.freq - b.freq;
        })

        return frequencyArray
    }

    const letterFreqArray = getFrequencyArray(str);
    console.log('letterFreqArray', letterFreqArray)

    //step2：转化成 treeNodeList
    const treeNodeList = letterFreqArray.map((item, index) => {
        return new TreeNode(item)
    });


    //step3: 从低频到高频构建层次树

    while (treeNodeList.length > 1) {
        let leftNode = treeNodeList.shift();
        let rightNode = treeNodeList.shift();

        let newVal = { 'letter': 'EMPTY', freq: leftNode.val.freq + rightNode.val.freq }
        let newNode = new TreeNode(newVal, leftNode, rightNode);

        //将 newNode 放在合适的地方：保持 treeNodeList 数组顺序
        treeNodeList.push(newNode);
        treeNodeList.sort((a, b) => {
            return a.val.freq - b.val.freq;
        })
    }

    //打印二叉树
    return printHuffmanTable(treeNodeList[0])
}

console.log('huffmanTable',huffmanGenerator(template))