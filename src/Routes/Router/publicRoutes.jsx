import { lazy } from "react";

export const ActivitiesForm = lazy(() =>
	import("../../Components/Activities/ActivitiesForm")
);

export const CategoriesForm = lazy(() =>
	import("../../Components/Categories/CategoriesForm")
);

export const NewsForm = lazy(() => import("../../Components/News/NewsForm"));

export const TestimonialForm = lazy(() =>
	import("../../Components/Testimonials/TestimonialsForm")
);

export const UserForm = lazy(() => import("../../Components/Users/UsersForm"));

export const SchoolCampaign = lazy(() =>
	import("../../Campaigns/School/SchoolCampaign")
);

export const ToysCampaign = lazy(() =>
	import("../../Campaigns/Toys/ToysCampaign")
);

export const AboutMain = lazy(() => import("../../Components/About/AboutMain"));

export const ContactForm = lazy(() =>
	import("../../Components/Contact/ContactForm")
);

export const RegisterForm = lazy(() =>
	import("../../Components/Auth/RegisterForm")
);

export const LoginForm = lazy(() => import("../../Components/Auth/LoginForm"));

export const ActivitiesList = lazy(() =>
	import("../../Components/Activities/ActivitiesList")
);

export const ActivityInfo = lazy(() =>
	import("../../Components/Activities/Detail/ActivityInfo")
);

export const DonationsGreet = lazy(() =>
	import("../../Components/Donations/DonationsGreet")
);

export const ThanksGreet = lazy(() =>
	import("../../Components/Donations/ThanksGreet")
);

export const Members = lazy(() => import("../../Components/About/Members"));

export const Home = lazy(() => import("../../Home/Home"));

export const Contact = lazy(() => import("../../Components/Contact/Contact"));

export const PageNotFound = lazy(() =>
	import("../../Components/PageNotFound/PageNotFound")
);
