import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup'
import PropTypes from 'prop-types'

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Ej giltig email').required('Vänligen fyll i din email'),
});

const LoginForm = ({ handleSubmit }) => (
  <Formik
    initialValues={{ email: '' }}
    validationSchema={loginSchema}
    onSubmit={handleSubmit}
  >
    {({ isSubmitting }) => (
      <Form>
        <label>
          Email: <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
        </label>
        <button type="submit" disabled={isSubmitting}>
          Prenumerera
        </button>
      </Form>
    )}
  </Formik>
)
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}
function PopUp() {
  const [show, setShow] = useState(true)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  
  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
    }, 400)

  }

  return (
    <>
      <p className='SignUpButton' onClick={handleShow}style={{ cursor: 'pointer' }}>
        Nyhetsbrev
      </p>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
        <Modal.Title>Nyhetsbrev!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
        Prenumerera på vårat nyhetsbrev för att hålla koll på erbjudanden, säsongens frukt, tävlingar och massa annat kul!
        <LoginForm handleSubmit={handleSubmit} onClick={handleSignUp} />

              </>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default PopUp