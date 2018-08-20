const Web3 = require('web3')
const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "fade vault mirror render happy eagle excite boss aspect aisle express outdoor"; // 12 word mnemonic
const provider = new HDWalletProvider(mnemonic,
    "https://rinkeby.infura.io/v3/9cac1960c91b4ca59a1e42882135c9c4");
const web = new Web3(provider)
const {interface,bytecode }=require('./Complies')

deploy = async ()=>{
    let accounts = await web.eth.getAccounts();
    console.log(accounts[0])
   const result = await new web.eth.Contract(JSON.parse(interface)).deploy(
        {
            data:bytecode
        }).send({
            from:accounts[0],
            gas:'1000000'
        })
        console.log("adderss==="+result.options.address)
    console.log(interface)

    
}
deploy()