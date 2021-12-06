import { Link } from "react-router-dom";
import "../../utils.scss"
import "./HomeCards.scss"

const HomeCards = ({title, image}) => {

    return (
        <div className="card__home-dashboard my-1r txt-center w-18r">
            <h5>{ title }</h5>
            <div>
                <img src={ image }  alt="image"/>
            </div>
            <div >
                <Link to={ "/" } className="card__btn" role="button">Ir</Link>
            </div>

        </div>
    )
}
export default HomeCards;




