import { Container, Row, Col, Nav, Navbar, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SignUp from './SignUp.jsx'


function Footer() {
    return(
        <footer  style={{marginTop:'5vh',paddingTop:'4vh', borderTop: '1px solid #ccc' }}>
            <Container fluid>
                <Row bg="light" data-bs-theme="light">
                <Navbar.Brand as={Link} to="/" className="text-center">
                <Image fluid src="/logga.png" style={{ width: '200px', height: 'auto' }}  />
                </Navbar.Brand>
                </Row>
                <Row bg="light" data-bs-theme="light">
                    <Col md={{ span: 6 }} className="text-center"> 
                        <Nav style={{padding:'10px'}} className='flex-column fs-5'>
                        <Nav.Link as={Link} to="/sort"className="text-dark">Sortiment</Nav.Link>
                        <Nav.Link as={Link} to="/login"className="text-dark">Logga in</Nav.Link>
                        <Nav.Link as={Link} to="/faves"className="text-dark">Favoriter</Nav.Link>
                        <Nav.Link as={Link} to="/cart"className="text-dark">Varukorg</Nav.Link>
                            </Nav>
                            </Col>
                    <Col md={{ span: 6 }} className="text-center">
                        <h4>Kontakta oss!</h4>
                        <p>fruktogram@fakeemail.com</p>
                        <p>Telefon: 070-123-frukt</p>
                        <SignUp />
                        </Col>

                </Row>
            </Container>

        </footer>
    )
}

export default Footer