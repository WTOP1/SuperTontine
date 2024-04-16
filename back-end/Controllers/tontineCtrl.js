const { Timestamp } = require('mongodb');
const fb = require('../firebaseConfig');
const db = fb.firestore();
const {v4:uuid4} = require('uuid')
const { FieldValue} = require('firebase-admin/firestore')


exports.create = (req, res, next) => {
    let date = new Date()
    const rules = req.body.rules
    const code = uuid4()
    console.log(rules)
    const members = req.body.members
    console.log(members);

     const tontineJson = {
            name : req.body.name,
            description: req.body.description, 
            createAt:  date,
            rules:rules,
            code : code,
            startDate: req.body.startDate,
            adminId: req.body.adminId,
            members:members

        }
        const response = db.collection("Tontines").add(tontineJson)
        res.send(response);
}

exports.update = (req, res, next) =>{
    res.json({message: "update la tontine"})
}

exports.delete = (req, res, next) =>{
    
}

exports.join = async (req, res) => {
  const invitationCode = req.body.code;
  const userId = req.body.userId;

  // referencement vers les collections firebase concernées
  const tontinesRef = db.collection('Tontines');
  const usersRef = db.collection('utilisateurs');

  // validation du code d'adhésion
  const tontineQuery = tontinesRef.where('code', '==', invitationCode).limit(1);
  const tontineDoc = await tontineQuery.get();
  if (tontineDoc.empty) {
    res.status(400).send('Invalid invitation code');
    return;
  }

  const tontineData = tontineDoc.docs[0].data();
  const tontineId = tontineDoc.docs[0].id;

  // vérifier si l'utilisateur est déjà membre de la tontine en question
  const userTontinesQuery = tontinesRef
    .doc(tontineId)
    .collection('members')
    .where('userId', '==', userId)
    .limit(1);
  const userTontinesDoc = await userTontinesQuery.get();
  if (!userTontinesDoc.empty) {
    res.status(400).send('User is already a member of this tontine');
    return;
  }

  // prendre les informations de l'utilisateur depuis la collections des utilisateurs
  const userDoc = await usersRef.doc(userId).get();
  if (userDoc.empty) {
    res.status(400).send('User not found');
    return;
  }
  const userData = userDoc.data();

  console.log(userData)
  console.log(tontineId)
  
    // Ajouter l'utilisateur à la Tontine
    tontinesRef.doc(tontineId).update({
      members: FieldValue.arrayUnion(userData),
    });


 // renvoyer un message de succès
  res.status(200).send(`User ${userId} has joined tontine ${tontineData.name}`);
};
