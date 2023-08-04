import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import Card from "./Card";
import image1 from "./image1.jpg";

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

describe("Smoke Test", ()=>{
  it("should show the Carousel component without crashing", ()=> {
    render(<Carousel />);
  });
  it("should show the Card component without crashing", ()=> {
    render(<Card caption="Photo by Richard Pasquarella on Unsplash" src={image1} currNum={1} totalNum={1} />);
    
  });
});
describe("Snapshot Test", ()=>{
  it("should matches snapshot", ()=> {
    const { asFragment } = render(<Carousel />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("should matches snapshot", ()=> {
    const { asFragment } = render(<Card caption="Photo by Richard Pasquarella on Unsplash" src={image1} currNum={1} totalNum={1} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("Bug! Left arrow", ()=>{
  it("works when you click on the right arrow then left arrow", ()=> {
    const { queryByTestId, queryByAltText } = render(<Carousel />);

    // move forward in the carousel
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);
  
    // expect the second image to show, but not the first
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

    // move back in the carousel
    const leftArrow = queryByTestId("left-arrow");
    fireEvent.click(leftArrow);
     // expect the first image to show, but not the second
     expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
     expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  });

  it("handling of left and right arrow", () => {
    const { queryByTestId } = render(<Carousel />);

    const rightArrow = queryByTestId("right-arrow");
  
    // expect the left arrow don't show and the right arrow shows
    expect(queryByTestId("left-arrow")).toEqual(null);
    expect(queryByTestId("right-arrow")).toBeInTheDocument();

    fireEvent.click(rightArrow);
    fireEvent.click(rightArrow);

     // expect the right arrow don't show and the left arrow shows
     expect(queryByTestId("left-arrow")).toBeInTheDocument();
     expect(queryByTestId("right-arrow")).toEqual(null);

  });

});