import HeroImage from './HeroImage.jsx'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
  <div>
    <HeroImage />

    <Card className="InfoText" style={{marginTop:'5vh', width:'100%', border: 'none', borderRadius:'0'}}>
      <Card.Body style={{background: '#EAEEED',
      textAlign:'center'}}>
        <Card.Title className="display-6">Om oss</Card.Title>
        <Card.Text>
          <p>Fruktkorg är ett påhittat företag som levererar frukt och choklad till företag och privatpersoner.</p>
          <p>Vi levererar färsk frukt varje dag till erat kontor så era anställda vill jobba kvar.</p>

          <p>Våra korgar är också perfekta som presenter för födelsedagar, högtider, eller bara som en trevlig överraskning. </p>
          <p>Utforska hela vårat sortiment här:</p>

        </Card.Text>
        <Button variant="success"size="lg"as={Link} to="/Sort">Sortiment</Button>
      </Card.Body>
    </Card>
    </div>
  )
}
export default Home
