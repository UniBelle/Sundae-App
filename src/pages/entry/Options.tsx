import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexts/OrderDetails";
import React from "react";

interface Item {
  name: string;
  imagePath: string;
}

interface OptionsProps {
  optionType: 'scoops' | 'toppings';
}

export default function Options({ optionType }: OptionsProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<Item[]>(`http://localhost:3030/${optionType}`, { signal: controller.signal })
      .then(response => setItems(response.data))
      .catch(error => {
        if (error.name !== "CanceledError") setError(true);
      });

    return () => controller.abort();
  }, [optionType]);

  if (error) {
    return <AlertBanner message={""} variant={""} />;
  }

  const OptionComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const formattedTitle = `${optionType.charAt(0).toUpperCase()}${optionType.slice(1).toLowerCase()}`;

  const renderedItems = items.map(item => (
    <OptionComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <>
      <h2>{formattedTitle}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>{formattedTitle} total: {formatCurrency(totals[optionType])}</p>
      <Row>{renderedItems}</Row>
    </>
  );
}
