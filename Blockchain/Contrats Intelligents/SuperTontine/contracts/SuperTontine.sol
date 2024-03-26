// initializing the CFA Library
pragma solidity 0.8.24;

import "hardhat/console.sol";

/*import { 
    ISuperfluid 
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import { 
    ISuperToken 
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";

import {
    SuperTokenV1Library
} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";
*/


// fonction Acceder à une tontine ou  Voir une tontine

// Normalement à chaque code d'invitation un statut, un membre peut etre créateur dans une tontine et seulement membre dans l'autre

contract SuperTontine {

    //using SuperTokenV1Library for ISuperToken;
    //ISuperToken public token;

     struct Members {
       uint256 identifiant;
       address wallet;
       string name;
       string password;
       string status;
       // tableau de codes d'invitations de membres
       string[] tontineCodes;
    }
    //liste des membres inscrits sur la plateforme
    mapping(address => Members) membersRegister;
    address[] membersWalletRegister;

    struct Tontine {
        string invitationCode;
        address tontineAccount;
       uint contributionAmount;
       ContributionFrequency contributionFrequency;
       
       uint256 creationDate;
       string startDate;
       mapping(uint256 => Members) members; // Mapping des membres de la tontine
       uint memberCount; // Compteur du nombre de membres
    } 
    
    mapping(string => Tontine) tontines;

    //le nombre de tontines existantes
    uint256 tontinesCount = 0;

    string[] tontineCodesInvitation;

    //le nombre de tontines auxquels appartient un membre
    uint256 memberTontinesCount = 0;

    uint256 memberRegisterCount = 0;

    enum ContributionFrequency {hebdomadaire, mensuel}

    address owner;

    constructor(
        //ISuperToken _token
        ){
        //token = _token;

        //console.log("Owner contract deployed by:", msg.sender);
        owner = msg.sender;
       
    }

    
    // My contract code here...
    function registerMember(address _wallet, string memory _name, string memory _password) public {
       
        string memory _status = "Membre";

        require(membersRegister[_wallet].wallet == address(0), "This member is already registered.");

        Members memory member = Members({
            identifiant:memberRegisterCount,
            name: _name,
            wallet: _wallet,
            password:_password,
            status:_status,
            tontineCodes: new string[](0)
        });

        membersRegister[_wallet] = member;

        membersWalletRegister.push(_wallet);

        memberRegisterCount++;
    // Ajouter le membre à une liste de membres enregistrés, si nécessaire
    }
    
    function getAllMembersRegister() public view returns (address[] memory) {
        address[] memory MembersRegist = new address[](membersWalletRegister.length);
        for (uint256 i = 0; i<membersWalletRegister.length; i++){
             address _wallet = membersWalletRegister[i];
             MembersRegist[i] = membersRegister[_wallet].wallet;
        }    
        return MembersRegist;
    }

     function createTontine(
        address _CreatorWallet,
        string memory _invitationCode,
        address _tontineAccount,
        uint _contributionAmount,
        ContributionFrequency _contributionFrequency,
        string memory _startDate
        ) public {

        require(membersRegister[_CreatorWallet].wallet != address(0), "Veuillez vous inscrire d'abord.");

        /*
        L'utilisation de bytes(tontines[_invitationCode].invitationCode).length permet de convertir la chaîne de caractères tontines[_invitationCode].invitationCode en tableau de bytes et de vérifier la longueur de ce tableau. Si la longueur est égale à zéro, cela signifie que le champ invitationcode est vide, ce qui indiquerait que la tontine n'a pas encore été crée.
        */
        require(bytes(tontines[_invitationCode].invitationCode).length == 0, "Tontine already exists with this invitation code.");

        Tontine storage tontine = tontines[_invitationCode];

        tontine.invitationCode = _invitationCode;
        tontine.tontineAccount = _tontineAccount;
        tontine.contributionAmount = _contributionAmount;
        tontine.contributionFrequency = _contributionFrequency;
        //Le block.timestamp renvoie effectivement un nombre représentant le nombre de secondes écoulées depuis le 1er janvier 1970 (timestamp Unix). 
        tontine.creationDate = block.timestamp;
        tontine.startDate = _startDate;

        /*tontine.members[tontine.memberCount] = membersRegister[_CreatorWallet];
        tontine.memberCount++;*/

        // Mettre à jour le statut du membre en tant que créateur
        membersRegister[_CreatorWallet].status = "Createur Tontine";

        tontineCodesInvitation.push(_invitationCode);

        tontinesCount++;
    }
    
    function joinTontine(string memory _invitationCode, address _wallet) public {

        Tontine storage tontine = tontines[_invitationCode];

        require(bytes(tontine.invitationCode).length != 0, "Tontine does not exist with this invitation code.");

        Members storage member = membersRegister[_wallet];
        require(member.wallet != address(0), "Veuillez vous incrire d'abord.");

        // Vérifier si le membre n'est pas déjà dans la tontine
        for (uint256 i = 0; i < member.tontineCodes.length; i++) {
            require(keccak256(bytes(member.tontineCodes[i])) != keccak256(bytes(_invitationCode)), "Member is already part of this tontine.");
        }

        // Ajouter le code de la tontine au tableau du membre
        member.tontineCodes.push(_invitationCode);


       // member.status = "Membre Tontine";
        // Créer une nouvelle instance du struct Members
        Members memory newMember = Members({
            identifiant: member.identifiant,
            wallet: member.wallet,
            name: member.name,
            password: member.password,
            status:member.status,
            tontineCodes: member.tontineCodes
        });

        // Ajouter le membre à la tontine
        tontine.members[tontine.memberCount] = newMember;
        tontine.memberCount++;
}



    function getInfosTontine(string memory invitationCode) public view returns(
        string memory, 
        uint256,
        ContributionFrequency,
        uint256,
        string memory)
        {

        return (
        tontines[invitationCode].invitationCode,
        tontines[invitationCode].contributionAmount,
        tontines[invitationCode].contributionFrequency,
        tontines[invitationCode].creationDate,
        tontines[invitationCode].startDate   
        );
    }

    function getMemberTontineDetails(address _memberAddress) public view returns 
     (address, string memory, string memory, string[] memory) {
        
        address memberWallet;
        string memory memberName;
        string memory memberStatus;
        bool memberFound = false;
       
        
        // Tableau pour stocker les codes d'invitation des tontines du membre
        string[] memory memberTontineCodes;
        
        // Parcours de toutes les tontines
        for (uint256 i = 0; i < tontineCodesInvitation.length; i++) {
            string memory invitationCode = tontineCodesInvitation[i];
            Tontine storage tontine = tontines[invitationCode];
            
            // Parcours de tous les membres de la tontine
            for (uint256 j = 0; j < tontine.memberCount; j++) {
                Members storage member = tontine.members[j];
                
                // Vérification si l'adresse du membre correspond
                if (member.wallet == _memberAddress) {
                    // Stockage des informations personnelles du membre
                    memberName = member.name;
                    memberStatus = member.status;
                    memberWallet = member.wallet;
                    
                    
                    // Mise à jour du tableau des codes d'invitation des tontines du membre
                    memberTontineCodes = member.tontineCodes;

                    memberFound = true;
                    
                    // Sortie de la boucle interne, car nous avons trouvé le membre correspondant
                    break;
                }
            }
            // Vérification si le membre a été trouvé dans une tontine
            if (memberFound) {
                // Sortie de la boucle externe, car nous avons trouvé le membre dans une tontine
                break;
            }
        }
    
        // Vérification si le membre n'a pas été trouvé dans une tontine
        require(memberFound, "You are not associated with a tontine.");

      return (memberWallet, memberName, memberStatus, memberTontineCodes);
    }

    function getAllTontines() public view returns (string[] memory) {
        string[] memory tontinesPlateforme = new string[](tontineCodesInvitation.length);
        for (uint256 i = 0; i<tontineCodesInvitation.length; i++){
             string memory invitationCode = tontineCodesInvitation[i];
             tontinesPlateforme[i] = tontines[invitationCode].invitationCode;
        }    
    return tontinesPlateforme;
    }

/*
permet d'enregistrer un membre existant ou non existant dans une tontine existante en utilisant l'invitationCode.
 Cette fonction vérifie d'abord si la tontine existe et si le membre n'est pas déjà enregistré avant de procéder à l'enregistrement du membre,
 mais le membre peut exister et veut appartenir à une autre tontine.
*/
   

 // liste des tontines 
    function getCountTontines() public view returns (uint256) {

        return tontinesCount;

    }   


    function getTontineMembers(string memory _invitationCode) public view returns (address[] memory) {
        Tontine storage tontine = tontines[_invitationCode];
        require(bytes(tontine.invitationCode).length != 0, "Tontine does not exist with this invitation code.");
        address[] memory membersTontine = new address[](tontine.memberCount);
       
        // Parcours de tous les membres de la tontine
        for (uint256 i = 0; i < tontine.memberCount; i++) {
            membersTontine[i] = tontine.members[i].wallet;
          
        }
        
        return membersTontine;
    }




}