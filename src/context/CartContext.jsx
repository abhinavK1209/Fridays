import { createContext, useContext, useReducer, useCallback } from 'react'

const CartContext = createContext(null)

const initialState = {
  items: [],
  isOpen: false,
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size, quantity = 1 } = action.payload
      const key = `${product.id}__${size.ml}`
      const existing = state.items.find(i => i.key === key)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.key === key ? { ...i, quantity: i.quantity + quantity } : i
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { key, product, size, quantity }],
      }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.key !== action.payload) }
    case 'UPDATE_QTY': {
      const { key, delta } = action.payload
      const updated = state.items
        .map(i => i.key === key ? { ...i, quantity: i.quantity + delta } : i)
        .filter(i => i.quantity > 0)
      return { ...state, items: updated }
    }
    case 'CLEAR':
      return { ...state, items: [] }
    case 'OPEN_CART':
      return { ...state, isOpen: true }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addToCart = useCallback((product, size, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, size, quantity } })
    dispatch({ type: 'OPEN_CART' })
  }, [])

  const removeFromCart = useCallback((key) => {
    dispatch({ type: 'REMOVE_ITEM', payload: key })
  }, [])

  const updateQty = useCallback((key, delta) => {
    dispatch({ type: 'UPDATE_QTY', payload: { key, delta } })
  }, [])

  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), [])
  const openCart = useCallback(() => dispatch({ type: 'OPEN_CART' }), [])
  const closeCart = useCallback(() => dispatch({ type: 'CLOSE_CART' }), [])

  const cartCount = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const cartSubtotal = state.items.reduce((sum, i) => sum + i.size.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{
      items: state.items,
      isOpen: state.isOpen,
      cartCount,
      cartSubtotal,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      openCart,
      closeCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
