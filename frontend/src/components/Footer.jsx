import { Container, Row, Col, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

function Footer() {
    return(
        <footer >
            <Container fluid>
                <Row bg="light" data-bs-theme="light">
                    <Col className="mx-5">
                    <h2>FRUKTKORG</h2>
                    <p>Frukt för alla tillfällen</p>
                    </Col>
                    <Col>
                        <Nav className='flex-column fs-5'>
                        <Nav.Link as={Link} to="/sort">Sortiment</Nav.Link>
                        <Nav.Link as={Link} to="/login">Logga in</Nav.Link>
                        <Nav.Link as={Link} to="/faves">Favoriter</Nav.Link>
                        <Nav.Link as={Link} to="/cart">Varukorg</Nav.Link>
                            </Nav>
                            </Col>
                    <Col>
                        <h4>Kontakta oss!</h4>
                        <p>fruktkorg@fakeemail.com</p>
                        <p>Telefon: 070-123-frukt</p></Col>

                </Row>
            </Container>

        </footer>
    )
}

export default Footer
