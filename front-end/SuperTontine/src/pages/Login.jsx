import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import '../styles/login.css';
import 'boxicons';
import {getAuth,signOut, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4rHcCC1YlUBHriD9wxJVundMDiwB3p5k",
  authDomain: "supertontine-a5296.firebaseapp.com",
  projectId: "supertontine-a5296",
  storageBucket: "supertontine-a5296.appspot.com",
  messagingSenderId: "219328670504",
  appId: "1:219328670504:web:e8454a73d33699219e3e1d",
  measurementId: "G-LGTCEKZR97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

function Login() {
  const navigate = useNavigate();
  useEffect(()=>{
        if(sessionStorage.getItem("Utilisateurs")){
          navigate("/home")
        }
  })

  //Se connecter avec un compte google
 const  signInGoogleBtn = ()=>{
    signInWithRedirect(auth, new GoogleAuthProvider()).catch((err) =>{
      console.log(err.message)
    })
  }

  // l'état de l'utilisateur

  onAuthStateChanged(auth, (user)=>{
    if(user){
    navigate("/home")
    }
  })



  const { register, handleSubmit } = useForm();
  const [isSignUpClicked, setSignUpClicked] = useState(false);

  const handleSignUpClick = () => {
    setSignUpClicked(true);
  };

  const handleLoginClick = () => {
    setSignUpClicked(false);
  };
const formu = useRef(null);
  const onSubmit = (data) => {
    if (isSignUpClicked) {
      // Soumission du formulaire d'inscription
      if (data.password !== data.confirmedpassword) {
        toast.error("Les mots de passe ne correspondent pas");
      } else {
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((cred)=>{
          toast.success("inscription reussie")
          
          setSignUpClicked(false);
        })
        .catch((err)=>{

          if(err.message==="Firebase: Error (auth/email-already-in-use)."){
            toast.error("ce mail est déjà utiliser");
          }
          else{
          if(err.message==="Firebase: Password should be at least 6 characters (auth/weak-password)."){
            toast.error("le mot de passe doit contenir aumoins 6 caractères");
          }else{
            toast.error(err.message);
          }            
          }

        })
      }
    } else {
      // Soumission du formulaire de connexion
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((cred) =>{
          toast.success("connexion réussite");
          
        })
        .catch((err)=>{
          console.log(err.message)
          toast.error("informations de connexion incorrectes")

        })
    }
  };

  return (
    <div>
      <section className="user">
        <div className="user_options-container">
          <div className="user_options-text">
            <div className="user_options-unregistered">
              <h2 className="user_unregistered-title">Vous n'avez pas encore un compte SuperTontine?</h2>
              <p className="user_unregistered-text">Créez-en un ici</p>
              <button className="user_unregistered-signup" id="signup-button" onClick={handleSignUpClick}>S'inscrire</button>
            </div>
            <div className="user_options-registered">
              <h2 className="user_registered-title">Vous avez déjà un compte SuperTontine?</h2>
              <p className="user_registered-text">Connectez-vous ici</p>
              <button className="user_registered-login" id="login-button" onClick={handleLoginClick}>Se connecter</button>
            </div>
          </div>

          <div className={`user_options-forms ${isSignUpClicked ? 'bounceLeft' : 'bounceRight'}`} id="user_options-forms">
            <img src="./assets/img/supertontine2_no_bg.png" className="logo" alt="logo"></img>
            <div className={isSignUpClicked ? 'user_forms-signup' : "user_forms-login"}>
              <h2 className="forms_title">{isSignUpClicked ? 'S\'inscrire' : 'Se connecter'}</h2>
              <form className="forms_form" ref={{formu}} onSubmit={handleSubmit(onSubmit)}>

              {isSignUpClicked ?       <div className="forms_field">
                <input
                  type="email"
                  placeholder="Email"
                  className="forms_field-input"
                  required
                  {...register("email", { required: "Veuillez entrer votre adresse email" })}
                />
              </div> : ""}
                {!isSignUpClicked && (
                  <div className="forms_field">
                    <input type="email" placeholder="Email" className="forms_field-input" {...register("email", { required: true })} required autoFocus />
                  </div>
                )}
                <div className="forms_field">
                  <input type="password" placeholder="Mot de passe" className="forms_field-input" {...register("password", { required: true })} required />
                </div>
                {isSignUpClicked && (
                  <div className="forms_field">
                    <input type="password" placeholder="Confirmez le mot de passe" className="forms_field-input" {...register("confirmedpassword", { required: true })} required />
                  </div>
                )}
                <div className="forms_buttons">
                  {isSignUpClicked ? (
                    <>
                      <input type="submit" value="S'inscrire" className="forms_buttons-action" />
                      <div className='google' onClick={signInGoogleBtn}> <box-icon name='google' size="md" color="#004aad" type='logo'  animation='tada-hover' ></box-icon> </div>
                    </>
                  ) : (
                    <>
                      <Link to="/forgot-password">
                        <button type="button" className="forms_buttons-forgot">Mot de passe oublié</button>
                      </Link>
                      <input type="submit" value="Se connecter" className="forms_buttons-action" />
                      <div className='google' onClick={signInGoogleBtn}> <box-icon border='square' name='google' size='lg' color="#004aad" type='logo'  animation='tada-hover' ></box-icon> </div>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
