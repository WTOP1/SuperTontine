// !important
import "./publique/css/font-awesome.css";
import "./publique/css/all.css";
import "./publique/css/font-awesome.min.css";
import "./publique/css/general.css"
import "./publique/css/responsive.css"
import React , { useRef, useState } from "react";

function SlideTontine() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const listeRef = useRef(null);
    const handleScroll = (scrollAmount) => {
      const newScrollPosition = scrollPosition + scrollAmount;
      setScrollPosition(newScrollPosition);
      listeRef.current.scrollLeft = newScrollPosition;
    };
  
    return <div id="listeTontine" align="center" ref={listeRef}>
    <div className="droit" onClick={()=> handleScroll(-50)}> 
      <i className="fas fa-chevron-circle-left" ></i>
    </div>
    <div className="gauche" onClick={()=> handleScroll(50)}>
      <i className="fas fa-chevron-circle-right"></i>
    </div>
    
        <div className="box tontine" >
          <div className="sousBox">
      Tontine 1 <br/> 
      Montant :3000 FCFA <br />
      Membre: 3 <br />
      Tour: 1 semaine <br />
      Beneficiaire: Emmanuel
      </div>
    </div>
    
    <div className="box tontine">
      <div className="sousBox">
        Tontine 1 <br /> 
        Montant :3000 FCFA <br />
        Membre: 3 <br />
        Tour: 1 semaine <br />
        Beneficiaire: Emmanuel
       </div>
    </div>
    <div className="box tontine">
      <div className="sousBox">
        Tontine 1 <br /> 
        Montant :3000 FCFA <br />
        Membre: 3 <br />
        Tour: 1 semaine <br />
        Beneficiaire: Emmanuel
       </div>
    </div>
    
    <div className="box tontine">
      <div className="sousBox">
        Tontine 1 <br /> 
        Montant :3000 FCFA <br />
        Membre: 3 <br />
        Tour: 1 semaine <br />
        Beneficiaire: Emmanuel
       </div>
    </div>
    </div>
}
 export default SlideTontine
