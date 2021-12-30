import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
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
import NewsForm from "../Components/News/NewsForm";
import UserForm from "../Components/Users/UsersForm";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { CategoriesList } from "../Components/Categories/CategoriesList";
import CategoriesForm from "../Components/Categories/CategoriesForm";

function Backoffice() {
	const location = useLocation();
	return (
		<LayoutBackoffice>
			<TransitionGroup>
				<CSSTransition key={location.key} classNames="fade" timeout={300}>
					<Switch location={location}>
						<Route
							exact
							path="/backoffice/Slides/edit/:id"
							component={SlidesForm}
						/>
						<Route
							exact
							path="/backoffice/Slides/create"
							component={SlidesForm}
						/>
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
						<Route
							exact
							path="/backoffice/users/edit/:id"
							component={UserForm}
						/>
						<Route exact path="/backoffice/users/create" component={UserForm} />
						<Route exact path="/backoffice/users" component={UsersList} />
						<Route
							exact
							path="/backoffice/news/edit/:id"
							component={NewsForm}
						/>
						<Route exact path="/backoffice/news/create" component={NewsForm} />
						<Route exact path="/backoffice/news" component={NewsList} />
						<Route
							exact
							path="/backoffice/Slides"
							component={ScreenSliderList}
						/>
						<Route
							exact
							path="/backoffice/organization"
							component={OrganizationData}
						/>

						<Route
							exact
							path="/backoffice/categories/edit/:id"
							component={CategoriesForm}
						/>
						<Route
							exact
							path="/backoffice/categories/create"
							component={CategoriesForm}
						/>
						<Route
							exact
							path="/backoffice/categories"
							component={CategoriesList}
						/>
						<Route path="/backoffice" exact component={HomeDashboard} />
						<Route component={PageNotFound} />
					</Switch>
				</CSSTransition>
			</TransitionGroup>
		</LayoutBackoffice>
	);
}
export default Backoffice;
