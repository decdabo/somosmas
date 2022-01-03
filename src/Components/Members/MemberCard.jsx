import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { Link } from "react-router-dom";

const MemberCard = ({ member, deleteMember }) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async () => {
		setIsDeleting(true);
		await deleteMember(member.id);
		setIsDeleting(false);
	};
	return (
		<div className="backofficeLists__cardContainer">
			{isDeleting && (
				<CgSpinner className="spinner__circle backofficeLists__cardSpinner" />
			)}
			<img
				className="backofficeLists__cardImage"
				src={member.image || ""}
				alt="descripcion"
				onError={(e) => {
					e.target.src =
						"https://www.sedistudio.com.au/wp-content/themes/sedi/assets/images/placeholder/placeholder.png";
				}}
				loading="lazy"
			/>

			<div className="backofficeLists__cardContent">
				<div>{member.name}</div>
				<div className="backofficeLists__cardBtnsContainer">
					<Link to={`/backoffice/members/edit/${member.id}`}>
						<button className="form__btn-secondary">Editar</button>
					</Link>
					<button
						className="form__btn-secondary"
						onClick={handleDelete}
						disabled={isDeleting}
					>
						Eliminar
					</button>
				</div>
			</div>
		</div>
	);
};

export default MemberCard;
