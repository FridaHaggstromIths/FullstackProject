import React from 'react'
import { useState } from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'

interface Values {
  firstName: string
  lastName: string
  email: string
  password: string
}

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

  return (
    <div>
      <h1>Skapa konto</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password:''
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
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
            placeholder="harrypotter@gmail.com"
            type="email"
          />
          <label htmlFor="password">Password</label>
            <Field
            id="password" 
            name="password" 
            placeholder="Password" 
            type="password" />

          <button type="submit" disabled={isSubmitting}>Submit</button>
        </Form>
        )}
      </Formik>
      {addAccount && <p>Account successfully created!</p>}
    </div>
  )
}


export default Login
