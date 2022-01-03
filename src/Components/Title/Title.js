import defaultImage from "../../assets/images/404.png";
import Image from "../LazyLoadingImage/Image";

export const Title = ({ title, image, width = "" }) => {
	return (
		<div>
			<Image
				width={width}
				url={!image ? defaultImage : image}
				description={title}
			/>
			<h1 className="main-title">{title}</h1>
		</div>
	);
};
