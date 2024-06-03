
import { useState } from "react"
import HeroStrip from "./HeroStripImage"
import { Card,  } from "react-bootstrap"
import { v4 as uuid } from "uuid"

function ThankYou()  {

const [date] = useState(new Date())
const orderNumber = uuid()
const smallNumber = orderNumber.slice(0, 13)

return (
    <>
    <HeroStrip />
    <Card className="InfoText" style={{marginTop:'5vh', width:'100%', border: 'none', borderRadius:'0'}}>
      <Card.Body style={{background: '#EAEEED', padding:'3vh', textAlign:'left'}}>
        <Card.Title className="display-6" style={{marginLeft:'3vh', marginRight:'3vh', marginBottom:'2vh'}}>Tack för att du handlar av oss!</Card.Title>
        <Card.Text style={{marginLeft:'3vh', marginRight:'3vh'}}>
            <p>Tack för att du handlade hos oss på FruktOgram. Vi har mottagit din beställning och den är nu under behandling.</p>
            <p>Ordernummer: {smallNumber} </p>
            <p>Beställningsdatum: {date.toLocaleDateString()}</p>
            <p>Du kommer att få en e-postbekräftelse med alla detaljer om din beställning. </p>
            <p>När din beställning har skickats kommer du få ett spårningsnummer så att du kan följa din leverans.</p>

            <p>Om du har några frågor eller behöver hjälp med din beställning, tveka inte att kontakta oss på fruktogram@fakeemail.com eller ring oss på 070-123-frukt.</p>
            <p> Tack igen för att du valde FruktOgram. Vi hoppas att du kommer att njuta av dina produkter!</p>

        </Card.Text>
      </Card.Body>
    </Card>

    </>
)
}

export default ThankYou