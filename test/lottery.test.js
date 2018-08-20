const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface,bytecode} = require('../Complies');
const assert = require('assert');


let contract;
let accounts;

beforeEach('测试lottery合同',async()=>{
    accounts = await web3.eth.getAccounts();
    contract =await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data:bytecode
        }).send({
            from:accounts[0],
            gas:'3000000'
        });
})



describe('测试lottery智能合约',async ()=>{
    it('测试智能合约的编译和部署',async ()=>{
        assert.ok(contract.options.address);
    });
    it('测试enter方法,正确案例',async ()=>{
        const Money = await contract.methods.getBalance().call();
        await contract.methods.enter().send({
            from:accounts[1],
            gas:'1000000',
            value: 1000000000000000000
        });
        const endMoney = await contract.methods.getBalance().call();
        console.log(endMoney-Money);
        assert.equal('1000000000000000000',(endMoney-Money));
    });
    it('测试enter方法,失败',async ()=>{
      try {
          await contract.methods.enter().send({
              from: accounts[1],
              gas: '1000000',
              value: 20000000000000000
          })
          assert(false)
      }catch (e) {
          assert.ok(e)
      }
    });



});