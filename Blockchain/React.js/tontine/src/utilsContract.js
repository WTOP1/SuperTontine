const tontineAddress= "0x866ed6fD5b0fECAc9F72F32275FCbB5C5B661C4a";

const tontineABI = [
    {
      "inputs": [
        {
          "internalType": "contract ISuperToken",
          "name": "_supertoken",
          "type": "address"
        },
        {
          "internalType": "contract ISuperfluid",
          "name": "_superfluid",
          "type": "address"
        },
        {
          "internalType": "contract IConstantFlowAgreementV1",
          "name": "_cfa",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "int256",
          "name": "flowRate",
          "type": "int256"
        }
      ],
      "name": "ContributionReceived",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "member",
          "type": "address"
        }
      ],
      "name": "MemberRegistered",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_receiver",
          "type": "address"
        },
        {
          "internalType": "int96",
          "name": "_flowRate",
          "type": "int96"
        }
      ],
      "name": "makeContribution",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_wallet",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "registerMember",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  export {tontineAddress,tontineABI};