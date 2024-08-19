import { useState } from "react";
import Container from "react-bootstrap/Container";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import React from "react";

type OrderPhase = "inProgress" | "review" | "completed";

export default function App() {
  const [orderPhase, setOrderPhase] = useState<OrderPhase>("inProgress");

  let Component: React.ElementType = OrderEntry; 

  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfirmation;
      break;
  }

  return (
    <OrderDetailsProvider>
      <Container>
        <Component setOrderPhase={setOrderPhase} />
      </Container>
    </OrderDetailsProvider>
  );
}
