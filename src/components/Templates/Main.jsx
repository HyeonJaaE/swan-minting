import React, {useEffect, useState} from "react";
import Caver from "caver-js"
const abi = require('public/abi.json')
const caver = new Caver(window["klaytn"])

export default function MainTemplate() {
  const [currentAddress, setCurrentAddress] = useState(''||window.klaytn.selectedAddress)

  useEffect(() => {
    const connectWallet = async () => {
      try{
        await window.klaytn.enable()
        window.klaytn.on('accountChanged', (accounts) => {
          setCurrentAddress(accounts)
          console.log('계정정보 변경됨')
        })
      } catch (error) {
        alert('연결된 지갑이 없습니다. Kaikas 지갑을 연결해주세요.')
      }
    }
    connectWallet()
  },[])

  const connect = async () => {
    await window.klaytn.enable()
    window.klaytn.on('accountChanged', (accounts) => {
      setCurrentAddress(accounts)
      console.log('계정정보 변경됨')
    })
  }

  const mint = async () => {
    const contractAddress = ''
    const nftContract = new caver.contract(abi, contractAddress)
    const transactionParams = {
      type: 'SMART_CONTRACT_EXECUTION',
      from: currentAddress,
      to: contractAddress,
      value: 0,
      gas: 500000,
      // data: nftContract.methods.mintSingle(currentAddress,'https://howootest01.s3.ap-northeast-2.amazonaws.com/metadata/test/4.json').encodeABI()
    }

    await caver.klay.sendTransaction(transactionParams)
    .on('receipt', receipt => {
      console.log(receipt)
    }).on('error', error => {
      console.log(error)
    })

  }
  return (
    <div className="main">
      {/* <Header/><Form/> */}
      <div className="content">
        <div>
          <h1>Take a hit, let's make a noise</h1>
          <p>{currentAddress}</p>
        </div>
        <div>
          <button className="btn" onClick={connect}>Connect</button>
          <button className="btn" onClick={mint}>Minting</button>
        </div>
      </div>
    </div>
  );
}
