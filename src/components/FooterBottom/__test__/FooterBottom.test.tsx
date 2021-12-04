import { render } from "@testing-library/react";
import FooterBottom from "../FooterBottom";

test("should render copyright text and year correctly", () => {
  const { getByTestId } = render(<FooterBottom />);
  const ele = getByTestId("copyright-element");
  expect(ele.textContent?.includes("Copyright")).toBeTruthy();
  expect(
    ele.textContent?.includes(new Date().getFullYear().toString())
  ).toBeTruthy();
});

test("should render footer link correctly", () => {
  const { getByTestId } = render(<FooterBottom />);
  const ele = getByTestId("link-element");
  expect(ele.textContent?.includes("Somraj")).toBeTruthy();
});
