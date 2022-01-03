import React, { Suspense } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import LayoutPublic from "../Components/Layout/LayoutPublic";
import LoadingSpinner from "../Components/Spinner/LoadingSpinner";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
	AboutMain,
	ActivitiesForm,
	ActivitiesList,
	ActivityInfo,
	Contact,
	ContactForm,
	DonationsGreet,
	Home,
	LoginForm,
	Members,
	NewsForm,
	PageNotFound,
	RegisterForm,
	SchoolCampaign,
	TestimonialForm,
	ThanksGreet,
	ToysCampaign,
} from "./Router/publicRoutes";

function Public() {
	const location = useLocation();
	return (
		<LayoutPublic>
			<Suspense fallback={<LoadingSpinner />}>
				<TransitionGroup>
					<CSSTransition key={location.key} classNames="fade" timeout={300}>
						<Switch location={location}>
							<Route exact path="/create-activity" component={ActivitiesForm} />
							<Route exact path="/create-news" component={NewsForm} />
							<Route
								exact
								path="/create-testimonials"
								component={TestimonialForm}
							/>
							<Route exact path="/school-campaign" component={SchoolCampaign} />
							<Route exact path="/toys-campaign" component={ToysCampaign} />
							<Route exact path="/about" component={AboutMain} />
							<Route exact path="/contact-form" component={ContactForm} />
							<Route exact path="/register-form" component={RegisterForm} />
							<Route exact path="/login-form" component={LoginForm} />
							<Route exact path="/actividades" component={ActivitiesList} />
							<Route exact path="/actividades/:id" component={ActivityInfo} />
							<Route exact path="/donar" component={DonationsGreet} />
							<Route exact path="/gracias" component={ThanksGreet} />
							<Route exact path="/about/members" component={Members} />
							<Route exact path="/contacto" component={Contact} />
							<Route exact path="/" component={Home} />
							<Route component={PageNotFound} />
						</Switch>
					</CSSTransition>
				</TransitionGroup>
			</Suspense>
		</LayoutPublic>
	);
}
export default Public;
