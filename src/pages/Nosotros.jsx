import { Container, Row, Col, Image } from "react-bootstrap";

function Nosotros() {
  return (
    <Container className="my-5">
      <h1 className="text-center text-pink-600 font-pacifico text-4xl md:text-6xl mb-4">
        Nuestra Historia
      </h1>

      <hr className="w-75 mx-auto mb-5" />

      <Row className="align-items-center mb-5">
        <Col md={6} className="mb-4 mb-md-0">
          <Image
            src="/hq720.jpg"
            alt="Pastelería artesanal"
            fluid
            rounded
            className="shadow-lg"
          />
        </Col>

        <Col md={6}>
          <p className="lead text-muted text-justify">
            En <strong>Pastelería Momo&Virgo</strong> nacimos de una simple idea: 
            convertir los momentos más dulces en experiencias mágicas.  
            Nuestra historia comenzó en una pequeña cocina fantasmagorica, donde los aromas 
            de la vainilla eran tan buenos que el tablero de alta tension trifasico explotó y asi nació la Pastelería,
            y la pasión por crear algo especial.  
          </p>

          <p className="lead text-muted text-justify">
            Con el tiempo, esa mezcla se transformó en una aventura llamada 
            <em>“Sabores Fantasma”</em> porque creemos que cada pastel tiene un 
            espíritu que encanta a quien lo prueba. Hoy seguimos elaborando 
            tortas, cupcakes y postres artesanales con ingredientes frescos, 
            recetas familiares y un toque misterioso que los hace únicos.
          </p>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={6}>
          <h3 className="text-pink-600 mb-3">✨ Nuestra Filosofía</h3>
          <p className="text-muted">
            Creemos que cada creación debe contar una historia, y la nuestra 
            está escrita con amor, harina y un poco de magia.  
            En Momo&Virgo cuidamos cada detalle, desde la elección de los 
            ingredientes hasta la presentación final, para que cada bocado 
            sea un recuerdo imborrable.
          </p>
        </Col>

        <Col md={6}>
          <h3 className="text-pink-600 mb-3">Lo Que Nos Inspira</h3>
          <p className="text-muted">
            Nos inspiran las sonrisas de quienes prueban nuestros postres, 
            las celebraciones que acompañamos y las historias que se tejen 
            alrededor de una mesa dulce.  
            Cada pastel que sale de nuestro horno lleva un pedacito de nuestra alma.
          </p>
        </Col>
      </Row>

      <div className="text-center mt-5">
        <h4 className="text-pink-500 font-semibold mb-2">
          Gracias por dejar que nuestros sabores te acompañen
        </h4>
        <p className="text-muted">
          En cada mordisco hay un fantasma y eso te hace parte de la familia virgo
        </p>
      </div>
    </Container>
  );
}

export default Nosotros;
