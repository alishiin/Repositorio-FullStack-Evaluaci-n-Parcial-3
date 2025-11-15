import { Button, Card } from "react-bootstrap";
import { NavLink } from "react-router";
import { ROUTE_PATHS } from "../utils/constants";
import { formatPrice } from "../utils/formatters";

function ProductCard({ name, price, description, image, action=undefined, actionName="Ver" }) {

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={image} alt={`Imagen producto ${name}`} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{formatPrice(price)}</Card.Subtitle>
        <Card.Text className="d-flex flex-grow-1">
          {description}
        </Card.Text>
        {action && (<Button variant="primary" onClick={action}>
          {actionName}
        </Button>)}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;