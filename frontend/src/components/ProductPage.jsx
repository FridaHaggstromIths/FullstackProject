import { useParams } from 'react-router-dom'

const ProductPage = () => {
  const { id } = useParams()

  return (
    <div>
      <h1>Product Page</h1>
      <p>Product ID: {id.titel}</p>

    </div>
  )
}

export default ProductPage
