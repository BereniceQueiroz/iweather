import React from "react";
import { render, screen } from "@testing-library/react-native";
import { Day } from "@components/Day";
import ClearDay from '@assets/clear_day.svg'

describe("Component: Day", () => {
  it("should be render day", () => {
    render(
      <Day 
        data={{
          icon: ClearDay,
          day: "24/01",
          weather: "Céu nublado",
          max: "30ºc",
          min: "24ºc"
        }}  
      />
    )
    expect(screen.getByText('24/01')).toBeTruthy();
  })
})