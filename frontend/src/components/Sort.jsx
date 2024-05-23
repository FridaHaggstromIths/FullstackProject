import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const GoToProductButton = ({ id }) => {
  const navigate = useNavigate();

  const goToProduct = (id) => {
    console.log('Navigating to product with id:', id); // Lägg till loggning för felsökning
    navigate(`/productpage/${id}`);
  };

  return (
    <Button variant="outline-success" size="lg" onClick={() => goToProduct(id)}>
      Visa Produkt
    </Button>
  );
};

GoToProductButton.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

const Fruktkorg = () => {
  const [fruktkorg, setFruktkorg] = useState([]);

  useEffect(() => {
    fetch('/fruktkorg')
      .then((response) => response.json())
      .then((data) => setFruktkorg(data))
      .catch(error => {
        console.error('There was an error fetching the product list!', error);
      });
  }, []);

  return (
    <Row xs={1} md={2} className="g-4">
      {fruktkorg.map((frukt) => (
        <Col key={frukt.id}>
          <Card>
            <Card.Img variant="top" src={frukt.img} alt="en bild på en fruktkorg" />
            <Card.Body>
              <Card.Title>{frukt.titel}</Card.Title>
              <Card.Text>{frukt.info}</Card.Text>
              <GoToProductButton id={frukt.id} />
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Fruktkorg;

















/* import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

const GoToProductButton = ({ id }) => {
  const navigate = useNavigate()

  const goToProduct = (id) => {
    navigate(`/productpage/${id}`)
  }

  return (
    <Button variant="outline-success"size="lg" onClick={() => goToProduct(id)}>
      Visa Produkt
    </Button>
  )
}

// Definiera prop-typer för GoToProductButton
GoToProductButton.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
}

const Fruktkorg = () => {
  const [fruktkorg, setFruktkorg] = useState([])

  useEffect(() => {
    fetch('/fruktkorg')
      .then((response) => response.json())
      .then((data) => setFruktkorg(data))
  }, [])

  return (
    <Row xs={1} md={2} className="g-4">
      {fruktkorg.map((frukt) => (
        <Col key={frukt.id}>
          <Card>
            <Card.Img variant="top" src={frukt.img} alt="en bild på en fruktkorg"/>
            <Card.Body>
              <Card.Title>{frukt.titel}</Card.Title>
              <Card.Text>
                {frukt.info}
              </Card.Text>
              <GoToProductButton id={frukt.id} />
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default Fruktkorg */
