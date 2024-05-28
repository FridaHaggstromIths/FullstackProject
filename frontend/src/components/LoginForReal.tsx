
import React, {useState} from 'react'
import HeroStrip from './HeroStripImage'
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

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await fetch('/Login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })
        if (!response.ok) {
            throw new Error(`Error subscribing: ${response.statusText}`)
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
    
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 500)
        }}
      >
        <Form>
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="john@acme.com"
            type="email"
          />
          <ErrorMessage name="email" component="div" className="text-danger" />
          <label htmlFor="email">Lösenord</label>
          <Field
            id="password"
            name="password"
            placeholder="Lösenord"
            type="password"
          />
          <ErrorMessage name="password" component="div" className="text-danger" />

          <button type="submit">Logga in</button>
        </Form>
      </Formik>
    </div>
    </>
  )
}

export default LoginForReal