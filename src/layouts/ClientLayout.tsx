import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '../components/Logo'
import { ShoppingCartIcon } from '@heroicons/react/20/solid'
import { useCart } from '../hooks/useCart'

export default function AppLayout() {

    const { cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, cartTotal, clearCart } = useCart()

    const objectsInCart = cart.length

    const navigate = useNavigate()

return (
    <>
        <header
            className='py-2 bg-blue-100'
        >
       <div className='max-w-screen-2xl mx-auto flex items-center justify-between p-5'>
            <div className='w-42'>
                <Link to={'/'}>
                     <Logo/>
                </Link>
             </div>

            {location.pathname === '/cart' ? (
                ''
            ) : (
                <div className='fixed top-1 right-1 p-5'>
                <button 
                    className='relative flex items-center gap-2 bg-blue-500 hover:bg-blue-600 rounded-lg p-3 cursor-pointer'
                    onClick={() => navigate('/cart')}
                >
                    <ShoppingCartIcon
                        className='w-5 h-5 text-white'
                    />
                    <p className='font-bold text-white text-m'>Cart</p>
                    {cart.length >= 1 ? (
                        <span className='absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 text-white font-bold flex items-center justify-center'>{objectsInCart}</span>
                    ) : ''}
                </button>
            </div>
            )}
            
            
            </div>
        </header>

         <section className='max-w-2xl mx-auto mt-5 p-5'>
            <Outlet context={{cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, cartTotal, clearCart}} />
        </section>

        <footer className='py-5'>
            <p className='text-center'>
                All Rights Reserved {new Date().getFullYear()}.
            </p>
        </footer> 

         <ToastContainer
            pauseOnHover={false}
            pauseOnFocusLoss={false}
         />    
    </>
    
  )
}
