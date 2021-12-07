import { Link } from "react-router-dom";
import "../../utils.scss"
import "./HomeCards.scss"
import LazyLoadingImage from "../LazyLoadingImage/LazyLoadingImage";

const HomeCards = ({title, image, description}) => {

    return (
        <div className="card__home-dashboard my-1r txt-center w-18r">
            <h5>{ title }</h5>
            <div>
                <LazyLoadingImage url={image} description={description}/>
            </div>
            <div >
                <Link to={ "/" } className="card__btn" role="button">Ir</Link>
            </div>
        </div>
    )
}
export default HomeCards;




