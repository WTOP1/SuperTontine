//menu de gauche 

import "./publique/css/font-awesome.css";
import "./publique/css/all.css";
import "./publique/css/font-awesome.min.css";
import "./publique/css/depot.css"
import "./publique/css/acceuil2.css"
import "./publique/css/test.css"
import "./publique/css/slideTontine.css"
import "./publique/css/objet.css"
import logo from "./image/logo.jpeg"
import React , { useRef, useState } from "react";

function Menu() {
    const listTontine=["Tontine 1","Tontine 1","Tontine 1","Tontine 1"]
    const [classChevron,setClassChevron]=useState("fas fa-chevron-down")
    const [feel,setFeel]=useState(" ")
    const changeViewList=()=> {
      if (classChevron=="fas fa-chevron-down") {
        setClassChevron("fas fa-chevron-up")
        setFeel(
          <div id="liste" >
          <ul type="disk">
          {listTontine.map((tontine) => <li key={tontine}>{tontine} </li>)}
          </ul>
        </div>
        )
        //
      }
      else{
        setClassChevron("fas fa-chevron-down")
        setFeel(" ")
      }
    }
  
    return 	<div id="menu" >
    <img src={logo} align="center" id="logo"/>
    <div id="separateur">
    <div className="onglet"><i className="fas fa-home" ></i>	Accueil</div>
    <div className="onglet" >
      <i className=" fas fa-user-friends" ></i> Mes Tontines
      <i className={classChevron} onClick={changeViewList} id="leftMargin"></i></div>
      {feel}
   <div className="onglet" ><i class="fas fa-money-bill-alt" ></i>	Deposer/Retirer</div> 
    <div className="onglet"><i className="fas fa-cog" ></i>		Param&egrave;tres</div>
    <div className="onglet"><i className="fas fa-phone" ></i>	Nous contacter</div>
    </div>
  </div>
}
export default Menu