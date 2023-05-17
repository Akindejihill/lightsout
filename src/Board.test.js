import { render, fireEvent } from "@testing-library/react";
import React from "react";
import Board from "./Board";
import App from "./App";
import "./App.css";



// it("it renders without crashing", function() {
//   const { container } = render(
//     <Carousel
//       photos={TEST_IMAGES}
//       title="images for testing"
//     />
//   );
//   // expect the first image to show, but not the second
//   expect(
//     container.querySelector('img[alt="testing image 1"]')
//   ).toBeInTheDocument();

// });

function FakeApp() {
    return (
        <div className="App">
          <Board nrows={3} ncols={3} chanceLightStartsOn={1}  />
        </div>
    );
  }

test ("that testing works", function(){
    expect(1).toBe(1);
});

it ("renders without crashing", () => {
    render(<App />);
});

it ("matches snapshot", ()=>{
    const {asFragment} = render(<FakeApp />);
    expect(asFragment()).toMatchSnapshot();
});
