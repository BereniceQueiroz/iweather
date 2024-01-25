import React from "react";
import { render, screen } from "@testing-library/react-native";
import {Input} from "@components/Input";


describe("Component: Input", () => {
  it("should be render component with debug", () => {
    const {debug } = render(<Input />);

    debug();
  })

  it("should be render without activity indicator if isLoading prop is undefined", () => {
    render(<Input />);

    //query nao retorna exceção
    const activityIndicator = screen.queryByTestId("activity-indicator");
    expect(activityIndicator).toBeNull();

  });

  it("should be render with activity indicator if isLoading prop is true", () => {
    render(<Input isLoading />);

    const activityIndicator = screen.getByTestId("activity-indicator");
    expect(activityIndicator).toBeTruthy();

  })
})