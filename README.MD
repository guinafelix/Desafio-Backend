1. Rotas da Aplicação

    1. Rota Pública
        http://localhost:3000

    2. Rotas de usuário

        Cadastro de usuário.
            POST /api/user/signup
            (Necessário passar o object JSON do usuário a ser cadastrado no body da requisição)

        Login de usuário
            POST /api/user/signin - Após o login, é retornado um token de verificação.
            (Necessário passar o email e senha do usuário cadastrado no body da requisição)
    
        Retornar dados do usuário de forma privada
            POST /api/user/me - recebe o id de usuário na requisição e após validar o token, retorna as informações de cadastro.

        Resgatar usuário através do id
            GET /api/user/:id - Resgata um usário omitindo sua senha pelo seu id e confere a autorização através do token.


    3. Rotas para ordens de serviço

        obs: As rotas de serviço checam o token de verificação antes de realizar as respectivas ações.

        Criar ordem de serviço
            POST /api/service-order - Recebe na requisição as informações da ordem de serviço e do usuário solicitante.
            (Necessário passar o object JSON da ordem no body para que seja criada no banco de dados).

        Resgatar todas as ordens de serviço
            GET /api/service-order - Mostra todas as ordens de serviço criadas até o momento da requisição.

        
        Resgatar ordem de serviço por ID
            GET /api/service-order/:id  - Mostra os dados de uma única ordem de serviço através do seu id.

        Editar ordem de serviço
            PATCH /api/service-order/:id - Recebe na requisição os dados que devem ser editados na ordem de serviço.
            (Necessário passar o object JSON da ordem de serviço no body para que seja editada no banco de dados).

        Deletar Ordem de serviço
            DELETE /api/service-order/:id - Remove uma ordem de serviço do banco de dados.
        
2. Banco de Dados

    O MongoDB foi o banco de dados utilizado na aplicação.

  Modelos Criados:

    1. User: {
            name: String,
            email: String,
            password: String,
            adress: String,
            zipcode: Number,
            city: String,
            phone: Number,
        }

    2. ServiceOrder: {
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        typeOfOrder: String,
        date: String,
    }

3. Variáveis de ambiente
    
    Lista de variáveis utilizadas e sua descrição:

    1. MONGODB_URL = Define a url a ser utilizada para conectar ao banco de dados MongoDB.

    2. SECRET = Variável aleatória utilizada na construção do token de usuário.

    3. EMAIL_USER = Endereço de email que será utilizado para enviar os emails de atualização sobre ordens de serviços criadas, editadas ou removidas. (A conta não pode possuir verificação por duas etapas. Além disso, é necessário autorizar nas configurações da conta gmail a autorização de requisições "pouco seguras" pois não foi utilizado um email corporativo)

    4. USER_PASSWORD = senha da conta de email utilizada na varíavel *EMAIL_USER* 

4. Envio de email após requisições
    
    1. Na versão atual, a função transportadora envia o email sobre as atualizações de ordens de serviço para o endereço de email presente na varíavel de ambiente *EMAIL_USER*. Isto foi feito para facilitar a verificação dos dados presentes no corpo do email e de possíveis erros de envio. 

5. Funções úteis estão presentes nos arquivos checkToken.js e sendEmail.js

6. Como rodar o programa.

    Durante a implementação, foi utilizada a plataforma POSTMAN para possibilitar a manipulação das requisições.

    Para ter acesso a rotas de requisição é necessário passar o token recebido durante o Login.

    As rotas de edição precisam receber a ordem de serviço a ser editada em formado JSON. Para entender os modelos, basta checar os parâmetros escritos na seção *Banco de Dados*.

    Exemplo:
    
    Utilizar a rota PATCH /api/service-order/:id com os parâmetros abaixo no *BODY* da requisição irá editar a ordem referente ao id passado na URL: 
    
    1.
        {
            "user": {
                "_id": "***********",
                "name": "********",
                "email": "****************",
                "zipcode": 000000,
                "city": "******",
                "phone": 000,
                "__v": 0
            },
            "typeOfOrder": "(exemplo)",
            "date": "00/00/0000"
        }

    
