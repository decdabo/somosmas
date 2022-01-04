import { render, screen } from "@testing-library/react";
import Home from "./Home";

test("renders Bienvenidos", () => {
	render(<Home/>);
	const Saludo = screen.getAllByText("Bienvenidos!");
	expect(Saludo).toBeInTheDocument();
});