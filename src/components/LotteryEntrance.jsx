import { useWeb3Contract } from "react-moralis";
import{abi, contractAddress} from "../constants";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react"
import{ethers} from "ethers"
import { useNotification } from "web3uikit";


export default function LotteryEntrace(){
    const{chainId: chainIdHex, isWeb3Enabled} = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddress ? contractAddress[chainId][0] : null
    const [entranceFee, setEntranceFee] = useState("0")
    const[numberOfPlayers, setNumberofPlayers] = useState("0")
    const[recentWinner, setRecentWinner] = useState("0")


    const dispatch = useNotification()

    const handleSuccess = async function(tx){
        await tx.wait(1)
        handleNewNotificaton(tx)
        updateUI()

    }
    const handleNewNotificaton =  function(){
        dispatch ({
            type :"info",
            message: "Transaction Completed",
            title: "Tx Notification",
            position: "topR",
            icon: "bell",

        })
    }
    
    const {runContractFunction: EnterRaffle, isFetching, isLoading } = useWeb3Contract({

        abi:abi,
        contractAddress: raffleAddress,
        functionName:"EnterRaffle",
        params:{},
        msgValue: [entranceFee]


    })

      const {runContractFunction: getEntranceFee } = useWeb3Contract({

        abi:abi,
        contractAddress: raffleAddress,
        functionName:"getEntranceFee",
        params:{},

    })

      const {runContractFunction: getNumberOfPlayers } = useWeb3Contract({

        abi:abi,
        contractAddress: raffleAddress,
        functionName:"getNumberOfPlayers",
        params:{},

    })

     const {runContractFunction: getRecentWinner} = useWeb3Contract({

        abi:abi,
        contractAddress: raffleAddress,
        functionName:"getRecentWinner",
        params:{},

    })

       async function updateUI(){
                
                const entranceFeeFromCall= (await getEntranceFee()).toString()
                setEntranceFee(entranceFeeFromCall)
                const numberOfPlayersFromCall = (await getNumberOfPlayers()).toString()
                setNumberofPlayers(numberOfPlayersFromCall)
                const recentWinnerFromCall = await getRecentWinner()
                setRecentWinner(recentWinnerFromCall)
            }
    
            useEffect(()=>{
                if(isWeb3Enabled){

                    updateUI()}

                }, [isWeb3Enabled])


    return <div className=" relative">
        
         HI, Would you like to try your luck?
        {raffleAddress ? ( <div className=""> 

            <button className=" absolute top-8  bg-black border border-blue-900 text-orange-600 px-5 font-extrabold hover:bg-orange-500 py-2 px-2 rounded border-separate " 
            onClick={async function() {await EnterRaffle({onSuccess: handleSuccess,})}}
            disabled = {isLoading || isFetching}>
                {isLoading || isFetching ? (<div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>) 
                :
                <div>Enter Raffle</div>}
                </button>
            
            <div className="absolute bottom-1 text-blue-700 py-6  " >Fee to Enter is {ethers.utils.formatUnits(entranceFee, "ether")} ETH</div>        
            
            <div className = "absolute bottom-0 left-0 text-orange-700  ">Number of player: {numberOfPlayers}</div>
            <div className = "  text-orange-600  py-20 font-bold">Recent Winner : {recentWinner} </div>
             </div>):
        (<div> No Raffle Address detected </div>)}
        </div>
}

