import React, { useState } from 'react'
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button, Card } from 'react-bootstrap'
import HeroStrip from './HeroStripImage'

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Förnamn är obligatoriskt'),
  lastName: Yup.string().required('Efternamn är obligatoriskt'),
  email: Yup.string().email('Ogiltig e-postadress').required('E-post är obligatoriskt'),
  password: Yup.string().min(6, 'Lösenord måste vara minst 6 tecken långt').required('Lösenord är obligatoriskt'),
});

interface Values {
  firstName: string
  lastName: string
  email: string
  password: string
}

const Login = () => {
  const [addAccount, setAddAccount] = useState(false)

  const handleSubmit = async (values: Values, { setSubmitting, setErrors }: FormikHelpers<Values>) => {
    try {
      const response = await fetch('/Login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Error subscribing: ${response.statusText}`)
      }

      setAddAccount(true)
    } catch (error) {
      console.error('Error subscribing:', error)
      setErrors({ email: 'Du får redan vårat nyhetsbrev! Kul!' })
    } finally {
      setSubmitting(false)
    }
  };

  return (
    <>
      <HeroStrip />
      <Card>
        <div className="d-flex flex-column align-items-center vh-100 mt-6">
          <h1>Skapa konto</h1>
          <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form style={{ maxWidth: '400px' }}>
                <div className="mb-3">
                  <label htmlFor="firstName">Förnamn</label>
                  <Field
                    name="firstName"
                    type="text"
                    placeholder="Alice"
                    className="form-control"
                  />
                  <ErrorMessage name="firstName" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label htmlFor="lastName">Efternamn</label>
                  <Field
                    name="lastName"
                    type="text"
                    placeholder="Bobsson"
                    className="form-control"
                  />
                  <ErrorMessage name="lastName" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Cesar@fu.com"
                    className="form-control"
                  />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label htmlFor="password">Lösenord</label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Lösenord"
                    className="form-control"
                  />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>

                <Button variant="success" type="submit" disabled={isSubmitting}>
                  Skapa konto
                </Button>
                <Button variant="outline-success">Logga in</Button>
              </Form>
            )}
          </Formik>
          {addAccount && <p>Hurra du har skaffat konto hos oss!</p>}
        </div>
      </Card>
    </>
  )
}

export default Login

