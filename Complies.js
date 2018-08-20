const path = require('path')
const fs = require('fs')
const solc = require('solc')

const srcpath= path.resolve(__dirname,'contrcats','Lottery.sol')

console.log(srcpath)
const source=fs.readFileSync(srcpath,'utf-8')

const res = solc.compile(source,1)

module.exports =res.contracts[':Lottery']
