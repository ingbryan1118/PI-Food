import React from "react";
import { Link } from "react-router-dom";
import Style from "../css/landing.module.css";


export default function Landing(){

    return <div className={Style.img}>
            <Link to="/recipe" className={Style.link}>
                Veamos Recetas !
            </Link>
           
           </div> 

}