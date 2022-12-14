# Projeto final M6

## Como configurar o ambiente:

1) Variaveis de ambiente.env:<br>
   1) Renomear o arquivo:<br>
    Renomeie o arquivo `.env.exemple` para `.env`<br><br>

    2) Configure as variveis do ORM:  
        `DATABASE_URL="postgresql://USUARIO:SENHA@localhost:PORTA/DATABASE?schema=public"`

        USUARIO: Usuário de acesso ao postgres<br>
        SENHA: Senha de acesso<br>
        PORTA: Porta de acesso do postgres (padrão 5432)<br>
        DATABASE: Nome do Data Base criado<br><br>

    3) Configure a chave secreta para usuário administrador:
        `ADM_SECRET_KEY=`

        Chave secreta para criar usuário com poderes administrativos. Ao ser criada deve ser enviada na requisição do front.

2) Iniciando o projeto:
    
   1) Instalar bibliotecas:<br>
        Yarn: `yarn init -y`<br>
        npm: `npm init`<br>
    
    2) Criar Data Base:<br>
        `yarn db`<br>
        `npm db`
3) Importando as requisições no insominia:<br><br>
   Importe o arquivo `Insomnia-All_2022-12-12.json` para seu programa e verificar as configurações