import { render, screen } from "../../../test-utils/testing-library-utils";
import '@testing-library/jest-dom';
import { server } from "../../../mocks/server";
import { HttpResponse, http } from "msw";

import OrderConfirmation from "../OrderConfirmation";
import React from "react";

test("error response from server for submitting order", async () => {
  // override default msw response for options endpoint with error response
  server.resetHandlers(
    http.post("http://localhost:3030/order", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<OrderConfirmation />);

  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(
    "An unexpected error occurred. Please try again later."
  );
});
