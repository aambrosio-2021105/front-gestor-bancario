import { Navigate, Route, Routes } from "react-router-dom"
import { NavBar } from "./NavBar"
import { Login } from "./login/components/Login"

import { isAdminAppAuthenticated, isUserLogged, isClienteAuthenticated } from "./login/helpers/isUserAuthenticated"
import { Home } from "./home/components/Home";
import { PanelAdminApp } from "./panelAdminApp/components/PanelAdminApp"

import { CreateContacto } from "./home/contactos/components/CreateContacto"
import { TablaTransaccionId } from "./home/transaccion/components/TablaTransaccionId"
import { ListUsers } from "./panelAdminApp/users/components/ListUsers"

import { Contactos } from "./home/contactos/components/Contactos"
import { Transacciones } from "./home/transaccion/components/Transacciones"
import { HacerTransferencia } from "./home/components/transferencia/components/HacerTransferencia"
import { CreateUser } from "./panelAdminApp/users/components/CreateUser"

import { PerfilAdmin } from "./panelAdminApp/components/perfil/components/PerfilAdmin"
import { PerfilCliente } from "./home/components/perfil/components/PerfilCliente"
import { Cuentas } from "./panelAdminApp/components/cuentasAscen_Descen/components/Cuentas"
import { CreateAmin } from "./panelAdminApp/components/nuevo_admin/components/CreateAmin"
import { CreateCuenta } from "./panelAdminApp/components/cuenta/components/CreateCuenta"

export const AppRouter = () => {
    return (
        <>
            <NavBar />
            <Routes>
                {/* Generales*/}
                {/* Chequea si  el usuario esta logeado o no*/}
                <Route path="/login" element={!isUserLogged() ? <Login/> : <Navigate to="/home" />}>
                </Route>
                <Route path="/perfil" element={isAdminAppAuthenticated() ? <PerfilAdmin/> : <PerfilCliente/>}>
                </Route>

                {/* RUTAS SOLO PARA ADMIN_APP*/}
                {/* FUNCIONES DEL ADMIN_APP EN*/}
                <Route path="/panel-adminapp" element={isAdminAppAuthenticated() ? (<PanelAdminApp />) : (<Navigate to="/login" />) } >
                </Route>
                
                {/* Chequea si es ADMIN_APP para redirigirlo a la lista del Users*/}
                <Route path="/users" element={isAdminAppAuthenticated() ? (<ListUsers />) : (<Navigate to="/login" />) } >
                </Route>
                <Route path="/create-users" element={isAdminAppAuthenticated() ? (<CreateUser />) : (<Navigate to="/login" />) } >
                </Route>
                
                {/* Chequea si es ADMIN_APP para redirigirlo*/}
                <Route path="/cuentas-asc-desc" element={isAdminAppAuthenticated() ? (<Cuentas/>) : (<Navigate to="/login" />) } >
                </Route>
                <Route path="/add-admin" element={isAdminAppAuthenticated() ? (<CreateAmin />) : (<Navigate to="/login" />) } >
                </Route>
                <Route path="/create-cuenta" element={isAdminAppAuthenticated() ? (<CreateCuenta/>) : (<Navigate to="/login" />) } >
                </Route>
                
                {/* RUTAS SOLO PARA USUARIOS*/}
                {/* FUNCIONES DEL USUARIO AL LOGEARSE*/}
                <Route path="/home" element={isClienteAuthenticated() ? (<Home/>) : (<PanelAdminApp/>) } >
                </Route>
                <Route path="/transferencia" element={isClienteAuthenticated() ? (<HacerTransferencia/>) : (<Navigate to="/login" />) } >
                </Route>
                <Route path="/transacciones" element={isClienteAuthenticated() ? (<Transacciones/>) : (<Navigate to="/login" />) } >
                </Route>
                <Route path="/transaccion" element={isClienteAuthenticated() ? (<TablaTransaccionId/>) : (<Navigate to="/login" />) } >
                </Route>
                <Route path="/contactos" element={isClienteAuthenticated() ? (<Contactos/>) : (<Navigate to="/login" />) } >
                </Route>
                <Route path="/create-contactos" element={isClienteAuthenticated() ? (<CreateContacto/>) : (<Navigate to="/login" />) } >
                </Route>
            </Routes>
        </>
    )
}
