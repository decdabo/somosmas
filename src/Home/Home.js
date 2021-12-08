import React from "react";
import {SliderCarouselComponent} from '../slideHome/SliderCarouselComponent.js';
import '../styles/components/home.scss'

const Home = () => {
    return(
        <>
        <div className="container">
            <div className="container__welcomeMsj">
                <div>
                    <h1 className="container__title">Bienvenidos!</h1>
                    <hr className="container__hr"/>
                </div>
                <div className="container__text">
                    <p>Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also t</p> 
                </div>
            </div>
            <div className="container__carousel">
                <SliderCarouselComponent/>
            </div>
            <div>
                {/* COMPONENTE LISTADO DE NOVEDADES */}
            </div>
        </div>
        </>
    );
}
export default Home;
