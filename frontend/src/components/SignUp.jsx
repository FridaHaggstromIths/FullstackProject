import { useState } from 'react'
import Modal  from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import PropTypes from 'prop-types'

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Ogiltig email').required('Vänligen fyll i din email'),
})

const LoginForm = ({ handleSubmit }) => (
  <Formik
    initialValues={{ email: '' }}
    validationSchema={loginSchema}
    onSubmit={handleSubmit}
  >
    {({ isSubmitting }) => (
      <Form className="d-flex flex-column align-items-start gap-3">
        <label className='mt-3'>
          Email: <Field type="email" name="email" className="mb-3"/>
          <ErrorMessage name="email" component="div" />
        </label>
        <Button variant="success" type="submit" disabled={isSubmitting}
        className='mx-3'>
          Prenumerera
        </Button>
      </Form>
    )}
  </Formik>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const PopUp = () => {
  const [subscribe, setSubscribe] = useState(false)
  const [signedUp, setSignedUp] = useState(false)

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const { email } = values

    try {
      const response = await fetch('/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText)
      }

      setSubscribe(true); // Prenumerera bara om email är unik
      setSignedUp(true) //Visar att du prenumererar
    } catch (error) {
      console.error('Error subscribing:', error)
      setErrors({ email: error.message })
    } finally {
      setSubmitting(false)
    }
  }

  const handleCloseModal = () => {
    setSubscribe(true)
    setSignedUp(false)
  }

  return (
    <>
      <p className="SignUpButton" onClick={() => {setSubscribe(false), setSignedUp(false) }} style={{ cursor: 'pointer' }}>
        Nyhetsbrev
      </p>

      <Modal
        show={!subscribe || signedUp}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Nyhetsbrev!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4">
          {subscribe ? (
            <p>Tack för att du prenumererar!</p>
          ) : (
            <>
              Prenumerera på vårt nyhetsbrev för att hålla koll på erbjudanden, säsongens frukt, tävlingar och annat kul!
                <LoginForm handleSubmit={handleSubmit} />
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default PopUp
