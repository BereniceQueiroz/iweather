import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { SelectList } from "@components/SelectList"
import { mockCitySelecteList } from "@__tests__/mocks/api/mockCitySelecteList";

describe("Component: SelectList", () => {
  it("should be render component with debug", () => {
    const { debug } = render( 
      <SelectList 
        data={mockCitySelecteList} 
        onChange={() => {}} 
        onPress={() => {}}      
      />
    );

    debug();
  })
  it("should be return city details selected", () => {
    const data = [
      { id: '1', name:"Campinas", latitude: 123, longitude: 456},
      { id: '2', name:"Campo Grande", latitude: 789, longitude: 987},
    ]
    render( 
      <SelectList 
        data={data} 
        onChange={() => {}} 
        onPress={() => {}}      
      />
    );

    //regex com / no início e no final para procurar parte e o i ignora o Case sensitive
    const selectedCity = screen.getByText(/campo/i);
    expect(selectedCity).toBeTruthy();
  })
  it("should be return city details selected", () => {
    const data = [
      { id: '1', name:"Campinas", latitude: 123, longitude: 456},
      { id: '2', name:"Campo Grande", latitude: 789, longitude: 987},
    ]

    const onPress = jest.fn();

    render( 
      <SelectList 
        data={data} 
        onChange={() => {}} 
        onPress={onPress}      
      />
    );

    //busca pelo nome parcialmente
    const selectedCity = screen.getByText("Campo", { exact: false});

    //press para selecionar a cidade
    fireEvent.press(selectedCity);

    //Quantas vezes a funcao foi chamada
    expect(onPress).toHaveBeenCalledTimes(1)
  })
  it("should be return city details selected", () => {
    const data = [
      { id: '1', name:"Campinas", latitude: 123, longitude: 456},
      { id: '2', name:"Campo Grande", latitude: 789, longitude: 987},
    ]

    const onPress = jest.fn();

    render( 
      <SelectList 
        data={data} 
        onChange={() => {}} 
        onPress={onPress}      
      />
    );

    //busca pelo nome parcialmente
    const selectedCity = screen.getByText("Campo", { exact: false});

    //press para selecionar a cidade
    fireEvent.press(selectedCity);

    //Verifica se o item enviado no press é o mesmo item selecionado
    expect(onPress).toHaveBeenCalledWith(data[1])
  })
  it("not should be show options when data props is empty", () => {
    render(
      <SelectList
        data={[]}
        onChange={() => {}}
        onPress={() => {}}
      />
    );
    const options = screen.getByTestId('options');
    expect(options.children).toHaveLength(0)
  })
})