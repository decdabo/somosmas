import React from "react";
import "./App.css";
import Public from "./Routes/Public";
import Backoffice from "./Routes/Backoffice";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/backoffice" render={Backoffice} />
				<Route path="/" render={Public} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
