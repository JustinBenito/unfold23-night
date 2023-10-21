import React,{useState,useEffect} from 'react'
import axios from "axios"
import { ethers } from 'ethers';
import OpenAI from 'openai';

import './App.css'

function App() {
	const [chatmessage, setChatMessage] = useState([]);
	const [userMessage, setUserMessage] = useState('');
  	const [loading, setLoading] = useState(false);
	const [response, setResponse] = useState(null);

	const [fromchain, setFromChain]=useState('80001')
	const [tochain,setToChain]=useState('4331')
	const [fromtoken,setFromToken]=useState('0x22bAA8b6cdd31a0C5D1035d6e72043f4Ce6aF054')
	const [totoken, setToToken]=useState('0xb452b513552aa0B57c4b1C9372eFEa78024e5936')
	const [amount,setAmount]=useState(0)
	
	// const fromtoken= "80001"	
	// const totoken="4331"
	// const from="0x22bAA8b6cdd31a0C5D1035d6e72043f4Ce6aF054";
	// const to="0xb452b513552aa0B57c4b1C9372eFEa78024e5936";


	const handleUserMessageChange = (e) => {
		setUserMessage(e.target.value);
	  };
	
	  const handleSendMessage = () => {
		if (userMessage) {
		  const message1 = [
			{ role: 'system', content: 'Only use the function I provide' },
			{ role: 'user', content: `${userMessage}` },
		  ];
	
		  setChatMessage(message1);
		  console.log(chatmessage)
		}

	
		  
	  };


	  useEffect(() => {
		if (chatmessage.length > 0) {
		  setLoading(true);
		  fetch_data()
			.then((response) => {
			  setResponse(response);
			})
			.catch((error) => {
			  console.error(error);
			})
			.finally(() => {
			  setLoading(false);
			});
		}
	  }, [chatmessage]);

	  const fetch_data = async () => {
		console.log("im in")
		try {
		  const response = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo-0613',
			messages: chatmessage,
			functions: functions1,
			function_call: 'auto',
		  });
	
		  console.log(response)
		  setLoading(false)
		  return response;
		} catch (error) {
		  console.error(error);
		  throw error;
		}
	  };

	//   "{
	// 	"sourcechain": "Polygon Mumbai",
	// 	"destinationchain": "Avalanche Fuji",
	// 	"sourcetoken": "ETH",
	// 	"destinationtoken": "USDT",
	// 	"amount": 5
	//   }"

	  useEffect(()=>{

		if(response!=null){
		const finalresp = JSON.parse(response.choices[0].message.function_call.arguments)

		  const amount = finalresp.amount
		  // Assuming you have defined the 'chains' and 'tokens' objects elsewhere in your code.
		  const sourcechainname=finalresp.sourcechain
		  const destinationchainname=finalresp.destinationchain

		  const sourcechain = chains[finalresp.sourcechain];

		  console.log(sourcechain)
		  const destinationchain = chains[finalresp.destinationchain];
		  console.log(destinationchain)
		  const stoken = finalresp.sourcetoken;
		  const dtoken = finalresp.destinationtoken;
		  
		//   const sourcetoken = tokens[sourcechain];
		//   console.log("stoken",sourcetoken)
		//   const destinationtoken = tokens[destinationchain];
		//   console.log("dtoken", destinationtoken)
		
		console.log(sourcechainname)
		console.log(destinationchainname)

		console.log(tokens[sourcechainname][stoken])
		console.log(tokens[destinationchainname][dtoken])

		console.log("resp",finalresp)
		console.log("sourcechain",sourcechain)
		console.log("destinationchain", destinationchain)
		setFromChain(sourcechain)
		setToChain(destinationchain)
		setFromToken(stoken)
		setToToken(dtoken)
		setAmount(amount)

		// console.log("stoken",sourcetoken)
		// console.log("dtoken", destinationtoken)
	}
	  }, [response])
	 
	const chains= {
		"Avalanche Fuji": 43113,
		"Polygon Mumbai": 80001,
		"Ethereum Goerli": 5,
	  }
	
	  const tokens = {
		"Avalanche Fuji": {
		  "USDT": "0xb452b513552aa0B57c4b1C9372eFEa78024e5936",
		  "ETH": "0xce811501ae59c3E3e539D5B4234dD606E71A312e",
		  "ROUTE": "0x0b903E66b3A54f0F7DaE605418D14f0339560D76",
		  "USDC": "0x5425890298aed601595a70ab815c96711a31bc65",
		  "PEPE": "0x669365a664E41c3c3f245779f98118CF23a20789",
		  "PIKAMON": "0x00A7318DE94e698c3683db8f78dE881de4E5d18C",
		  "SHIBA INU": "0xB94EC038E5cF4739bE757dF3cBd2e1De897fCA2e"
		},
		"Polygon Mumbai": {
		  "USDT": "0x22bAA8b6cdd31a0C5D1035d6e72043f4Ce6aF054",
		  "ETH": "0x3C6Bb231079c1023544265f8F26505bc5955C3df",
		  "ROUTE": "0x908aC4f83A93f3B7145f24f906327018c9e54B3a",
		  "PEPE": "0xFee7De539Dd346189A33E954c8A140df95F94B89",
		  "PIKAMON": "0xa78044353cB8C675E905Ce7339769872Edd8E637",
		  "SHIBA INU": "0x418049cA499E9B5B983c9141c341E1aA489d6E4d"
		},
		"Ethereum Goerli": {
		  "USDT": "0x2227E4764be4c858E534405019488D9E5890Ff9E",
		  "ETH": "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
		  "ROUTE": "0x8725bfdCB8896d86AA0a6342A7e83c1565f62889",
		  "PEPE": "0x9bAA6b58bc1fAB3619f1387F27dCC18CbA5A9ca1",
		  "PIKAMON": "0x7085f7c56Ef19043874CA3F2eA781CDa788be5E4",
		  "SHIBA INU": "0xDC17183328e81b5c619D58F6B7E480AB1c2EA152",
		  "USDC": "0x07865c6E87B9F70255377e024ace6630C1Eaa37F"
		}
	  }
	  

	const openai = new OpenAI({
		apiKey: '',
		dangerouslyAllowBrowser: true,
		maxRetries: 0,
	  });

	  const functions1=[
		{
			name: "swap_router",
			description: ` Swap currency using Router `,
			parameters: {
			  type: "object",
			  properties: {
				sourcechain:{
					type: "string",
					description: "source chain name eg.Avalanche Fuji,Polygon Mumbai,Ethereum Goerli"
				},
				destinationchain: {
					type: "string",
					description: "destination chain name eg.Avalanche Fuji,Polygon Mumbai,Ethereum Goerli"
				},
				sourcetoken: {
					type: "string",
					description: "token name eg. USDT, ETH"
				},
				destinationtoken: {
					type: "string",
					description: "token name eg. USDT. Default is USDT" 
				},
				amount: {
					type: "number",
					description: "amount eg. 100 or 1000"
				}

			  },
			  required: ["sourcechain",'destinationchain','sourcetoken','destinationtoken','amount'],
			},
		  },
	]



	 
	// useEffect(async ()=>{

	// 	if(window.ethereum) {
	// 		console.log('detected');
		
	// 		try {
	// 		  const accounts = await window.ethereum.request({
	// 			method: "eth_requestAccounts",
	// 		  });
	// 		  setAccount(accounts[0])
	// 		  console.log(accounts[0])
	// 		  const provider = new ethers.providers.Web3Provider(window.ethereum);
	// 		  const provider1 = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/polygon_mumbai", 80001);
	// 		  const provider2 = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/avalanche_fuji", 43113);
	// 		  const signer = provider.getSigner();
		
			  
		
			  
		
	// 		  const contract = new ethers.Contract(
	// 			  from,
	// 			  erc20_abi,
	// 			  provider1
	// 		  );
			  
		
	// 		  let balance = await contract.balanceOf(accounts[0])
		
	// 		  console.log(ethers.utils.formatEther(balance)*Math.pow(10,6));
	// 		  setPolygonBalance(ethers.utils.formatEther(balance)*Math.pow(10,6))
	// 		  const contract2 = new ethers.Contract(
	// 			to,
	// 			erc20_abi,
	// 			provider2
	// 		);
	// 		balance = await contract2.balanceOf(accounts[0])
	// 		  console.log(ethers.utils.formatEther(balance)*Math.pow(10,12));
	// 		  setAvalancheBalance(ethers.utils.formatEther(balance)*Math.pow(10,12))
		
	// 		}
	// 		catch(err) {
	// 		  console.log(err)
	// 		}
	// 	  }
		
	// 			},[])

	 
	const [quoteData,setQuoteData]=useState('')
	const [polygonBalance,setPolygonBalance]=useState(0)
	const [avalancheBalance,setAvalancheBalance]=useState(0)
	const [account,setAccount]=useState('Connect Wallet')
	const [step1,setStep1]=useState('')
	const [step2,setStep2]=useState('')
	const [step3,setStep3]=useState('')
	const erc20_abi = [
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "approve",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "burn",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "burnFrom",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "initialOwner",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"inputs": [],
			"name": "ECDSAInvalidSignature",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "length",
					"type": "uint256"
				}
			],
			"name": "ECDSAInvalidSignatureLength",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "s",
					"type": "bytes32"
				}
			],
			"name": "ECDSAInvalidSignatureS",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "allowance",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "needed",
					"type": "uint256"
				}
			],
			"name": "ERC20InsufficientAllowance",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "sender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "balance",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "needed",
					"type": "uint256"
				}
			],
			"name": "ERC20InsufficientBalance",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "approver",
					"type": "address"
				}
			],
			"name": "ERC20InvalidApprover",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "receiver",
					"type": "address"
				}
			],
			"name": "ERC20InvalidReceiver",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "sender",
					"type": "address"
				}
			],
			"name": "ERC20InvalidSender",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				}
			],
			"name": "ERC20InvalidSpender",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "deadline",
					"type": "uint256"
				}
			],
			"name": "ERC2612ExpiredSignature",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "signer",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}
			],
			"name": "ERC2612InvalidSigner",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "currentNonce",
					"type": "uint256"
				}
			],
			"name": "InvalidAccountNonce",
			"type": "error"
		},
		{
			"inputs": [],
			"name": "InvalidShortString",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "mint",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}
			],
			"name": "OwnableInvalidOwner",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "OwnableUnauthorizedAccount",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "str",
					"type": "string"
				}
			],
			"name": "StringTooLong",
			"type": "error"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "Approval",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [],
			"name": "EIP712DomainChanged",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "previousOwner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "OwnershipTransferred",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "deadline",
					"type": "uint256"
				},
				{
					"internalType": "uint8",
					"name": "v",
					"type": "uint8"
				},
				{
					"internalType": "bytes32",
					"name": "r",
					"type": "bytes32"
				},
				{
					"internalType": "bytes32",
					"name": "s",
					"type": "bytes32"
				}
			],
			"name": "permit",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "renounceOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "transfer",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "Transfer",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "transferFrom",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "transferOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				}
			],
			"name": "allowance",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "balanceOf",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "decimals",
			"outputs": [
				{
					"internalType": "uint8",
					"name": "",
					"type": "uint8"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "DOMAIN_SEPARATOR",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "eip712Domain",
			"outputs": [
				{
					"internalType": "bytes1",
					"name": "fields",
					"type": "bytes1"
				},
				{
					"internalType": "string",
					"name": "name",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "version",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "chainId",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "verifyingContract",
					"type": "address"
				},
				{
					"internalType": "bytes32",
					"name": "salt",
					"type": "bytes32"
				},
				{
					"internalType": "uint256[]",
					"name": "extensions",
					"type": "uint256[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "name",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}
			],
			"name": "nonces",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "symbol",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "totalSupply",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	];
	const PATH_FINDER_API_URL = "https://api.pf.testnet.routerprotocol.com/api"
	
	
	useEffect(async()=>{
		const params ={
			'fromTokenAddress': fromtoken,
			'toTokenAddress': totoken,
			'amount': amount,
			'fromTokenChainId': fromchain,
			'toTokenChainId': tochain, // Fuji
	
			'widgetId': 0, // get your unique wdiget id by contacting us on Telegram
		}
		const quoteData = await getQuote(params);
		setQuoteData(quoteData)
	},[fromchain,tochain,fromtoken,totoken,amount])
	
	useEffect(()=>{

	})
	
	const getQuote = async (params) => {
		const endpoint = "v2/quote"
		const quoteUrl = `${PATH_FINDER_API_URL}/${endpoint}`
	
		console.log(quoteUrl)
	
		try {
			const res = await axios.get(quoteUrl, { params })

			return res.data;
			
		} catch (e) {
			console.error(`Fetching quote data from pathfinder: ${e}`)
		}    
	}
	const checkAndSetAllowance = async (wallet, tokenAddress, approvalAddress, amount) => {
		// Transactions with the native token don't need approval
		if (tokenAddress === ethers.constants.AddressZero) {
			return
		}
	
		const erc20 = new ethers.Contract(tokenAddress, erc20_abi, wallet);
		const allowance = await erc20.allowance(await wallet.getAddress(), approvalAddress);
		if (allowance.lt(amount)) {
			const approveTx = await erc20.approve(approvalAddress, amount, {gasPrice: await wallet.provider.getGasPrice()});
			try {
				await approveTx.wait();
				console.log(`Transaction mined succesfully: ${approveTx.hash}`)
			}
			catch (error) {
				console.log(`Transaction failed with error: ${error}`)
			}
		}
		else{

			console.log("enough allowance")
			alert("enough allowance")
		}
	}
	const getTransaction = async (params, quoteData) => {
		const endpoint = "v2/transaction"
		const txDataUrl = `${PATH_FINDER_API_URL}/${endpoint}`
	
		console.log(txDataUrl)
	
		try {
			const res = await axios.post(txDataUrl, {
				...quoteData,
				fromTokenAddress: params.fromTokenAddress,
				toTokenAddress: params.toTokenAddress,
				slippageTolerance: 0.5,
				senderAddress: account,
				receiverAddress: account,
				widgetId: params.widgetId
			})
			return res.data;
		} catch (e) {
			console.error(`Fetching tx data from pathfinder: ${e}`)
		}    
	}
  return (
	<div>

<center>
<div class="navbar">
	

		<h1>Voyager Demo Dapp🚀</h1>
		<button class="button-52" onClick={async ()=>{

if(window.ethereum) {
	console.log('detected');

	try {
	  const accounts = await window.ethereum.request({
		method: "eth_requestAccounts",
	  });

	  setAccount(accounts[0])
	
	  console.log(accounts[0])
	  const provider = new ethers.providers.Web3Provider(window.ethereum);
	  const provider1 = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/polygon_mumbai", 80001);
	  const provider2 = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/avalanche_fuji", 43113);
	  const signer = provider.getSigner();

	  

	  

	  const contract = new ethers.Contract(
		  from,
		  erc20_abi,
		  provider1
	  );
	  

	  let balance = await contract.balanceOf(accounts[0])

	  console.log(ethers.utils.formatEther(balance)*Math.pow(10,6));
	  setPolygonBalance(ethers.utils.formatEther(balance)*Math.pow(10,6))
	  const contract2 = new ethers.Contract(
		to,
		erc20_abi,
		provider2
	);
	balance = await contract2.balanceOf(accounts[0])
	  console.log(ethers.utils.formatEther(balance)*Math.pow(10,12));
	  setAvalancheBalance(ethers.utils.formatEther(balance)*Math.pow(10,12))

	}
	catch(err) {
	  console.log(err)
	}
  }

		}}> {account.substring(0,4)+"...."+account.substring(38,42)}</button>
		</div>
		<br></br>
		<br></br><br></br>
		<h5>Transfer UDST from Polygon Mumbai to Avalanche Fuji</h5>
		<br></br>
		<div>Polygon: {polygonBalance}&nbsp;&nbsp;&nbsp;&nbsp;Avalanche: {avalancheBalance}</div>
		
		
		
		<br></br>
		<input placeholder='Enter Amount' onChange={(e)=>{setAmount(e.target.value*Math.pow(10,12))}}></input>
		<h2>Steps</h2>
		<br></br>
{/* {amount} */}


		<button  class="button-51" onClick={async ()=>{
			
			const params ={
				'fromTokenAddress': from,
				'toTokenAddress': to,
				'amount': amount,
				'fromTokenChainId': "80001",
				'toTokenChainId': "43113", // Fuji
		
				'widgetId': 0, // get your unique wdiget id by contacting us on Telegram
			}
			

			setStep1('✅')
			alert(quoteData.allowanceTo)
		
			console.log(quoteData)
		}}>Step 1: Get Quote {step1}</button>

		<br></br>
		<br></br>
			<button class="button-51" onClick={async () => {


	// setting up a signer
	// const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/polygon_mumbai", 80001);
	// // use provider.getSigner() method to get a signer if you're using this for a UI


	
	// const wallet = new ethers.Wallet("7de83cb8af577175dd83cfcaa59d8803189c0f95a0f7b8ba239bd7b641de3761", provider)
	


	// }

	 
		
	
		// ❌ Check if Meta Mask Extension exists 
		if(window.ethereum) {
		  console.log('detected');
	
		  try {
			const accounts = await window.ethereum.request({
			  method: "eth_requestAccounts",
			});

			console.log(accounts[0])
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();

			

			await checkAndSetAllowance(
				signer,
				fromtoken, // fromTokenAddress (USDT on Mumbai)
				quoteData.allowanceTo, // quote.allowanceTo in getQuote(params) response from step 1
				ethers.constants.MaxUint256 // amount to approve (infinite approval)
			);
			setStep2('✅')
		  }
		  catch(err) {
			console.log(err)
		  }
		}
	}
}>Step 2: Check Allowance {step2}</button>
<br></br>
<br></br>

<button class="button-51" onClick={async () => {
	if(window.ethereum) {
		console.log('detected');
  
		try {
		  const accounts = await window.ethereum.request({
			method: "eth_requestAccounts",
		  });

		  console.log(accounts[0])
		  const provider = new ethers.providers.Web3Provider(window.ethereum);
		  const signer = provider.getSigner();

		  

		  const txResponse = await getTransaction({
			'fromTokenAddress': fromtoken,
			'toTokenAddress': totoken,
			'fromTokenChainId': fromchain,
			'toTokenChainId': tochain, // Fuji
	
			'widgetId': 0, // get your unique wdiget id by contacting us on Telegram
		}, quoteData); // params have been defined in step 1 and quoteData has also been fetched in step 1
	
		// sending the transaction using the data given by the pathfinder
		const tx = await signer.sendTransaction(txResponse.txn.execution)
		try {
			await tx.wait();
			console.log(`Transaction mined successfully: ${tx.hash}`)
			alert(`Transaction mined successfully: ${tx.hash}`)
			setStep3('✅')
		}
		catch (error) {
			console.log(`Transaction failed with error: ${error}`)
		}
		}
		catch(err) {
		  console.log(err)
		}
	  }
    
  
    
   
    
}}>Step 3: Execute {step3}</button>
</center>

<div style={{ padding: '1rem', }}>
  <input
    type="text"
    placeholder="Type your message..."
    value={userMessage}
    onChange={handleUserMessageChange}
    style={{
      width: '100%',
      padding: '0.5rem 0.75rem',
      borderRadius: '0.5rem',
      boxShadow: '0 0 0 2px rgba(0, 115, 230, 0.25)',
      outline: 'none',
      border: '2px solid transparent',
      focus: '2px solid rgba(59, 130, 246, 0.5)',
    }}
  />
  <button
    onClick={handleSendMessage}
    style={{
      backgroundColor: '#3490dc',
      color: '#fff',
      fontWeight: 500,
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      width: '100%',
      outline: 'none',
	  marginTop: '2rem'
    }}
  >
    Send
  </button>
</div>

	</div>
  )
}

export default App