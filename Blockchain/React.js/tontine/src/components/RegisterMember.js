import React, { useState, useEffect } from "react";
//import { Framework } from "@superfluid-finance/sdk-core";
import {
  Button,
  Form,
  FormGroup,
  FormControl, 
  Spinner,
  Card,
  Table
} from "react-bootstrap";
import "../CreateFlow.css";
import { ethers } from "ethers";
import { tontineAddress, tontineABI } from '../utilsContract.js';
// Host Mumbai: 0xEB796bdb90fFA0f28255275e16936D25d3418603
//CFA Mumbai: 0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873 
// SuperToken Mumbai:  0x96B82B65ACF7072eFEb00502F45757F254c2a0D4

let account;

let membersData = [];

let membersRegister = {};


export const RegisterMember = () => {
  const [name, setName] = useState("");
  const [signature, setSignature] = useState("");
  const [addresswallet, setAddresswallet] = useState("");
  const [members, setMembers] = useState([]);
  const [isButtonLoading, setIsButtonLoading] = useState(false); 
  const [currentAccount, setCurrentAccount] = useState("");

  const connectWallet = async () => {
    
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts"
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      account = currentAccount;
      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
  };

  const RegisterMember = async (name) => {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    //const chainId = await window.ethereum.request({ method: "eth_chainId" });
   
    /*if (!currentAccount) {
        return alert('Veuillez connecter votre wallet');
      }
    */
      if (!name) {
        return alert('Veuillez entrer votre username');
      }

        //const signer = await connectWallet();

        console.log("La signature du wallet du membre qui veut s'inscrire est ", signer);

  
        const tontine = new ethers.Contract(
            tontineAddress,
            tontineABI,
            signer
        )
        const wallet = await signer.getAddress();
        console.log("Compte connecté actuel ", wallet);
        setAddresswallet(wallet);
        account = wallet;
        console.log("adress wallet ", account);

        try {

            await tontine
                .registerMember(account,name, { gasLimit: 3000000 })
                .then(function (tx) {
                    console.log(`
                Congrats! Mr/Mme ${name} You just successfully register. 
                Tx Hash: ${tx.hash}
            `)
          })

          //fetchMembers();
        
          } catch(error) {
            console.log(
              "Hmmm, your subscription threw an error.!"
            );
            console.error(error);
          }

    
  };

 

  const checkIfWalletIsConnected = async () => {
    console.log("runs");
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const chain = await window.ethereum.request({ method: "eth_chainId" });
    let chainId = chain;
    console.log("chain ID:", chain);
    console.log("global Chain Id:", chainId);
    if (accounts.length !== 0) {
      account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
      // Setup listener! This is for the case where a user comes to our site
      // and ALREADY had their wallet connected + authorized.
      // setupEventListener()
    } else {
      console.log("No authorized account found");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  /*useEffect(() => {
    fetchMembers();
  }, []);*/


  function CreateButtonRegister({ isLoading, children, ...props }) {
    return (
      <Button variant="success" className="button" {...props}>
        {isButtonLoading ? <Spinner animation="border" /> : children}
      </Button>
    );
  }


  const handleNameChange = (e) => {
    setName(() => ([e.target.name] = e.target.value));
  };

  return (
    <div>
      <h2>Veuillez vous inscrire</h2>
      {currentAccount === "" ? (
        <button id="connectWallet" className="button" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <Card className="connectedWallet">
          {`${currentAccount.substring(0, 4)}...${currentAccount.substring(
            38
          )}`}
        </Card>
      )}
      <Form>
        <FormGroup className="mb-3">
          <FormControl
            name="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your Username"
          ></FormControl>
        </FormGroup>
       
        <CreateButtonRegister
          onClick={() => {
            setIsButtonLoading(true);
            RegisterMember(name);
            setTimeout(() => {
              setIsButtonLoading(false);
            }, 1000);
          }}
        >
          Click to register you
        </CreateButtonRegister>
        
      </Form>

     
      <div className="description">
        <p>
          Liste des membres inscrits
        </p>
        
        <Table striped bordered hover variant="dark">
           
            <thead>
                <tr>
                <th>#</th>
                <th>Wallet</th>
                <th>Username</th>
                </tr>
            </thead>
            <tbody>
                    {members.map((member) => (
                <tr key={member.wallet}>
                    <td>{member.identifiant}</td>
                    <td>{member.wallet}</td>
                    <td>{member.name}</td>
                </tr>
                ))}
    
            </tbody>

        </Table>
       
      </div>
     
    </div>
  );
};
