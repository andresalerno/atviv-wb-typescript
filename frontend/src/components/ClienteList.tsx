import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Telefone {
  ddd: string;
  numero: string;
}

interface Endereco {
  cidade: string;
  estado: string;
  bairro: string;
  rua: string;
  numero: string;
  codigoPostal: string;
  informacoesAdicionais: string;
}

interface Cliente {
  id: number;
  nome: string;
  sobreNome: string;
  email?: string;
  endereco?: Endereco;
  telefones: Telefone[];
  links?: { rel: string; href: string }[];
}

const ClienteList: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [clienteExpandido, setClienteExpandido] = useState<number | null>(null); // Controle do cliente expandido
  const navigate = useNavigate();

  // Fetch Clientes
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get<Cliente[]>('http://localhost:32832/clientes', {
          validateStatus: (status) => status === 200 || status === 302,
        });
        if (response.data) {
          setClientes(response.data);
        } else {
          setError('Nenhum dado retornado pela API');
        }
      } catch (err) {
        setError('Erro ao carregar a lista de clientes');
        console.error(err);
      }
    };

    fetchClientes();
  }, []);

  const excluirCliente = async (id: number) => {
    const confirmacao = window.confirm('Tem certeza de que deseja excluir este cliente?');
    if (confirmacao) {
      try {
        await axios.delete(`http://localhost:32832/cliente/excluir/`, { data: { id } });
        setClientes(clientes.filter((cliente) => cliente.id !== id));
        alert('Cliente excluído com sucesso!');
      } catch (err) {
        alert('Erro ao excluir cliente. Verifique o servidor.');
        console.error(err);
      }
    }
  };

  const toggleExpandirCliente = (id: number) => {
    setClienteExpandido((prev) => (prev === id ? null : id)); // Alterna entre expandido/colapsado
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Lista de Clientes</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {clientes.length === 0 ? (
        <p className="text-center">Nenhum cliente cadastrado.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nome Completo</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <React.Fragment key={cliente.id}>
                  <tr>
                    <td>{cliente.id}</td>
                    <td>
                      {cliente.nome} {cliente.sobreNome}
                    </td>
                    <td>{cliente.email || 'Não informado'}</td>
                    <td>
                      <button
                        className="btn btn-info btn-sm me-2"
                        onClick={() => toggleExpandirCliente(cliente.id)}
                      >
                        {clienteExpandido === cliente.id ? 'Colapsar' : 'Expandir'}
                      </button>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => navigate(`/cliente/atualizar/${cliente.id}`)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => excluirCliente(cliente.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                  {clienteExpandido === cliente.id && (
                    <tr>
                      <td colSpan={4}>
                        <strong>Endereço Completo:</strong>{' '}
                        {cliente.endereco
                          ? `${cliente.endereco.rua}, ${cliente.endereco.numero}, ${cliente.endereco.bairro}, ${cliente.endereco.cidade} - ${cliente.endereco.estado}, CEP: ${cliente.endereco.codigoPostal}, ${cliente.endereco.informacoesAdicionais}`
                          : 'Não informado'}
                        <br />
                        <strong>Telefones:</strong>
                        <ul className="list-unstyled">
                          {cliente.telefones.map((telefone, index) => (
                            <li key={index}>
                              ({telefone.ddd}) {telefone.numero}
                            </li>
                          ))}
                        </ul>
                        <strong>Links Relacionados:</strong>
                        <ul className="list-unstyled">
                          {cliente.links
                            ?.filter((link) => link.rel !== 'self') // Filtra links como "self"
                            .map((link, index) => (
                              <li key={index}>
                                <a href={link.href} target="_blank" rel="noopener noreferrer">
                                  {link.rel}
                                </a>
                              </li>
                            )) || 'Nenhum link disponível'}
                        </ul>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClienteList;
