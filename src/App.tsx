import { Routes, Route} from 'react-router-dom';

// Hook 
import { useAuth } from './context/AuthContext';

/* Componentes */
import SideHeader from "./componentes/SideHeader";

/* Páginas */
import Home from "./pages/Home";
import Produto from './pages/Produto';
import Carrinho from './pages/Carrinho';
import Cadastro from './componentes/Cadastro';
import Login from './pages/LoginUsuario';
import PedidoConcluido from './pages/PedidoConcluido';
import MeusPedidos from './pages/MeusPedidos';
import About from './pages/About';

import './App.css'


function App() {

  return (
    <>
      <main className='main-content'>
        <SideHeader />
          <Routes>
            <Route path='/' element={ <Home />} />
            <Route path="/produtos" element={<Produto />} />
            <Route path='/sobre' element={<About />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path='/cadastro' element={<Cadastro />} />
            <Route path="/entrar" element={<Login />} />
            <Route path='/pedido-concluido' element={<PedidoConcluido /> } />
            <Route path='/pedidos' element={<MeusPedidos /> } />
          </Routes>
      </main>
    </>
  )
}

export default App;
