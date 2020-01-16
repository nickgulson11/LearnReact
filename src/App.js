import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Button, Container, Title } from 'rbx';

const ProductCard = ({ product }) => (
 <Container>
  <img src={"data/products/".concat(product.sku + "_1.jpg")} />
  <Title>
      { product.title } 
    </Title>
  </Container>
);

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
    <ul>
      {products.map(product => <ProductCard key={ product.sku } product={ product }/>)}
    </ul>
  );
};

export default App;