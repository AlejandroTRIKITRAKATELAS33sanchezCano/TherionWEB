import { Route, Routes } from "react-router-dom"
import "./App.css"
import Index from "./components/Index"
import LoginDuenno from "./components/Duenno/LoginDuenno"
import RegistroDuenno from "./components/Duenno/RegistroDuenno"
import Negocios from "./components/Duenno/Negocios"
import RegistrarNegocio from "./components/Duenno/Negocio/RegistrarNegocio"
import ManejoPedidos from "./components/Duenno/ManejoPedidos"
import EditarDuenno from "./components/Duenno/EditarDuenno"
import EditarNegocio from "./components/Duenno/Negocio/EditarNegocio"
import CrearMenu from "./components/Duenno/Negocio/CrearMenu"
import CrearProducto from "./components/Duenno/Negocio/CrearProducto"
import EditarMenu from "./components/Duenno/Negocio/EditarMenu"
import EditarProducto from "./components/Duenno/Negocio/EditarProducto"
import Dashboard from "./components/Duenno/Negocio/Dashboard"
import RegistroCliente from "./components/Client/RegistroCliente"
import LoginClient from "./components/Client/LoginClient"
import SearchNegocios from "./components/Client/SearchNegocios"
import ManejoPedidosCliente from "./components/Client/ManejoPedidosCliente"
import Menu from "./components/Duenno/Negocio/Menu"
import VerMenus from "./components/Client/VerMenus"
import VerProductos from "./components/Client/VerProductos"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Index/>}/>

      //Dueño
      <Route path="/LoginDuenno" element={<LoginDuenno/>}/>
      <Route path="/RegistroDuenno" element={<RegistroDuenno/>}/>
      <Route path="/Negocios" element={<Negocios/>}/>
      <Route path="/EditarDuenno" element={<EditarDuenno/>}/> 
      <Route path="/RegistroNegocio" element={<RegistrarNegocio/>}/>
      <Route path="/EditarNegocio/:idNegocio" element={<EditarNegocio/>}/>
      <Route path="/ManejoPedidos" element={<ManejoPedidos/>}/>
      <Route path="/CrearMenu/:idNegocio" element={<CrearMenu/>}/>
      <Route path="/Menu/:idMenu" element={<Menu/>}/>
      <Route path="/EditarMenu" element={<EditarMenu/>}/>
      <Route path="/CrearProducto/:idMenu" element={<CrearProducto/>}/>
      <Route path="/EditarProducto" element={<EditarProducto/>}/>
      <Route path="/Dashboard" elemente={<Dashboard/>}/>

      //Cliente
      <Route path="/RegistroCliente" element={<RegistroCliente/>}/>
      <Route path="/LoginCliente" element={<LoginClient/>}/>
      <Route path="/BuscarNegocios" element={<SearchNegocios/>}/>
      <Route path="/ManejoPedidosCliente" element={<ManejoPedidosCliente/>}/>
      <Route path="/VerMenus/:idNegocio" element={<VerMenus/>}/>
      <Route path="/VerProductos/:idMenu" element={<VerProductos/>}/>
      
    </Routes>
  )
}

export default App
