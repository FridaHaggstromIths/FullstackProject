import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Ogiltig email').required('Vänligen fyll i din email'),
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
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const PopUp = () => {
  const [subscribe, setSubscribe] = useState(false);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const { email } = values;

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`Error subscribing: ${response.statusText}`)
      }

      setSubscribe(true) // Only set subscribe to true if the subscription request succeeds
    } catch (error) {
      console.error('Error subscribing:', error)
      setErrors({ email: 'Du får redan vårat nyhetsbrev! Kul!' })
    } finally {
      setSubmitting(false)
    }
  };

  return (
    <>
      <p className="SignUpButton" onClick={() => setSubscribe(false)} style={{ cursor: 'pointer' }}>
        Nyhetsbrev
      </p>

      <Modal
        show={!subscribe}
        onHide={() => setSubscribe(true)}
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
  );
};

export default PopUp
