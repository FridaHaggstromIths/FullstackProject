import HeroImage from './HeroImage.jsx'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const Home = () =>{
  return (<div>
    <HeroImage />

    <Card className="InfoText" style={{marginTop:'5vh', width:'100%'}}>
      <Card.Body style={{background: '#EAEEED', 
      textAlign:'center', 
      padding:'5%'}}>
        <Card.Title >Om oss</Card.Title>
        <Card.Text style = {{fontSize:'22px'}}>
          <p>Fruktkorg är ett påhittat företag som levererar fruktkorgar till företag och privatpersoner.</p>
          <p>Vi levererar färsk frukt varje dag till erat kontor för att säkerställa att dina anställda trivs på sin arbetsplats.</p>
          <p>Välj bland våra standardalternativ eller skräddarsy en korg efter företagets preferenser.</p>

          <p>Våra korgar är också perfekta som presenter för födelsedagar, högtider, eller bara som en trevlig överraskning. </p>
          <p>Utforska hela vårat sortiment här:</p>

        </Card.Text>
        <Button variant="outline-success"size="lg">Sortiment</Button>{' '}
      </Card.Body>
    </Card>
    </div>
  )
}
export default Home
