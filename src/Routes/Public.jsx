import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import { mapStyles } from "../helpers/routerTransitions";
import ActivitiesForm from "../Components/Activities/ActivitiesForm";
import CategoriesForm from "../Components/Categories/CategoriesForm";
import NewsForm from "../Components/News/NewsForm";
import TestimonialForm from "../Components/Testimonials/TestimonialsForm";
import UserForm from "../Components/Users/UsersForm";
import SchoolCampaign from "../Campaigns/School/SchoolCampaign";
import ToysCampaign from "../Campaigns/Toys/ToysCampaign";
import MembersForm from "../Components/Members/MembersForm";
import ProjectsForm from "../Components/Projects/ProjectsForm";
import { AboutMain } from "../Components/About/AboutMain";
import ContactForm from "../Components/Contact/ContactForm";
import RegisterForm from "../Components/Auth/RegisterForm";
import LoginForm from "../Components/Auth/LoginForm";
import ActivitiesList from "../Components/Activities/ActivitiesList";
import ActivityInfo from "../Components/Activities/Detail/ActivityInfo";
import { DonationsGreet } from "../Components/Donations/DonationsGreet";
import { ThanksGreet } from "../Components/Donations/ThanksGreet";
import Members from "../Components/About/Members";
import Home from "../Home/Home";
import Contact from "../Components/Contact/Contact";

function Public() {
    return (
        <>
            <BrowserRouter>
                <AnimatedSwitch
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                    className="switch-wrapper"
                    mapStyles={mapStyles}
                >
                    <Route exact path="/create-activity" component={ActivitiesForm} />
                    <Route exact path="/create-category" component={CategoriesForm} />
                    <Route exact path="/create-news" component={NewsForm} />
                    <Route exact path="/create-testimonials" component={TestimonialForm} />
                    <Route exact path="/create-user" component={UserForm} />
                    <Route exact path="/edit-user/:id" component={UserForm} />
                    <Route exact path="/school-campaign" component={SchoolCampaign} />
                    <Route exact path="/toys-campaign" component={ToysCampaign} />
                    <Route exact path="/create-member" component={MembersForm} />
                    <Route exact path="/create-project" component={ProjectsForm} />
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
                </AnimatedSwitch>
            </BrowserRouter>
        </>
    );
}
export default Public;