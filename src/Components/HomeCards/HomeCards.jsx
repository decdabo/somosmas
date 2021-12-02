import { Link } from "react-router-dom";
import "../../utils.scss"

const HomeCards = ({title, image}) => {

    return (
        <div className="card m-2 text-center w-18r">
            <h5 className="card-title">{ title }</h5>
            <div>
                <img src={ image } className="card-img-top" alt="image"/>
            </div>
            <div className="card-body">
                <Link to={"/"} className="btn btn-primary">Ir</Link>
            </div>

        </div>
    )
}
export default HomeCards;




