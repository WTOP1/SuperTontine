import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import '../styles/login.css';

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [isSignUpClicked, setSignUpClicked] = useState(false);

  const handleSignUpClick = () => {
    setSignUpClicked(true);
  };

  const handleLoginClick = () => {
    setSignUpClicked(false);
  };

  const onSubmit = (data) => {
    if (isSignUpClicked) {
      // Soumission du formulaire d'inscription
      if (data.password !== data.confirmedpassword) {
        toast.error("Les mots de passe ne correspondent pas");
      } else {
        axios.get(`http://localhost:3001/Utilisateurs?email=${data.email}`).then((res) => {
          if (res.data.length > 0) {
            toast.error("Un compte existe déjà avec cette adresse email");
          } else {
            axios.post("http://localhost:3001/Utilisateurs", data).then((res) => {
              toast.success("Inscription réussie");
              setSignUpClicked(false);
            }).catch((err) => {
              console.log(err);
              toast.error("Une erreur est survenue lors de l'inscription");
            });
          }
        });
      }
    } else {
      // Soumission du formulaire de connexion
      axios.get(`http://localhost:3001/Utilisateurs?email=${data.email}&password=${data.password}`).then((res) => {
        if (res.data.length > 0) {
          toast.success("Connexion réussie");
          navigate("/home");
        } else {
          toast.error("Les identifiants sont incorrects");
        }
      });
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
              <form className="forms_form" onSubmit={handleSubmit(onSubmit)}>
              {isSignUpClicked ?       <div className="forms_field">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="forms_field-input"
                  required
                  {...register("fullname", { required: "Veuillez entrer votre nom complet" })}
                />
              </div> : ""}
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
                      <button type="button" className="forms_buttons-forgot" onClick={handleLoginClick}>Annuler</button>
                    </>
                  ) : (
                    <>
                      <Link to="/forgot-password">
                        <button type="button" className="forms_buttons-forgot">Mot de passe oublié</button>
                      </Link>
                      <input type="submit" value="Se connecter" className="forms_buttons-action" />
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
