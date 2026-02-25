import { Routes, Route} from 'react-router-dom';

/* Componentes */
import SideHeader from "./componentes/SideHeader";
import Footer from './componentes/Footer';

/* Páginas */
import Home from "./pages/Home";
import Produto from './pages/Produto';
import Carrinho from './pages/Carrinho';
import Login from './pages/LoginUsuario';
import PedidoConcluido from './pages/PedidoConcluido';
import MeusPedidos from './pages/meusPedidos';

import './App.css'


function App() {
  return (
    <>
      <main className='main-content'>
        <SideHeader />
          <Routes>
            <Route path='/' element={ <Home />} />
            <Route path="/produtos" element={<Produto />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/entrar" element={<Login />} />
            <Route path='/pedido-concluido' element={<PedidoConcluido /> } />
            <Route path='/pedidos' element={<MeusPedidos /> } />
          </Routes>
      </main>
      <footer>
          <Footer />
      </footer>
    </>
  )
}

export default App;
