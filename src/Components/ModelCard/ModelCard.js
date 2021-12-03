import React from "react";
import imgDefault from '../../images/placeholderImg.png';
import './modelCard.scss'

const CardModel = (props) => {  
    const {image, imgAlt, title, description} = props;
    return(
            <div className="body-container">         
                <img src={ image ? image : imgDefault} alt={imgAlt} className="imgCard"/>
                <div className="info-container">
                    <h4>{title}</h4>
                    <p>{description}</p>
                </div>                  
            </div>
    );
}
export default CardModel;