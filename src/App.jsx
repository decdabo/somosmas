import React from "react";
import "./App.css";
import Public from "./Routes/Public";
import Backoffice from "./Routes/Backoffice";


function App() {
	return (
		<>
			<Backoffice />
			<Public />
		</>
	);
}

export default App;
