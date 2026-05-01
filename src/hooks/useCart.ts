import { useState, useEffect, useMemo } from 'react'
import type { NewProductCart, Product, ProductCartData } from '../types'

export const useCart = () => {

    const initialCart = () : ProductCartData[] => {
        // Comprobar si existen datos en el almacenamiento local
        // Regresarlo a arreglo con los datos o vacío
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [cart, setCart] = useState(initialCart)

    // Indicacion secundaria para no complicar performance
    // En lugar de una función que se ejecuta antes del setState
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item :  NewProductCart){
        const itemExists = cart.findIndex(product => product._id === item._id )

        if(itemExists >= 0){
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++

            // Siempre es Set, no se puede mutar, por eso seteamos copia actualizada
            setCart(updatedCart)
            
        } else {
            const newItem : ProductCartData = {...item, quantity : 1}
            setCart([...cart, newItem])
        }

    }

    function removeFromCart(id: Product['_id']){
        setCart(prevCart => prevCart.filter(product => product._id !== id))
    }

    function increaseQuantity(id: Product['_id']){
        const updatedCart = cart.map( item => {
            if(item._id === id ){
                return{
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function decreaseQuantity(id: Product['_id']){
        const updatedCart = cart.map( item => {
            if(item._id === id){
                return{
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        } )
        setCart(updatedCart)
    }

    function clearCart(){
        setCart([])
    }

    // State Derivado
    const isEmpty = useMemo( () => cart.length === 0, [cart])
    const cartTotal = useMemo( () => cart.reduce( (total, item) => 
    total + (item.quantity * item.price), 0), [cart])

    return {
      cart,
      addToCart,
      removeFromCart,
      decreaseQuantity,
      increaseQuantity,
      clearCart,
      isEmpty,
      cartTotal
    }
}