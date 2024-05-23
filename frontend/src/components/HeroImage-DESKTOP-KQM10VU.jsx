import Image from 'react-bootstrap/Image'



function HeroImage() {
  return <div> <Image src = "/HeroApples.jpg" style={{width: '100%', sticky:top}}  />
<div className = "HeroText" style={
    {position: 'absolute', 
    top: '50%', 
    left: '60%',
    padding: '10px'}}>
<h3>Fruktkorg levererar till företag och privatpersoner. </h3>
<h3>
Fokus på kvalitet och lokalproducerade råvaror, </h3>
<h3> säsongens bästa frukter, 
direkt till kontoret eller hemmet. 
</h3>
</div>
</div>
}

export default HeroImage
