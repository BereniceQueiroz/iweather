import React from "react";
import {render, screen} from "@testing-library/react-native";
import { NextDays } from "@components/NextDays";
import ClearDay from '@assets/clear_day.svg'
describe("Component: NextDays", () => {
  it("should be render day", () => {
    render(
      <NextDays data={[
        {
          icon: ClearDay,
          day: "24/01",
          weather: "Céu nublado",
          max: "30ºc",
          min: "24ºc"
        },
        {
          icon: ClearDay,
          day: "25/01",
          weather: "Nublado",
          max: "30ºc",
          min: "24ºc"
        },
        {
          icon: ClearDay,
          day: "26/01",
          weather: "Céu limpo",
          max: "28ºc",
          min: "22ºc"
        },
        {
          icon: ClearDay,
          day: "27/01",
          weather: "Esolarado",
          max: "34ºc",
          min: "27ºc"
        },
        {
          icon: ClearDay,
          day: "28/01",
          weather: "Chuva",
          max: "35ºc",
          min: "25ºc"
        }
      ]} 
      />
    )
    expect(screen.getByText('28/01')).toBeTruthy();
  })
})
