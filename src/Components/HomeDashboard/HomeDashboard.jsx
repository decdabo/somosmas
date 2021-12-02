import HomeCards from "../HomeCards/HomeCards";
import "./HomeDashboard.css"
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import { useState } from "react";

const HomeDashboard = () => {

    const  cardsInfo  = require("../../lib/mock/BackofficeDashboard.json");
    const [usuario, setUsuario] = useState("");

    return (
        <>

            <NavbarDashboard/>
            <h1 className="text-center">Bienvenido/a {usuario}</h1>
            <div className="dashboard-grid my-5">
                {cardsInfo.map((card,index) =>{
                    return <HomeCards title={card.title} image={card.image} key={index}/>
                })}
            </div>
        </>

    )

}

export default HomeDashboard
