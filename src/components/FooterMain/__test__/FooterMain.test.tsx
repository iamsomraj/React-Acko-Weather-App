import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FooterMain from "../FooterMain";

test("should render form heading correctly in the footer main section", () => {
  const { getByTestId } = render(
    <div>
      <BrowserRouter>
        <FooterMain />
      </BrowserRouter>
    </div>
  );
  const element = getByTestId("form-heading-element");
  expect(element.textContent).toBe("Get our monthly updates");
});
