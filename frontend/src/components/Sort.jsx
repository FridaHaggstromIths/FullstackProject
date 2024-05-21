//import Card from 'react-bootstrap/Card'
//import Col from 'react-bootstrap/Col'
//import Row from 'react-bootstrap/Row'
import { useEffect } from 'react'
import { useState } from 'react'

/* const fruktkorgar = [
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
] */

function Sort() {
  const [fruktkorg, setfruktkorg] = useState([]);

  useEffect(() => {
    fetch('/fruktkorg')
      .then((response) => response.json())
      .then((data) => setfruktkorg (data))

  }, [])

  return (
    <div>
            <h1>Hej test fruktkorg h1 frontend Sort</h1>
            <ul>
                {fruktkorg.map((frukt) => (
                    <li key={frukt.id}>
                        {frukt.titel}:{frukt.info}
                    </li>
                ))}
            </ul>

        </div>

  )
}

export default Sort;


{/* <Row xs={1} md={2} className="g-4">
      {fruktkorgar.map((frukt, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" src={frukt.id1.img} />
            <Card.Body>
              <Card.Title>{frukt.id1.title}</Card.Title>
              <Card.Text>
                {frukt.id1.text}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row> */}
