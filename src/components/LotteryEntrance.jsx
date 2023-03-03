import { useWeb3Contract } from "react-moralis";
import{abi, contractAddress} from "../constants";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react"

export default function LotteryEntrace(){
    const{chainId: chainIdHex, isWeb3Enabled} = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddress ? contractAddress[chainId][0] : null
    const [entranceFee, setEntranceFee] = useState("0")
    // const {runContractFunction: EnterRaffle } = useWeb3Contract({

    //     abi:abi,
    //     contractAddress: raffleAddress,
    //     functionName:"EnterRaffle",
    //     params:{},
    //     msgValue: []


    // })

      const {runContractFunction: getEntranceFee } = useWeb3Contract({

        abi:abi,
        contractAddress: raffleAddress,
        functionName:"getEntranceFee",
        params:{},

    })
    useEffect(()=>{


        if(isWeb3Enabled){

            async function updateUI(){
                
                const entranceFeeFromCall= (await getEntranceFee()).toString()
                setEntranceFee(entranceFeeFromCall)
                
                console.log(entranceFee)
              

            }
            updateUI()
        
    }
    else{console.log("Saley! pehle getEntranceFee waley function toh chala de")}

    }, [isWeb3Enabled])


    return <div>Hi, From Lottery Entrance {entranceFee} </div>
}

