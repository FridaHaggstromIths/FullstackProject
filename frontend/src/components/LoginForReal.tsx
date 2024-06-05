
import React, {useState} from 'react'
import HeroStrip from './HeroStripImage'
import { Button, Modal } from 'react-bootstrap'
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Ogiltig e-postadress').required('E-post är obligatoriskt'),
    password: Yup.string().min(6, 'Lösenord måste vara minst 6 tecken långt').required('Lösenord är obligatoriskt'),
  })

interface Values {
  email: string
  password: string
}

const LoginForReal = () => {
    const [addAccount, setAddAccount] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const handleClose = () => setShowModal(false)

    const handleSubmit = async (values: Values, { setSubmitting, setErrors }: FormikHelpers<Values>) => {
        try {
          const response = await fetch('/checkAccount', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          })

          if (!response.ok) {
            const errorData = await response.json()
            setErrors({ email: ' ', password: errorData.message || 'Något gick fel, försök igen.' })
            setSubmitting(false)
            return
          }
            setAddAccount(true)
            setShowModal(true)
        } catch (error) {
          console.error('Error login:', error)
          setErrors({ email: ' ', password: 'Något gick fel, försök igen.' })
        } finally {
          setSubmitting(false)
        }
}

  return (
    <>
    <HeroStrip />
    <div className="d-flex flex-column align-items-center vh-95 mt-4 mb-1">
      <h1 className='SkapaKonto'>Logga in</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
    >
        {({ isSubmitting }) => (
        <Form style={{ maxWidth: '400px' }}>
            <div className="mb-3 d-flex flex-column align-items-center">
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="john@acme.com"
            type="email"
          />
          <ErrorMessage name="email" component="div" className="text-danger" />
          </div>
          <div className="mb-3 d-flex flex-column align-items-center">
          <label htmlFor="email">Lösenord</label>
          <Field
            id="password"
            name="password"
            placeholder="Lösenord"
            type="password"
          />
          <ErrorMessage name="password" component="div" className="text-danger" />
          </div>
          <Button variant="success"type="submit" disabled={isSubmitting}>Logga in</Button>
        </Form>
        )}
      </Formik>
    </div>

    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Välkommen</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4">
          Du är nu inloggad! Weho
          </Modal.Body>
          <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Stäng
          </Button>
          </Modal.Footer>
      </Modal>
    </>
  )
}


export default LoginForReal
