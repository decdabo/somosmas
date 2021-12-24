import axios from "axios";
import {
	act,
	fireEvent,
	render,
	waitFor,
	screen,
	prettyDOM,
} from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import MembersEdit from "../MembersEdit";
import { server } from "./mocks/server.js";
import mockData from "./mocks/member.json";

const CreateForm = (
	<MemoryRouter initialEntries={["/backoffice/members/create"]}>
		<Route path="/backoffice/members/create" component={MembersEdit} />
	</MemoryRouter>
);

const EditForm = (
	<MemoryRouter initialEntries={["/backoffice/members/edit/315"]}>
		<Route path="/backoffice/members/edit/:id" component={MembersEdit} />
	</MemoryRouter>
);
let componentRendered;
let getNameInput = () =>
	componentRendered.getByPlaceholderText(/nuevo nombre/i);
let getImageInput = () =>
	componentRendered.container.querySelector(".form__image-input");
let description;
let getFacebookUrlInput = () =>
	componentRendered.getByPlaceholderText(/facebook url/i);
let getLinkedInUrlInput = () =>
	componentRendered.getByPlaceholderText(/linkedin url/i);
let getSubmitButton = () => componentRendered.getByText("Editar");

// ---------------------------------------
// Mock CkEditor requests (for uploading images)
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
// ---------------------------------------

describe("Testing MembersForm", () => {
	beforeEach(() => {
		// Mock get request when provided with an id for existing member
		axios.get = jest.fn(() => Promise.resolve({ data: { data: mockData } }));

		// Mock post request for creating new member
		axios.post = jest.fn(() =>
			Promise.resolve({
				data: {
					success: true,
				},
			})
		);

		// Mock put request for editing member
		axios.put = jest.fn(() =>
			Promise.resolve({
				data: {
					success: true,
				},
			})
		);
	});

	describe("Testing Form Rendering For Create/Edit Member", () => {
		test("It should render with empty fields when no id provided", async () => {
			componentRendered = render(CreateForm);
			description = (await componentRendered.findAllByRole("presentation"))[1]
				.firstChild.firstChild;

			expect(getNameInput().value).toBeFalsy();
			expect(description.value).toBeFalsy();
			expect(getImageInput().value).toBeFalsy();
			expect(getFacebookUrlInput().value).toBeFalsy();
			expect(getLinkedInUrlInput().value).toBeFalsy();
		});
		test("It should render with mocked data when provided with id", async () => {
			componentRendered = render(EditForm);

			description = (await componentRendered.findAllByRole("presentation"))[1]
				.firstChild.firstChild;

			expect(getNameInput().value).toEqual(mockData.name);
			expect(description.innerHTML).toEqual(mockData.description);
			expect(getFacebookUrlInput().value).toEqual(mockData.facebookUrl);
			expect(getLinkedInUrlInput().value).toEqual(mockData.linkedinUrl);
		});
	});

	describe("Testing Inputs Validation", () => {
		beforeEach(async () => {
			componentRendered = render(CreateForm);

			description = (await componentRendered.findAllByRole("presentation"))[1]
				.firstChild.firstChild;

			await waitFor(async () => {
				await fireEvent.click(getSubmitButton());
			});
		});

		test("should validate name input to be required", async () => {
			expect(screen.getByText("Porfavor ingrese el nombre")).toBeTruthy();
		});

		test("should validate name input to be +3 characters", async () => {
			await waitFor(async () => {
				await fireEvent.change(getNameInput(), { target: { value: "aa" } });
			});
			expect(screen.getByText("Mínimo 4 caráctares")).toBeTruthy();
		});

		test("should validate description input to be required", async () => {
			expect(screen.getByText("Porfavor ingrese una descripción")).toBeTruthy();
		});

		test("should validate image input to be required", async () => {
			expect(screen.getByText("Porfavor ingrese una imagen")).toBeTruthy();
		});

		test("should validate facebook_url input to be required", async () => {
			expect(screen.getAllByText("Porfavor ingrese el link")[0]).toBeTruthy();
		});

		test("should validate facebook url input to be a valid link", async () => {
			await waitFor(async () => {
				await fireEvent.change(getFacebookUrlInput(), {
					target: { value: "aa" },
				});
			});
			expect(
				screen.getAllByText("Porfavor, ingrese una Url válida")[0]
			).toBeTruthy();
		});

		test("should validate facebook_url input to be required", async () => {
			expect(screen.getAllByText("Porfavor ingrese el link")[1]).toBeTruthy();
		});

		test("should validate linkedin url input to be a valid link", async () => {
			await waitFor(async () => {
				await fireEvent.change(getLinkedInUrlInput(), {
					target: { value: "aa" },
				});
			});
			expect(
				screen.getAllByText("Porfavor, ingrese una Url válida")[0]
			).toBeTruthy();
		});
	});

	describe("Testing Submit Form", () => {
		test("sould not allow submit when iunputs are not complete", async () => {
			componentRendered = render(CreateForm);
			description = (await componentRendered.findAllByRole("presentation"))[1]
				.firstChild.firstChild;
			await waitFor(async () => {
				await fireEvent.click(componentRendered.getByText("Editar"));
			});
			expect(axios.post).not.toHaveBeenCalled();
		});
		test("sould allow POST submit when creating a new member", async () => {
			componentRendered = render(CreateForm);
			description = (await componentRendered.findAllByRole("presentation"))[1]
				.firstChild.firstChild;

			await act(async () => {
				await fireEvent.change(getImageInput(), {
					target: {
						files: [
							new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" }),
						],
					},
				});
			});
			await waitFor(async () => {
				await fireEvent.change(getNameInput(), {
					target: { value: mockData.name },
				});
				description.innerHTML = "something";
				await fireEvent.change(getLinkedInUrlInput(), {
					target: { value: mockData.linkedinUrl },
				});
				await fireEvent.change(getFacebookUrlInput(), {
					target: { value: mockData.facebookUrl },
				});
			});
			await waitFor(async () => {
				await fireEvent.click(componentRendered.getByText("Editar"));
			});

			expect(
				componentRendered.container.querySelector(".form__message-validation")
					.textContent
			).toBeFalsy();

			expect(axios.post).toHaveBeenCalled();
		});

		test("sould allow PUT submit when editing a member", async () => {
			componentRendered = render(EditForm);
			description = (await componentRendered.findAllByRole("presentation"))[1]
				.firstChild.firstChild;
			await waitFor(async () => {
				await fireEvent.click(componentRendered.getByText("Editar"));
			});

			expect(
				componentRendered.container.querySelector(".form__message-validation")
					.textContent
			).toBeFalsy();

			expect(axios.put).toHaveBeenCalled();
		});
	});
});
