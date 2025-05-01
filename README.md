# Portfólio de Dev

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Styled Components](https://img.shields.io/badge/Styled_Components-6.1.1-purple)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16.5-orange)

## 📋 Sobre o Projeto

Este é um portfólio profissional desenvolvido com React e Styled Components, apresentando minhas habilidades, projetos e experiências como desenvolvedor full stack. O site foi projetado para ser responsivo, interativo e visualmente atraente, utilizando animações modernas e uma interface de usuário intuitiva com tema escuro.

## ✨ Funcionalidades

- **Design Responsivo**: Adaptação perfeita para dispositivos móveis, tablets e desktops
- **Animações Interativas**: Utilizando Framer Motion para transições suaves e efeitos visuais ao rolar a página
- **Seções Completas**: Perfil, Sobre Mim, Stack Tecnológica, Certificações e Projetos
- **Navegação Intuitiva**: Menu de navegação com rolagem suave e indicadores de seção ativa
- **Tema Escuro**: Interface com tema escuro para melhor experiência visual
- **Filtros de Habilidades**: Sistema de busca e filtros para visualizar habilidades por categoria
- **Timeline Interativa**: Visualização cronológica de formação, certificados e experiência profissional

## Visualização das Seções

### Página Inicial
![Página Inicial](./src/assets/Captura%20de%20tela%202025-05-01%20004223.png)

## 🚀 Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces
- **Styled Components**: CSS-in-JS para estilização de componentes
- **Framer Motion**: Biblioteca para animações e transições
- **React Icons**: Conjunto de ícones para interface
- **Vite**: Ferramenta de build rápida para desenvolvimento

## 🛠️ Instalação e Uso

1. Clone o repositório:
```bash
git clone https://github.com/AugusttoDaniel/Portifolio-dev.git
```

2. Instale as dependências:
```bash
cd Portifolio-dev
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Para build de produção:
```bash
npm run build
```

## 📂 Estrutura do Projeto

```
Portifolio-dev/
├── public/
├── src/
│   ├── assets/           # Imagens e recursos estáticos
│   ├── components/       # Componentes reutilizáveis
│   │   ├── loadingspinner/     # Componente de carregamento
│   │   ├── scrollIndicator/    # Indicador de rolagem
│   │   ├── timeline/           # Componente de timeline
│   │   ├── typingText/         # Efeito de digitação
│   │   └── backgroundStar/     # Efeito de constelação
│   ├── mocks/            # Dados simulados para desenvolvimento
│   ├── pages/            # Páginas/seções do site
│   │   ├── abountme/           # Seção Sobre Mim
│   │   ├── certification/      # Seção de Certificações
│   │   ├── developerprofile/   # Perfil do Desenvolvedor
│   │   ├── mystacks/           # Stack Tecnológica
│   │   └── projects/           # Seção de Projetos
│   ├── styles/           # Estilos globais e tema
│   ├── App.jsx           # Componente principal
│   └── main.jsx          # Ponto de entrada
├── package.json
├── vite.config.js
└── README.md
```

## 🔍 Seções Principais

- **Perfil do Desenvolvedor**: Apresentação inicial com animação de digitação, links para redes sociais e indicador de disponibilidade para vagas
- **Sobre Mim**: Informações pessoais e profissionais com estatísticas animadas e botão para download de CV
- **Stack Tecnológica**: Habilidades técnicas com sistema de busca, filtros por categoria e paginação
- **Certificações**: Timeline interativa mostrando formação acadêmica, cursos e experiência profissional
- **Projetos**: Portfólio de trabalhos realizados com descrições, tecnologias utilizadas e links para demo e código

## 🌟 Recursos Especiais

- **Animações ao Rolar**: Elementos aparecem gradualmente à medida que o usuário rola a página
- **Efeito de Constelação**: Background interativo na seção inicial
- **Contador Animado**: Estatísticas com contagem animada na seção Sobre Mim
- **Efeito de Digitação**: Texto que simula digitação em tempo real
- **Cards Interativos**: Projetos e habilidades com efeitos hover
