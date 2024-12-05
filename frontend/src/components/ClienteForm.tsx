import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

type Props = {
    tema?: string;
};

const ClienteForm: React.FC<Props> = ({ tema }) => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState({
        estado: '',
        cidade: '',
        bairro: '',
        rua: '',
        numero: '',
        codigoPostal: '',
        informacoesAdicionais: ''
    });
    const [telefoneDDD, setTelefoneDDD] = useState('');
    const [telefoneNumero, setTelefoneNumero] = useState('');
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchCliente = async () => {
                try {
                    const response = await axios.get(`http://localhost:32832/cliente/${id}`, {
                        validateStatus: (status) => status === 200 || status === 302
                    });
                    if (response.status === 200 || response.status === 302) {
                        const cliente = response.data;
                        setNome(cliente.nome || '');
                        setSobrenome(cliente.sobreNome || '');
                        setEmail(cliente.email || '');
                        setEndereco(cliente.endereco || {});
                        if (cliente.telefones && cliente.telefones.length > 0) {
                            setTelefoneDDD(cliente.telefones[0].ddd || '');
                            setTelefoneNumero(cliente.telefones[0].numero || '');
                        }
                    } else {
                        alert('Cliente não encontrado.');
                        navigate('/clientes');
                    }
                } catch (error) {
                    console.error('Erro ao carregar cliente:', error);
                    alert('Erro ao carregar os dados do cliente.');
                }
            };

            fetchCliente();
        }
    }, [id, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const cliente = {
            id,
            nome,
            sobreNome: sobrenome,
            email,
            endereco,
            telefones: [
                {
                    ddd: telefoneDDD,
                    numero: telefoneNumero
                }
            ],
            links: id
                ? [{ rel: 'self', href: `http://localhost:32832/cliente/${id}` }]
                : []
        };

        const url = id
            ? `http://localhost:32832/cliente/atualizar`
            : `http://localhost:32832/cliente/cadastrar`;
        const method = id ? 'put' : 'post';

        axios[method](url, cliente)
            .then((response) => {
                if (response.status === 200) {
                    alert(`Cliente ${id ? 'atualizado' : 'cadastrado'} com sucesso!`);
                    navigate('/clientes');
                } else {
                    alert(`Erro ao ${id ? 'atualizar' : 'cadastrar'} cliente.`);
                }
            })
            .catch((error) => {
                console.error(`Erro ao ${id ? 'atualizar' : 'cadastrar'} cliente:`, error);
                alert(`Erro ao ${id ? 'atualizar' : 'cadastrar'} cliente. Verifique os dados.`);
            });
    };

    const handleEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setEndereco((prevEndereco) => ({
            ...prevEndereco,
            [id]: value
        }));
    };

    return (
        <div className="container mt-5">
            <h2>{id ? 'Editar Cliente' : 'Cadastro de Cliente'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        className="form-control"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="sobrenome" className="form-label">Sobrenome:</label>
                    <input
                        type="text"
                        id="sobrenome"
                        className="form-control"
                        value={sobrenome}
                        onChange={(e) => setSobrenome(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">E-mail:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <h5>Endereço</h5>
                <div className="mb-3">
                    <label htmlFor="estado" className="form-label">Estado:</label>
                    <input
                        type="text"
                        id="estado"
                        className="form-control"
                        value={endereco.estado}
                        onChange={handleEnderecoChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cidade" className="form-label">Cidade:</label>
                    <input
                        type="text"
                        id="cidade"
                        className="form-control"
                        value={endereco.cidade}
                        onChange={handleEnderecoChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="bairro" className="form-label">Bairro:</label>
                    <input
                        type="text"
                        id="bairro"
                        className="form-control"
                        value={endereco.bairro}
                        onChange={handleEnderecoChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="rua" className="form-label">Rua:</label>
                    <input
                        type="text"
                        id="rua"
                        className="form-control"
                        value={endereco.rua}
                        onChange={handleEnderecoChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="numero" className="form-label">Número:</label>
                    <input
                        type="text"
                        id="numero"
                        className="form-control"
                        value={endereco.numero}
                        onChange={handleEnderecoChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="codigoPostal" className="form-label">CEP:</label>
                    <input
                        type="text"
                        id="codigoPostal"
                        className="form-control"
                        value={endereco.codigoPostal}
                        onChange={handleEnderecoChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="informacoesAdicionais" className="form-label">Informações Adicionais:</label>
                    <input
                        type="text"
                        id="informacoesAdicionais"
                        className="form-control"
                        value={endereco.informacoesAdicionais}
                        onChange={handleEnderecoChange}
                    />
                </div>
                <h5>Telefone</h5>
                <div className="mb-3">
                    <label htmlFor="telefoneDDD" className="form-label">DDD:</label>
                    <input
                        type="text"
                        id="telefoneDDD"
                        className="form-control"
                        value={telefoneDDD}
                        onChange={(e) => setTelefoneDDD(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="telefoneNumero" className="form-label">Telefone:</label>
                    <input
                        type="text"
                        id="telefoneNumero"
                        className="form-control"
                        value={telefoneNumero}
                        onChange={(e) => setTelefoneNumero(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">{id ? 'Salvar Alterações' : 'Cadastrar'}</button>
            </form>
        </div>
    );
};

export default ClienteForm;
