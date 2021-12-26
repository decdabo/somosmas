import React from "react";
import { Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import { mapStyles } from "../helpers/routerTransitions";
import SlidesForm from "../Components/Slides/SlidesForm";
import HomeForm from "../Components/HomeForm/HomeForm";
import MembersEdit from "../Components//Members/MembersEdit";
import OrganizationForm from "../Components/OrganizationForm/OrganizationForm";
import ManageActivities from "../Components/ManageActivities/ManageActivities";
import { UsersList } from "../Components/Users/UsersList";
import NewsList from "../Components/News/NewsList";
import { ScreenSliderList } from "../backoffice/SlidesScreen/ScreenSliderList";
import HomeDashboard from "../Components/HomeDashboard/HomeDashboard";
import OrganizationData from "../backoffice/Organization/OrganizationData";
import LayoutBackoffice from "../backoffice/Layouts/LayoutBackoffice";
import MembersList from "./../Components/Members/MembersList";
import PageNotFound from "../Components/PageNotFound/PageNotFound";

function Backoffice() {
	return (
		<LayoutBackoffice>
			<AnimatedSwitch
				atEnter={{ opacity: 0 }}
				atLeave={{ opacity: 0 }}
				atActive={{ opacity: 1 }}
				className="switch-wrapper"
				mapStyles={mapStyles}
			>
				<Route exact path="/backoffice/Slides/create" component={SlidesForm} />
				<Route exact path="/backoffice/home" component={HomeForm} />
				<Route
					exact
					path="/backoffice/members/create"
					component={MembersEdit}
				/>
				<Route
					exact
					path="/backoffice/members/edit/:id"
					component={MembersEdit}
				/>
				<Route exact path="/backoffice/members" component={MembersList} />

				<Route
					exact
					path="/backoffice/members/create"
					component={MembersEdit}
				/>
				<Route
					exact
					path="/backoffice/organization/edit"
					component={OrganizationForm}
				/>
				<Route
					exact
					path="/backoffice/activities"
					component={ManageActivities}
				/>
				<Route exact path="/backoffice/users" component={UsersList} />
				<Route exact path="/backoffice/news" component={NewsList} />
				<Route exact path="/backoffice/Slides" component={ScreenSliderList} />
				<Route
					exact
					path="/backoffice/organization"
					component={OrganizationData}
				/>
				<Route path="/backoffice" exact component={HomeDashboard} />
				<Route component={PageNotFound} />
			</AnimatedSwitch>
		</LayoutBackoffice>
	);
}
export default Backoffice;
