// initializing the CFA Library
pragma solidity 0.8.24;

import "hardhat/console.sol";

import { 
    ISuperfluid
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";

import { 
    ISuperToken 
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";

import {
    SuperTokenV1Library
} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";



// fonction Acceder à une tontine ou  Voir une tontine

// Normalement à chaque code d'invitation un statut, un membre peut etre créateur dans une tontine et seulement membre dans l'autre

contract SuperTontineSimple {

    using SuperTokenV1Library for ISuperToken;
    ISuperToken supertoken;
    ISuperfluid superfluid;
    IConstantFlowAgreementV1 cfa;

    string invitationCode;
    address tontineAccount;

    //uint contributionAmount;
    string contributionFrequency;  
    uint256 creationDate;
    string startDate;
    uint memberCount; // Compteur du nombre de membres

    struct Member {
       uint256 identifiant;
       address wallet; 
       string name; 
       bool isBeneficiary;
       bool isContributor;
    }

    //liste des membres inscrits sur la plateforme
    mapping(address => Member) members;

    address[] membersRegister;

    uint private currentBeneficiaryIndex;

    //address private owner;

    //flow rate par semaine dans le stream
    //uint96 flowRateWeek;

    int96 flowRatePerSec;

    // Evénements
    event ContributionReceived(address sender, address receiver, int256 flowRate);
    event MemberRegistered(address member);


    constructor(
       // address _superfluid,
        //address _cfa,
        //address _supertoken,
        ISuperToken _supertoken,
        ISuperfluid _superfluid,
        IConstantFlowAgreementV1 _cfa
        //address _tontineAccount,
       // uint256 _contributionAmount,
        //uint96 _flowRateWeek
        ) {

        superfluid = _superfluid;
        cfa = _cfa;
        supertoken = _supertoken;
        //tontineAccount = _tontineAccount;
        //contributionAmount = _contributionAmount;
        //flowRateWeek = _flowRateWeek;
        currentBeneficiaryIndex = 0;

        // Autoriser le contrat à recevoir des fonds Superfluid
        /*uint256 configWord =
            SuperAppDefinitions.APP_LEVEL_FINAL |
            SuperAppDefinitions.BEFORE_AGREEMENT_TERMINATED_NOOP |
            SuperAppDefinitions.AFTER_AGREEMENT_TERMINATED_NOOP;
        _registerApp(configWord);*/
       
    }
     


    // My contract code here...
    function registerMember(address _wallet,string memory _name) public {
       
        require(members[_wallet].wallet == address(0), "This member is already registered.");

        Member memory member = Member({
            identifiant:memberCount,
            wallet: _wallet,
            name:_name,
            isBeneficiary: false,
            isContributor: false
        });
        members[_wallet] = member;
        membersRegister.push(_wallet);
        memberCount++;
    }

// 1 ether =  10exp 18 wei

    function makeContribution(address _receiver, int96 _flowRate) external{


        tontineAccount = _receiver;
        flowRatePerSec=_flowRate;


        require(members[msg.sender].wallet != address(0), "Member no saved");

            // Convertir le flux hebdomadaire en flux par seconde
        //uint256 flowRatePerSecond = flowRateWeek / 604800; // 604800 secondes dans une semaine

        // Approuver le transfert de Super Tokens au contrat par le sender
        //supertoken.approve(msg.sender, flowRatePerSecond);

       (,int96 flowRate,,) = cfa.getFlow(supertoken, msg.sender, _receiver);

        if (flowRate == 0) {
            // Créer le flux d'argent hebdo entre le contributeur et le compte de la tontine

            superfluid.callAgreement(
                cfa,
                abi.encodeWithSelector(
                    cfa.createFlow.selector,
                    supertoken,
                    _receiver,
                    _flowRate,
                    new bytes(0)
                ),
                "0x"
            );
        }
        members[msg.sender].isContributor = true;
       // checkDistribution();   
    }

    /*function makeContribution(address _sender,address _receiver, uint96 flowRateByWeek) external{

        tontineAccount = _receiver;
        
        require(members[_sender].wallet != address(0), "Member no saved");

            // Convertir le flux flowRateByWeek en flux par seconde
        uint96 flowRatePerSecond = flowRateByWeek / 604800; // 604800 secondes dans une semaine
 
        cfa.createFlowFrom(supertoken, _sender, _receiver, flowRatePerSecond);

    }*/

    function checkDistribution() private {
        bool allContributed = true;
        for (uint256 i = 0; i < membersRegister.length; i++) {
            if (!members[membersRegister[i]].isContributor) {
                allContributed = false;
                break;
            }
        }
  
        if (allContributed) {

            distributeFunds();

            for (uint256 i = 0; i < membersRegister.length; i++) {
              members[membersRegister[i]].isContributor = false;
            }
        }
    }
  
    
    function distributeFunds() private {

        require(membersRegister.length > 0, "No members registered");

        // Vérifier si tous les membres ont déjà bénéficié
        /*
        Cette partie du code vérifie si tous les membres ont déjà bénéficié une fois. 
        Nous initialisons une variable booléenne allBeneficiaries à true, 
        ce qui signifie que tous les membres sont considérés comme ayant déjà bénéficié. 
        */
        bool allBeneficiaries = true;
        /*
        Si nous trouvons un membre dont la variable isBeneficiary est à false (ce qui signifie qu'il n'a pas encore bénéficié), 
        nous changeons la valeur de allBeneficiaries à false et sortons de la boucle à l'aide de l'instruction break.
        */
        for (uint256 i = 0; i < membersRegister.length; i++) {
            if (!members[membersRegister[i]].isBeneficiary) {
                allBeneficiaries = false;
                break;
            }
        }
        /*
        Si la variable allBeneficiaries est true, cela signifie que tous les membres ont déjà bénéficié une fois. 
        Dans ce cas, nous parcourons à nouveau le tableau membersRegister et réinitialisons la variable isBeneficiary 
        pour chaque membre à false. 
        Cela permettra aux membres de bénéficier à nouveau lors du prochain cycle.
        */
        if (allBeneficiaries) {
            // Réinitialiser la variable isBeneficiary pour tous les membres
            for (uint256 i = 0; i < membersRegister.length; i++) {
                members[membersRegister[i]].isBeneficiary = false;
            }
        }
        /*
        Nous déclarons une variable beneficiary pour stocker l'adresse du membre bénéficiaire actuel, 
        qui est récupérée à partir du tableau membersRegister en utilisant l'index currentBeneficiaryIndex. 
        Ensuite, nous récupérons le solde de la supertoken dans le compte principal de la tontine et le stockons dans la variable balance. 
        */
        address beneficiary = membersRegister[currentBeneficiaryIndex];
        uint256 balance = supertoken.balanceOf(tontineAccount);
        require(balance > 0, "No funds available to distribute");

        if (!members[beneficiary].isBeneficiary) {
            supertoken.transfer(beneficiary, balance);
            members[beneficiary].isBeneficiary = true;
        }

        currentBeneficiaryIndex++;

        /*
        nous vérifions si l'index dépasse la longueur du tableau membersRegister. 
        Si c'est le cas, cela signifie que nous avons atteint la fin du tableau et que nous devons revenir 
        au premier membre bénéficiaire. Nous réinitialisons donc currentBeneficiaryIndex à zéro.
        */
        if (currentBeneficiaryIndex >= membersRegister.length) {
            currentBeneficiaryIndex = 0; // Revenir au premier membre bénéficiaire
        }
    }

}