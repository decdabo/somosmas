import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ActivitiesForm from "./Components/Activities/ActivitiesForm";
import CategoriesForm from "./Components/Categories/CategoriesForm";
import NewsForm from "./Components/News/NewsForm";
import SlidesForm from "./Components/Slides/SlidesForm";
import TestimonialForm from "./Components/Testimonials/TestimonialsForm";
import UserForm from "./Components/Users/UsersForm";
import SchoolCampaign from "./Campaigns/School/SchoolCampaign";
import ToysCampaign from "./Campaigns/Toys/ToysCampaign";
import MembersForm from "./Components/Members/MembersForm";
import ProjectsForm from "./Components/Projects/ProjectsForm";
import HomeForm from "./Components/HomeForm/HomeForm";
import { DonationsGreet } from "./Components/Donations/DonationsGreet";
import { ThanksGreet } from "./Components/Donations/ThanksGreet";
import ContactForm from "./Components/Contact/ContactForm";
import MembersEdit from "./Components//Members/MembersEdit";
import RegisterForm from './Components/Auth/RegisterForm';
import LoginForm from './Components/Auth/LoginForm';
import OrganizationForm from "./Components/OrganizationForm/OrganizationForm";
import ActivitiesList from "./Components/Activities/ActivitiesList";


function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          {/* <Route path="/" exact component={} />           Esta ruta debe ser para el Home */}
          <Route exact path="/actividades" component={ActivitiesList} />

          <Route path="/create-activity" component={ActivitiesForm} />
          <Route path="/create-category" component={CategoriesForm} />
          <Route path="/create-news" component={NewsForm} />
          <Route path="/backoffice/create-slide" component={SlidesForm} />
          <Route path="/backoffice/organization/edit" component={OrganizationForm} />
          <Route path="/backoffice/home" component={HomeForm} />
          <Route path="/create-testimonials" component={TestimonialForm} />
          <Route path="/create-user" component={UserForm} />
          <Route path="/create-member" component={MembersForm} />
          <Route path="/backoffice/members/edit" component={MembersEdit} />
          <Route path="/create-project" component={ProjectsForm} />
          <Route path="/school-campaign" component={SchoolCampaign} />
          <Route path="/toys-campaign" component={ToysCampaign} />
          <Route path="/backoffice/news/:id" component={NewsForm} />
          <Route path="/backoffice/news" component={NewsForm} />
          <Route path="/donar" component={DonationsGreet} />
          <Route path="/gracias" component={ThanksGreet} />
          <Route path="/contact-form" component={ContactForm} />
          <Route path="/register-form" component={RegisterForm} />
          <Route path="/login-form" component={LoginForm} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
