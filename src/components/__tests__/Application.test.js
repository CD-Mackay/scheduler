import React from "react";
import Application from "components/Application";
import { render, cleanup, waitForElement, prettyDOM, getByText, getByTestId, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";
import { fireEvent } from "@testing-library/react/dist";
import { act } from "@testing-library/react-hooks";
import axios from 'axios';

afterEach(cleanup);

describe("Application", () => { 
it("changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});

it("loads data, books an interview and reduces spots remaining for the first day by 1", async () => {
  const { container, debug }  = render(<Application />);
 
  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));
  fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
    target: {value: "Lydia Miller-Jones"}
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "saving")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

  expect(getByText(day, "3 spots remaining")).toBeInTheDocument();
  });


  it("Loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

    // 1. Render Application
    const { container, debug } = render(<Application />);

    // 2. Wait un til the text "Archie Cohen is rendered"
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();

fireEvent.click(queryByText(appointment, "Confirm"));

expect(getByText(appointment, "deleting")).toBeInTheDocument();

await waitForElement(() => getByAltText(appointment, "Add"));

const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

  expect(getByText(day, "5 spots remaining")).toBeInTheDocument();

  })

  it("loads edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render application
    const { container, debug } = render(<Application />);



    // 2. Wait until text "Archie Cohen is displayed"
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the Edit button on books appointment
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
fireEvent.click(queryByAltText(appointment, "Edit"));

fireEvent.change(getByTestId(appointment, "student-name-input"), {
  target: {value: "Archie Cohen"}
});

fireEvent.click(queryByText(appointment, "Save"));

expect(getByText(appointment, "saving")).toBeInTheDocument();

await waitForElement(() => getByText(appointment, "Archie Cohen"));

const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

expect(getByText(day, "4 spots remaining")).toBeInTheDocument();


  });

  it("shows the save error when failing to save an appointment", async() => {
    axios.put.mockRejectedValueOnce();

    const { container, debug }  = render(<Application />);
 
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: {value: "Lydia Miller-Jones"}
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));
    await waitForElement(() => getByText(appointment, "Unable to save Appointment"));
    expect(getByText(appointment, "Unable to save Appointment")).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(getByText(container, "Archie Cohen")).toBeInTheDocument();

    


  });

  it("Shows the delete error when failing to delete an existing appointment", async() => {   
    axios.put.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));


    fireEvent.click(queryByText(appointment, "Confirm"));

    debug();

    //await waitForElement(() => getByText(appointment, "Unable to delete appointment"));
   // expect(getByText(appointment, "Unable to delete appointment")).toBeInTheDocument();
    // fireEvent.click(getByAltText(appointment, "Close"));
    // expect(getByText(container, "Archie Cohen")).toBeInTheDocument();

  })
});

