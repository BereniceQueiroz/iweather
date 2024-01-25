import React from "react";
import { render, screen, fireEvent, waitFor, waitForElementToBeRemoved, act} from  "@__tests__/utils/customRender";
import { mockWeatherAPIResponse } from "@__tests__/mocks/api/mockWeatherAPIResponse";
import { mockCityAPIResponse } from "@__tests__/mocks/api/mockCityAPIResponse";
import { Dashboard } from "@screens/Dashboard";
import { api } from "@services/api";
import { saveStorageCity } from "@libs/asyncStorage/cityStorage";



describe("Screen: Dashboard", () => {
  //antes de iniciar os testes roda o before
  beforeAll(async() => {
    const city = {
      id: '1',
      name: 'Rio do Sul, BR',
      latitude: 123,
      longitude: 456,
    }
    await saveStorageCity(city)
  })
  it("should be show city weather", async () => {

    jest.spyOn(api, "get").mockResolvedValue({data: mockWeatherAPIResponse });
    const { debug } = render(<Dashboard />)
    const cityName = await waitFor(() => screen.findByText(/rio do sul/i))
    debug()
    expect(cityName).toBeTruthy()
  })

  it("should be show another selected weather city", async () => {
    jest.spyOn(api, "get")
    .mockResolvedValueOnce({data: mockWeatherAPIResponse })
    .mockResolvedValueOnce({data: mockCityAPIResponse })
    .mockResolvedValueOnce({ data: mockWeatherAPIResponse });

    render(<Dashboard />)

    await waitForElementToBeRemoved(() => screen.queryAllByTestId("loading"))
    
    const cityName = 'São Paulo'

    await waitFor(() => act(() => {
      const search = screen.getByTestId('search-input')
      fireEvent.changeText(search, cityName)
    }));

    await waitFor(() => act(() => {
      fireEvent.press(screen.getByText(cityName, { exact: false}))
    }));

    expect(screen.getByText(cityName, { exact: false})).toBeTruthy();
  })
})