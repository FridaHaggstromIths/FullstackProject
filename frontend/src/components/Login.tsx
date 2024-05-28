import React from 'react'
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { Formik, FormikHelpers } from 'formik'
import { Button, Card } from 'react-bootstrap'
import * as Yup from 'yup'
import HeroStrip from './HeroStripImage'

interface Values {
  firstName: string
  lastName: string
  email: string
  password: string
}
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Förnamn är obligatoriskt'),
  lastName: Yup.string().required('Efternamn är obligatoriskt'),
  email: Yup.string().email('Ogiltig e-postadress').required('E-post är obligatoriskt'),
  password: Yup.string().min(6, 'Lösenord måste vara minst 6 tecken långt').required('Lösenord är obligatoriskt'),
})
const Login = () => {
  const [addAccount, setaddAccount] = useState(false)

  const handleSubmit = async ({ firstName, lastName, email, password }: Values, { setSubmitting, setErrors }: FormikHelpers<Values>) => {

  try {
    const response = await fetch('/Login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({firstName, lastName, email, password }),
    })

    if (!response.ok) {
      throw new Error(`Error subscribing: ${response.statusText}`)
    }

    setaddAccount(true) // Prenumerera bara om email är unik?
  } catch (error) {
    console.error('Error subscribing:', error)
    setErrors({ email: 'Du får redan vårat nyhetsbrev! Kul!' })
  } finally {
    setSubmitting(false)
  }
}

  return (<>
< HeroStrip />
    <Card>
    <div className="d-flex flex-column align-items-center vh-100 justify-content-center">
      <h1>Skapa konto</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password:''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
        <Form style={{ maxWidth: '400px' }}>

<Form.Group className="mb-3" controlId="formbasicfirstName">
        <Form.Label htmlFor="firstName">Förnamn</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          placeholder="Alice"
        />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formbasiclastName">
          <Form.Label htmlFor="lastName">Efternamn</Form.Label>
          <Form.Control type="text" placeholder="Bobsson"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formbasicEmail">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control type="email" placeholder="Cesar@fu.com" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formbasicPassword">
          <Form.Label htmlFor="password">Lösenord</Form.Label>
          <Form.Control type="password" placeholder="Lösenord" />
          </Form.Group>
          <Button variant="success" type="submit" disabled={isSubmitting}>Skapa konto</Button>
        </Form>
        )}
      </Formik>
      </div>
      {addAccount && <p>Hurra du har skaffat konto hos oss!</p>}
    </Card>
    </>
  )
}


export default Login
