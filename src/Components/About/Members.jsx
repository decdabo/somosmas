import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Get } from "../../Services/privateApiService";
import { fetchMembers } from "../../store/slices/aboutSlice";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import "./styles/members.scss";

const Members = () => {
	const { aboutData } = useSelector((state) => state);

	const dispatch = useDispatch();

	const getData = async () => {
		await Get("members");
	};
	useEffect(() => {
		getData();
		dispatch(fetchMembers());
	}, []);

	return (
		<div className="members__container">
			<div className="text__title-secondary">Miembros de Somos Más</div>
			{aboutData.loading ? (
				<LoadingSpinner />
			) : (
				<div className="members__cardsContainer">
					{aboutData.data.map((item) => (
						<div className="members__card" key={item.id}>
							<img src={item.image} alt="imagen" loading="lazy" />
							<div className="members__content">
								<h4 className="text__title-tertiary">{item.name}</h4>
								<div
									className="members__description"
									dangerouslySetInnerHTML={{ __html: item.description }}
								></div>
								<div className="links">
									<a
										href={item.facebookUrl}
										target="_blank"
										rel="noopener noreferrer"
									>
										Facebook
									</a>

									<a
										href={item.linkedinUrl}
										target="_blank"
										rel="noopener noreferrer"
									>
										Linkedin
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Members;
