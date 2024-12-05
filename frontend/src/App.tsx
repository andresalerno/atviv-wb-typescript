import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClienteForm from './components/ClienteForm';
import ClienteList from './components/ClienteList';
import HomePage from './components/Home';
import BarraNavegacao from './components/BarraNavegacao';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
    return (
        <Router>
            <BarraNavegacao
                                tema="navbar-dark bg-primary"
                                botoes={[
                                    {
                                        texto: 'Gerenciar Clientes',
                                        rota: '/clientes',
                                        icone: 'person',
                                        submenus: [
                                            { texto: 'Listar Todos os Clientes', rota: '/clientes/listar' },
                                            { texto: 'Top 10 Mais Consumiram', rota: '/clientes/top10-mais' },
                                            { texto: 'Top 10 Menos Consumiram', rota: '/clientes/top10-menos' },
                                            { texto: 'Top 5 Mais Consumiram em Valor', rota: '/clientes/top5-valor' },
                                            { texto: 'Listar por Gênero', rota: '/clientes/genero' }
                                        ]
                                    },
                                    {
                                        texto: 'Gerenciar Compras',
                                        rota: '/compras',
                                        icone: 'receipt',
                                        submenus: [
                                            { texto: 'Cadastrar Compra', rota: '/cadastrar-compra' },
                                            { texto: 'Listar Compras', rota: '/compras/listar' },
                                        ]
                                    },
                                    {
                                        texto: 'Gerenciar Produtos',
                                        rota: '/produtos',
                                        icone: 'shopping_cart',
                                        submenus: [
                                            { texto: 'Cadastrar Produto', rota: '/cadastrar-produto' },
                                            { texto: 'Listagem Produtos', rota: '/produtos' },
                                            { texto: 'Listar Produtos Mais Consumidos', rota: '/compras/produtos-mais-consumidos' },
                                            { texto: 'Listar Produtos Mais Consumidos por Gênero', rota: '/compras/produtos-mais-consumidos-genero' },
                                        ]
                                    },
                                    {
                                        texto: 'Gerenciar Serviços',
                                        rota: '/servicos',
                                        icone: 'build',
                                        submenus: [
                                            { texto: 'Cadastrar Serviço', rota: '/cadastrar-servico' },
                                            { texto: 'Listagem Serviços', rota: '/servicos' },
                                            { texto: 'Listar Serviços Mais Consumidos', rota: '/compras/servicos-mais-consumidos' },
                                            { texto: 'Listar Serviços Mais Consumidos por Gênero', rota: '/compras/servicos-por-genero'},
                                        ]
                                    }
                                ]}
            />      
            
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/clientes" element={<ClienteList />} />
                    <Route path="/cliente/cadastrar" element={<ClienteForm tema="light" />} />
                    <Route path="/cliente/atualizar/:id" element={<ClienteForm />} />
                    <Route path="/cliente/excluir/" element={<ClienteList />} />
                </Routes>

            
                
        </Router>
    );
};

export default App;
