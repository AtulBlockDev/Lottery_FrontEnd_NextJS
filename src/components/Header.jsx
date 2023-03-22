import { ConnectButton } from "web3uikit";

export default function Header(){
    return(<div className="py-8 px-8 text-yellow-500 text-2xl">
        <h1 className="text-yellow">Decentralized Lottery</h1>
        <h2><ConnectButton moralisAuth = {false}/></h2>
        
    </div>)
}