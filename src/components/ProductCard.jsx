import { Button, Card } from "react-bootstrap";
import { formatPrice } from "../utils/formatters";

function ProductCard({ name, price, description, image, action=undefined, actionName="Ver" }) {

  return (
    <Card className="h-100 product-card">
      <Card.Img variant="top" src={image} alt={`Imagen producto ${name}`} />
      <Card.Body className="d-flex flex-column">
        <Card.Title style={{ fontFamily: "'Playfair Display', serif" }}>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{formatPrice(price)}</Card.Subtitle>
        <Card.Text className="d-flex flex-grow-1">
          {description}
        </Card.Text>
        {action && (<Button variant="primary" onClick={action} className="mt-3 align-self-end">
          {actionName}
        </Button>)}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;