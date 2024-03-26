// fichier contenat le composant des champs d'unformulaire


function Champs({classIcon,children,placeholder,name}) {
    const changeColorBlur=(a)=>{
        a.style.borderBottom="1px #38b6ff solid"
        a.style.color="black"
    }
    const changeColorFocus=(a)=>{
      a.style.borderBottom="1px #004aad solid"
      a.style.color="#38b6ff"
      a.style.transitionProperty="border-bottom-color , color";
      a.style.transitionDuration="1s";
    }

    return <>
     <div id="entrer" style={{ borderBottom: "1px gray solid"}}>
        <table border="0px" cellspacing="10px" >
            <tr>
                <td>{children}</td>
            </tr>
            <tr >
                <td><div className={classIcon} style={{color:"gray"}}></div></td>
                <td><input type="text" style={{border:"none"}} placeholder={placeholder}
                onFocus={()=>changeColorFocus(entrer)}
                onBlur={()=>changeColorBlur(entrer)}
                name={name}
                /></td>
            </tr>
        </table>
        

    </div>
    </>
}

export default Champs