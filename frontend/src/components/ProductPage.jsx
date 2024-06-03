import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Card, Button } from 'react-bootstrap'
import HeroStrip from './HeroStripImage'


const ProductPage = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        console.log(`Fetching product with id: ${id}`)

        fetch(`/productpage/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => {
                console.error('There was an error fetching the product!', error)
            })
    }, [id])

    const handleAddToCart = () => {
        const userId = null
        const productId = product.ID
        const quantity = 1

        fetch(`/cart/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, productId, quantity }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add product to cart')
            }
            return response.json()
        })
        .then(data => {
            console.log('Product added to cart:', data)

        })
        .catch(error => {
            console.error('Error:', error)
        });
    };

    if (!product) return <div>Loading...</div>

    return (
        <>
            <HeroStrip />
            <Row xs={1} md={2} className="g-4 justify-content-center">
                <Col key={product.ID} className="text-center">
                    <img src={product.img} alt="en bild på en fruktkorg" className="img-fluid" />
                </Col>
                <Col key={product.ID} className="d-flex align-items-center justify-content-center">
                    <div className="p-1 custom-margin" style={{ margin: '2vh' }}>
                        <Card style={{ backgroundColor: product.hex }} className="w-100 h-100 m-10">
                            <Card.Body className="d-flex flex-column justify-content-center text-center">
                                <Card.Title className="display-4">{product.titel}</Card.Title>
                                <Card.Text className="fs-5">{product.info}</Card.Text>
                                <Card.Text className="fs-5">{product.description}</Card.Text>
                                <Card.Text className="display-4">{product.price}kr</Card.Text>
                                <Button variant="success" size="lg" onClick={handleAddToCart} className="mx-auto w-50" style={{ margin: '1vh' }}>
                                    Lägg i varukorg
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default ProductPage
