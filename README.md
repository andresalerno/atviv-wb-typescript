# Sistema de Gerenciamento do Grupo World Beauty

Objetivo: integração entre backend e frontend utilizando os conceitos de microserviços (JAVA)

Este sistema oferece diversas funcionalidades para gerenciar clientes, produtos, serviços e compras.


### Estrutura do Menu e Submenus

```java
Menu Principal
  ├── Gerenciar Clientes
  │     ├── Cadastrar Cliente a)
  │     ├── Listagem Clientes b)
  ├── Gerenciar Produtos #DESABILITADO
  │   
  ├── Gerenciar Serviços #DESABILITADO
  │
  └── Gerenciar Compras #DESABILITADO

  # como foi pedido apenas um CRUD de Clientes, esse pode ser feito a) e b)

```

### Instruções de Uso

1. Ao iniciar o sistema, escolha a opção desejada no menu principal.
2. Navegue pelos submenus para realizar ações específicas.
3. As listagens oferecem relatórios organizados para tomada de decisão.
4. Utilize as opções de edição e exclusão com cuidado, pois impactam os registros existentes.

Primeiro passa e dar o seguinte comando onde estiver o arquivo package.json

```bash
# execução do backend
./executavel/java -jar wbbackend.jar
```


```bash
# execução do frontend
./frontend/npm install

./frontend/npm start
```