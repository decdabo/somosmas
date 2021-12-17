import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


function LoaderComponent () {
	return (
		<Loader
			type="Puff"
			color="#dc817e"
			height={100}
			width={100}
			timeout={3000} //3 secs
		/>
	);
}
export default LoaderComponent;
