import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const cardData = [
  {
    imgSrc: 'path/to/image1.jpg',
    title: 'Äpple',
    text: 'Info om fruktkorg Äpple',
  },
  {
    imgSrc: 'path/to/image2.jpg',
    title: 'Card title 2',
    text: 'This is the second card with its own unique content.',
  },
  {
    imgSrc: 'path/to/image3.jpg',
    title: 'Card title 3',
    text: 'This is the third card with its own unique content.',
  },
  {
    imgSrc: 'path/to/image4.jpg',
    title: 'Card title 4',
    text: 'This is the fourth card with its own unique content.',
  },
  {
    imgSrc: 'path/to/image5.jpg',
    title: 'Card title 5',
    text: 'This is the fifth card with its own unique content.',
  },
  {
    imgSrc: 'path/to/image6.jpg',
    title: 'Card title 6',
    text: 'This is the sixth card with its own unique content.',
  },
]

function Sort() {
  return (
    <Row xs={1} md={2} className="g-4">
      {cardData.map((card, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" src={card.imgSrc} />
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
              <Card.Text>
                {card.text}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default Sort;
