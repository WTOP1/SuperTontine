//barre de tache a l'entete

// !important
import "./publique/css/font-awesome.css";
import "./publique/css/all.css";
import "./publique/css/font-awesome.min.css";
import "./publique/css/general.css"

// !Autres
import "./publique/css/head.css"
import logo from "./image/logo.jpeg"

function EnTete() {
  return <>
  <div className="entete">
  <img src={logo} align="center" id="logo"/>
  	<div id="icone">
		<i class=" fas fa-user-circle space responsiveIco" ></i>
		<i class="fas fa-bell space responsiveIco"></i>
		<i class="fas fa-th-list responsiveIco" ></i>
	</div>
	<input type="text" id="recherche" placeholder="Rechercher...  " ></input>
  </div>
 </>
}

export default EnTete

