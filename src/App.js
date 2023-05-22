import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import { Navbar, Homepage, Cryptocurrencies, News, CryptoDetails } from './components';
import './App.css';
import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
    width: 100%;
    max-width: 800px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

const Title = styled.h2``;

const App = () => {
    return (
        <>
            <div className="app">
                <div className="navbar">
                    <Navbar />
                </div>
                <div className="main">
                    <Container>
                        <Title>UTILIZADORES</Title>
                        <Form />
                        <Grid />
                    </Container>
                    <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
                    <GlobalStyle />
                    <Layout>
                        <div className="routes">
                            <Switch>
                                <Route exact path="/">
                                    <Homepage />
                                </Route>
                                <Route exact path="/cryptocurrencies">
                                    <Cryptocurrencies />
                                </Route>
                                <Route exact path="/crypto/:coinId">
                                    <CryptoDetails />
                                </Route>
                                <Route exact path="/news">
                                    <News />
                                </Route>
                            </Switch>
                        </div>
                    </Layout>
                    <div className="footer">
                        <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
                            Unicurrency <br />
                            Todos os direitos são reservados
                        </Typography.Title>
                        <Space>
                            <Link to="/">Página Inicial</Link>
                            <Link to="/exchanges">Trocas</Link>
                            <Link to="/news">Notícias</Link>
                        </Space>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App