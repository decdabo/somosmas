import { useEffect } from "react";
import { LinkedinCompanyProfile, TwitterTweet } from "react-social-plugins";

const mockTweets = [
	"1450535690199085058",
	"1440383594615042052",
	"1389666789865541632",
];

export const SocialMediaComponent = ({ tweets = mockTweets }) => {
	useEffect(() => {
		const script = document.createElement("script");

		script.src = "https://platform.linkedin.com/badges/js/profile.js";
		script.async = true;
		script.defer = true;

		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);
	return (
		<div>
			<hr />
			<div>
				<h1 className="fs-1 text-center">Últimos tweets</h1>
				<hr />
				{tweets.map((tweet, index) => {
					return (
						<TwitterTweet
							key={index}
							align="center"
							coversation="none"
							tweetId={tweet}
							theme="light"
							width={500}
						/>
					);
				})}
			</div>
			<hr />
			<div className="w-100 d-flex flex-column">
				<h1 className="fs-1 text-center">LinkedIn</h1>
				<div className="w-75 d-flex flex-column align-self-center">
					<hr />
					<div
						className="badge-base LI-profile-badge m-auto"
						data-locale="es_ES"
						data-size="medium"
						data-theme="light"
						data-type="VERTICAL"
						data-vanity="corporación-somos-más-68737437"
						data-version="v1"
					>
						<a
							className="badge-base__link LI-simple-link"
							href="https://co.linkedin.com/in/corporaci%C3%B3n-somos-m%C3%A1s-68737437?trk=profile-badge"
						></a>
					</div>
					<LinkedinCompanyProfile
						lang="en_US"
						companyId={68737437}
						format="inline"
						text="Company name"
					/>
				</div>
			</div>
		</div>
	);
};
