import { useEffect, useState } from 'react'
import { Row, Col, Card } from 'react-bootstrap'

const Login = () =>{

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch(error => {
        console.error('There was an error fetching the product list!', error)
      })
  }, [])


  return (
    <Row xs={1} md={2} className="g-4">
      {users.map((user) => (
        <Col key={user.ID}>
          <Card>
            <Card.Body>
              <Card.Title>{user.firstName}</Card.Title>
              <Card.Text>{user.lastName}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>

  )
}
export default Login
