import React from 'react'
import Form from './pages/Form'
import Home from './pages/Home'
import Customer from './pages/Customer'
import Supplier from './pages/Supplier'
const App = () => {
  return (
    <div className='bg-zinc-900 text-white min-h-screen flex flex-col items-center justify-center gap-10'>
      <Form/>
      <Home />
      <Customer />
      <Supplier />



    </div>
  )
}

export default App