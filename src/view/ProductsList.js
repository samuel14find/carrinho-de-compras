import React, {Component} from 'react'
import {Products} from "../api/Products";
import {ProductItem} from "../components/ProductItem";
import './Product.css'
export class ProductsList extends Component {
  state = {
    products: []
  };
  async componentWillMount() {
    const {items} = await Products.getProducts();
    this.setState({products: items})
  }
  render() {
    return (
        <ul className="product-list">
          {
            this.state.products.map(p => (
                <li> <ProductItem product={p}/> </li>
            ) )
          }
        </ul>
    )
  }
}