import React from 'react'
import {connect} from 'react-redux'
import {Link, Redirect, Route} from 'react-router-dom'
import {getCartThunk, checkOutThunk} from '../store/cartReducer'
import thankYou from './thankYou'
import RemoveButton from './removeCartItem'

class DisconnectedCart extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.getCart()
  }
  removeItem(id) {}
  handleSubmit() {
    this.props.checkOut()
  }
  render() {
    return this.props.cart ? (
      <div>
        <h1>Cart</h1>
        <div>
          {this.props.cart.arts.map(item => {
            return (
              <ul key={item.id} className="cartList">
                <img src={item.imageURL} className="cartImage" />
                <div>{item.name}</div>
                <div>{item.artist}</div>
                <div>{item.price}</div>
                <RemoveButton productId={item.id} />
              </ul>
            )
          })}
        </div>
        <div>
          {this.props.isLoggedIn ? (
            <Link to="/thankyou">
              <button type="submit" onClick={() => this.handleSubmit()}>
                Check Out
              </button>
            </Link>
          ) : (
            <Link to="/signup">
              <button type="submit" onClick={() => this.handleSubmit()}>
                Please Login/Signup First
              </button>
            </Link>
          )}
        </div>
      </div>
    ) : (
      <div />
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cartReducer.cart,
  isLoggedIn: state.user.id
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCartThunk()),
  checkOut: () => dispatch(checkOutThunk())
})

const Cart = connect(mapStateToProps, mapDispatchToProps)(DisconnectedCart)

export default Cart
