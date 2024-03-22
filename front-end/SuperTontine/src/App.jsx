// !important   fichier integre dans toute les pages
import "./publique/css/font-awesome.css";
import "./publique/css/all.css";
import "./publique/css/font-awesome.min.css";
import "./publique/css/general.css"
import "./publique/css/responsive.css"

// !Autres 
import "./publique/css/depot.css"
import "./publique/css/acceuil2.css"
import "./publique/css/slideTontine.css"
import "./publique/css/head.css"

import { createBrowserRouter,NavLink,Outlet, RouterProvider } from "react-router-dom";
import EnTete from "./head.jsx"
import Depot from "./depot.jsx"
import Compte from "./settings.jsx"
import SlideTontine from "./slideTontine.jsx";
import Formulaire from "./formulaire.jsx";


function App() {
  document.title="Super Tontine"
  const route=createBrowserRouter([{
    path: "/",
    element:<> 
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <EnTete></EnTete>
        <SlideTontine></SlideTontine>
        <div align="center" className="listBoutton">       
          <nav>
            <table border="0px" >
              <tr>
                <td rowspan="2" width="160px">
                  <div className="boutton montant" >
                    Montant: <br /> 3000 FCFA
                  </div>
                </td>
                <td height="60px"><NavLink to="deposer"> <div className="boutton deposer" width="200px" >Deposer</div> </NavLink> </td>
                <td rowspan="2" width="200px">
                  <NavLink to="/compte">
                      <div className="boutton compte" >                
                        <i className="fas fa-user-circle"></i> <br /> 
                        Mon compte
                      </div>
                  </NavLink>
                </td>
                <td rowspan="2">
                  <div className="boutton historique" >
                    <i className="fas fa-clock"></i> <br /> 
                    Historique <br /> Personnel
                  </div>
                </td>
                <td rowspan="2">
                  <div className="boutton historique" >
                    <i className="fas fa-user-friends"></i> <br /> 
                      Creer une tontine
                  </div>
                </td>
                <td rowspan="2">
                  <div className="boutton historique" >
                    <i className="fas fa-door-open"></i> <br /> 
                    Entrez dans une tontine
                  </div>
                </td>
              </tr>
              <tr>
                <td width="200px">
              <NavLink to="retirer">  <div className="boutton retirer">Retirer</div> </NavLink>
                </td>
              </tr>
            </table>
          </nav>
        </div> 
      <div id="principale">
        <Outlet></Outlet>
      </div>       
    </body>
    </html> 
    </>
    ,
    children : [{
    path:"deposer",
    element:<> <Depot>Deposer</Depot> </>
  },
  {
    path:"retirer",
    element:<Depot>Retirer</Depot>
  },
  {
    path: "compte",
    element: <Compte></Compte>
  },
  // les lies vers les formulaire de changenment de donnés
  {
    path :"formulaireNom",
    element : <Formulaire classIcon="fas fa-user">nom</Formulaire>
  },
  {
    path: "formulaireMail",
    element: <Formulaire classIcon="fas fa-envelope">email</Formulaire>
  },
  {
    path:"formulaireUser",
    element:<Formulaire classIcon="fas fa-user">nom utilisateur</Formulaire>
  },
  {
    path:"formulairePrenom",
    element:<Formulaire classIcon="fas fa-user">prenom</Formulaire>
  },
  {
    path:"formulairePassword",
    element:<Formulaire classIcon="fas fa-lock">mot de passe</Formulaire>
  }

               ]}
  
])
  return <RouterProvider router={route}/>
}

export default App