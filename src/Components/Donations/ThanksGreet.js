import "./styles/thankGreet.scss";


export const ThanksGreet = ({ title = "¡Muchas gracias por tu donacion!" }) => {
	return (
		<div className="thanks-main-div" >
			<h1> {title} </h1>
		</div>
	);
};
