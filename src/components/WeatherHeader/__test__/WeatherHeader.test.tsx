import { render } from "@testing-library/react";
import WeatherHeader from "../WeatherHeader";

test("weather header renders the header text correctly", () => {
  const { getByTestId } = render(<WeatherHeader />);
  const element = getByTestId("weather-header-element");
  expect(element.innerHTML.includes("Check Forecast")).toBeTruthy();
});
