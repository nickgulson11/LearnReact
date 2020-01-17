import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Button, Container, Title, Column } from 'rbx';

const ProductCard = ({ product }) => (
 <Container>
  <img src={"data/products/".concat(product.sku + "_1.jpg")} />
  <Title>
      { product.title } 
    </Title>
    <Title>
      { product.description } 
    </Title>
    <Title>
      ${ product.price } 
    </Title>
    { displaySizes() }
  </Container>
);


const sizes = ["XL", "L", "M", "S"];

const displaySizes = () => (
  <Container>
    {sizes.map(size => <Button> {size} </Button>)}
  </Container>
);

/* const displayInventory = ({ products }) => (
  <Container>
      <Title size = {1}>
        Gulson Gear Co.
      </Title>
      <Column.Group multiline>
        {products.map( product => <Column size = "one-third"><ProductCard key={ product.sku } product={ product }/></Column>)} 
      </Column.Group>  
  </Container>
) */

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      <Title size = {1}>
        Gulson Gear Co.
      </Title>
      <Column.Group multiline>
        {products.map( product => <Column size = "one-third"><ProductCard key={ product.sku } product={ product }/></Column>)} 
      </Column.Group>  
    </Container>
  );
};

export default App;