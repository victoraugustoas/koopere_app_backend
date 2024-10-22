# Koopere backend

## Descrição
Este é um projeto NestJS que visa aplicar os conhecimentos para a vaga de desenvolvedor React Native pleno.

### Features
 - Listagem de QR Codes
 - Cadastrar QR Code

## Instalação
Siga os passos abaixo para configurar localmente.

## Pré-requisitos
A versão do NodeJS utilizada neste projeto foi a v18.18.0.

## Iniciando projeto

1. Para iniciar a aplicação usando docker compose localmente, siga os passos abaixo
2. Crie um arquivo `.env` baseado no `.env.example`
```bash
cp .env.example .env
```
3. Execute a aplicação
```bash
docker compose up
```
4. Execute as migrations
```bash
docker compose exec app yarn migrations
```
5. A aplicação está pronta para responder

## Estrutura do Projeto
```bash
.
├── docker-compose.yaml
├── Dockerfile
├── src
│   ├── application
│   │   ├── common
│   │   │   ├── base                                            # Classes bases para DDD, tais como entity e value object
│   │   │   ├── types                                           # Tipos comuns que serão usados pela aplicação
│   │   │   └── utils
│   │   └── qrcode
│   │       ├── model                                           # Modelos de classe
│   │       ├── provider                                        # Interfaces externas para acesso a recursos
│   │       └── usecases                                        # Casos de uso da aplicação
│   ├── external                                                # Referente à camada externa no clean code, tais como http e banco de dados
│   │   └── modules
│   │       └── qrcode
│   │           ├── dtos                                        # DTOs para comunicação entre cliente/servidor
│   │           ├── provider                                    # Implementação de interfaces para acesso a recursos
│   │           │   └── MemoryQrCodeRepository.ts
│   │           ├── qrcode.controller.ts                        # Controlador que faz uso da camada de aplicação
│   └── main.ts                                                 # Arquivo principal para inicializar aplicação
```

## Considerações

### Melhorias
- Adicionar envio de logs no projeto
- Adicionar tratamento de erros provenientes da camada de aplicação
- Adicionar implementação de repositório para banco de dados

