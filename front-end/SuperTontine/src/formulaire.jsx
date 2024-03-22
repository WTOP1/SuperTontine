// COmposant pour le formulaire de changement de données

// !important 
import "./publique/css/font-awesome.css";
import "./publique/css/all.css";
import "./publique/css/font-awesome.min.css";
import "./publique/css/general.css"
import "./publique/css/responsive.css"

import Champs from "./champs.jsx"

function Formulaire({children,classIcon}) {

    return <form action="post">
        <h2 align="center">Modifier {children}</h2> <br />
        <Champs classIcon={classIcon} name="ancien" placeholder="Entrez l'ancien">Ancien {children}</Champs>  <br />
        <Champs classIcon={classIcon} name="nouveau" placeholder="Entrez le nouveau">Nouveau  {children}</Champs>  <br />
        <Champs classIcon={classIcon} name="confirmer" placeholder="Reecriver votre choix">Confirmer  {children}</Champs>  <br />
        <table border="0px" cellspacing="10px" className="placeMilieu">
          <tr>
            <td><input type="submit" className="boutton2 annuler" value="Annuler"></input></td>
            <td><input type="submit" className="boutton2 valider" value="Valider"></input></td>
          </tr>
        </table>
        
    </form>
}

export default Formulaire