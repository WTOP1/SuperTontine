//Page contenant les paramètres de compte 

// !important
import "./publique/css/font-awesome.css";
import "./publique/css/all.css";
import "./publique/css/font-awesome.min.css";
import "./publique/css/general.css"
import { NavLink } from "react-router-dom";

// !Autres

function Compte() {
  return <>
  <div className="fas fa-user-circle placeMilieu" id="userProfile"></div> <br />
  <table style={{fontSize: "20px"}} cellspacing="10" className="placeMilieu">
  <tr>
    <td>
      <i className="fas fa-user"></i>
      Nom :</td>
    <td> Seujip</td>
    <td>
    <NavLink to="/formulaireNom">
      <i className="fas fa-edit " style={{cursor:"pointer"}} ></i>
      </NavLink>
    </td>
  </tr>
  <tr>
    <td>
      <i className="fas fa-user"></i>
      Prenom :</td>
    <td> Emmanuel</td>
    <td>
    <NavLink to="/formulairePrenom">
      <i className="fas fa-edit" style={{cursor:"pointer"}} ></i>
      </NavLink>
    </td>
  </tr>
  <tr>
    <td>
      <i className="fas fa-user"></i>
      Nom d'utilisateur :</td>
    <td>Emmanuel Seujip</td>
    <td>
    <NavLink to="/formulaireUser">
      <i className="fas fa-edit "  style={{cursor:"pointer"}}></i>
      </NavLink>
    </td>
  </tr>
  <tr>
    <td>
      <i className="fas fa-user-friends"></i>
      Nombre Tontine :</td>
    <td> 4</td>
  </tr>
  <tr>
    <td>
      <i className="fas fa-envelope"></i>
        E-mail :</td>
    <td>emmanuelseujip@gmail.com</td>
    <td cellspacing="10px">
      <NavLink to="/formulaireMail">
      <i className="fas fa-edit " style={{cursor:"pointer"}} ></i>
      </NavLink>
    </td>
  </tr>
  <tr colspan="3">
    <td>
      <NavLink to="/formulairePassword">
      <p style={{cursor :"pointer"}}> <b><i className="fas fa-lock"></i> Changer le mot de passe </b></p> 
      </NavLink>
    </td>
  </tr>
  <tr colspan="3">
    <td><p style={{cursor :"pointer"}}> <b>
    <div style={{cursor:"pointer",color:"#004aad"}}>
      <i className="fas fa-door-open"></i>
      Se deconnecter
    </div>
    </b></p> </td>
  </tr>
</table>
</>
}  export default Compte