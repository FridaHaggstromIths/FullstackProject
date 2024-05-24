import React from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'

interface Values {
  firstName: string
  lastName: string
  email: string
  adress: string
  postal: string
  area: string
  phone: string
}

const Login = () => {
  return (
    <div>
      <h1>Skapa konto</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          adress:'',
          postal:'',
          area:'',
          phone:'',
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 500);
        }}
      >
        <Form>
          <label htmlFor="firstName">Förnamn</label>
          <Field id="firstName" 
          name="firstName" 
          placeholder="John" />

          <label htmlFor="lastName">Efternamn</label>
          <Field 
          id="lastName" 
          name="lastName" 
          placeholder="Doe" />

          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="john@acme.com"
            type="email"
          />
          <label htmlFor="adress">Adress</label>
          <Field 
          id="adress" 
          name="adress" 
          placeholder="Adress" />
          <label htmlFor ="postal"> Postnummer</label>
          <Field
          id="postal"
          name="postal"
          placeholder="Postnr"
          />
          <label htmlFor="area">Ort</label>
          <Field
          id="area"
          name="area"
          placeholder="Ort"
          />
          <label htmlFor="phone">Mobil</label>
          <Field
            id="phone"
            name="phone"
            placeholder="Mobilnr"
          />


          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}


export default Login
