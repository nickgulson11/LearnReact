import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Button, Container, Title, Column, Level , Box, Table} from 'rbx';
import Sidebar from "react-sidebar";

const ProductCard = ({ product, cart, setCart}) => (
 <Box>
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
    <Container>
    {sizes.map(size => <Button rounded onClick={ () => addToCart({product, cart, setCart, size})}> {size} </Button>)}
    </Container> 
  </Box>
);

const addToCart = ({product, cart, setCart, size}) => {
  var currCart = cart;
  
  if (String(product.sku).concat(size) in cart) {
    currCart[String(product.sku).concat(size)].count += 1;
} else {
    currCart[String(product.sku).concat(size)] = {product: product, count: 1, size: size};
}
setCart(currCart)
}

const sizes = ["S", "M", "L", "XL"];


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

/*function totalCost(itemsArr) {
  var totalcost = 0;
  itemsArr.forEach(obj => totalcost += obj.price * obj.count);
  return totalcost.toString();
}
*/
function totalCost(itemsArr) {
  return 69;
}

var sample_cart = {
  "12064273040195392": {
    "sku": 12064273040195392,
    "title": "Cat Tee Black T-Shirt",
    "description": "4 MSL",
    "style": "Black with custom print",
    "price": 10.9,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": true
  },
  "51498472915966370": {
    "sku": 51498472915966370,
    "title": "Dark Thug Blue-Navy T-Shirt",
    "description": "",
    "style": "Front print and paisley print",
    "price": 29.45,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": true
  }
};

const displayCart = (cart) => (
  <Box>
    <img src={"data/cart.png"} />
    {Object.keys(cart).map(product => console.log(typeof product) )}
  </Box>
);
const CartContent = ({productArray}) => (
  <div>
    <img src={"data/cart.png"} />
    <Title> Shopping Cart </Title>
    <Table>
      <Table.Body>
        <React.Fragment>
         { Object.keys(productArray).map(obj => <CartItem item={ obj } /> ) }
        </React.Fragment>
          <Table.Row>
            <Table.Cell>
              {'total price = $' + totalCost(productArray)}
            </Table.Cell>
          </Table.Row>
      </Table.Body>
    </Table>
  </div>
  );

  const CartItem = ({item}) => (
    <Table.Row>
      <Table.Cell>
        {item.title + ' ' + item.size + ' x' + item.count + ': $' + item.price*item.count}
      </Table.Cell>
    </Table.Row>
  );

  const HeadBar = ({cart}) => {
    console.log(cart);
    return (
    <Level>
      <Level.Item>
        <Button>Shopping Cart</Button>
        {displayCart(cart)}
      </Level.Item>
    </Level>
  )}

  const Product = ({ product }) => {
    const [inventory, setInventory] = useState({
      S: 2,
      M: 2,
      L: 2,
      XL: 2
    });
  }

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  const [cart, setCart] = useState({sample_cart});
  const [cartOpen, setCartOpen] = useState(true);
  
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
      <Container >
        {/* <Sidebar sidebar={<CartContent productArray={cart} />} open={cartOpen}  styles={{ sidebar: { background: "white" } }}/> */}
        {displayCart(cart)}
      </Container>
      <Column.Group multiline>
        {products.map( product => <Column size = "one-third"><ProductCard key={ product.sku } product={ product } cart = { cart } setCart = { setCart }/></Column>)} 
      </Column.Group>  
    </Container>
  );
};

export default App;