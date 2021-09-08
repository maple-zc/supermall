import {
  ADD_COUNTER,
  ADD_To_CART
} from './mutations-types'

export default {
  addToCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid ===payload.iid)

      if(oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前的商品数量+1')
      } else {
        payload.count = 1
        context.commit(ADD_To_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}
