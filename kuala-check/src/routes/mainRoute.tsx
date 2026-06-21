import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home/home";
import Sobre from "../pages/sobre/sobre";
import Como_Funciona from "../pages/como-funciona/como-funciona";
import Login from "../pages/auth/login/login";
import Register from "../pages/auth/register/register";
import Dashboard from "../pages/dashboard/dashboard";
import Update from "../pages/update/update";
import Profile from "../pages/profile/profile";
import Checksession from "../services/check_session";
import Monitoring from "../pages/monitoring/monitoring";
import ControllerStatus from "../pages/controller_status/controller";

export default function Main() {
    return (
        <section className="main-container">
            <BrowserRouter>
                <Routes>

                    <Route path="/inicio" element={
                        <Checksession reffer="/home">
                            <Home />
                        </Checksession>
                    } />
                    <Route path="/sobre" element={<Sobre />} />
                    <Route path="/como-funciona" element={<Como_Funciona />} />

                    <Route path="/inicio/login" element={
                        <Checksession reffer="/login">
                            <Login />
                        </Checksession>
                    } />

                    <Route path="/inicio/registo" element={
                        <Checksession>
                            <Register />
                        </Checksession>
                    } />

                    <Route path="/inicio/conta" element={
                        <Checksession>
                            <Update />
                        </Checksession>
                    } />

                    <Route path="/inicio/dashboard" element={
                        <Checksession>
                            <Dashboard />
                        </Checksession>
                    } />

                    <Route path="/inicio/perfil" element={
                        <Checksession>
                            <Profile />
                        </Checksession>
                    } />
                    <Route path="/inicio/dashboard/monitoramento" element={
                        <Checksession>
                            <Monitoring />
                        </Checksession>
                    } />
                    <Route path="/inicio/dashboard/controle" element={
                        <Checksession>
                            <ControllerStatus />
                        </Checksession>
                    } />

                    <Route path="*" element={<Navigate to="/inicio" replace />} />
                </Routes>
            </BrowserRouter>
        </section>
    );
}