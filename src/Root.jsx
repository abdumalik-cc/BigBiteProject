import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './page/home/Home'
import Batafsil from './page/batafsil/Batafsil'
import Buyurtma from './page/buyurtma/Buyurtma'
import { useState } from 'react'
import Login from './page/login/Login'
import Admin from './page/admin/Admin'

function Root() {
  const[cart,setCart]=useState([]);
  function addToCart(product){
    setCart([...cart,product])
  }
  function deleteFromCart(index){
    setCart(cart.filter((_,i)=>i !== index));
  }
  return (
    <div>
        <BrowserRouter>
        
          <Routes>
             <Route path='/' element={<Home cart={cart} deleteFromCart={deleteFromCart}/>}></Route>
             <Route path="/batafsil/:id" element={<Batafsil addToCart={addToCart} cart={cart}  deleteFromCart={deleteFromCart}/>}></Route>
             <Route path='/buyurtma' element={<Buyurtma cart={cart}/>}></Route>
             <Route path='/admin-panel' element={<Admin/>}></Route>
             <Route path='/login' element={<Login/>}></Route>
             <Route path='*' element={<h1>Page not found 404...</h1>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Root