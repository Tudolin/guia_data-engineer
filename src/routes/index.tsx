import { useState } from 'react'
import { useProgressStore } from '../store/progress'

// ─── Types ───────────────────────────────────────────────────────────────────

type ResourceType = 'Curso' | 'Tutorial' | 'Exercício' | 'Guia'

interface Resource {
  title: string
  provider: string
  type: ResourceType
  url: string
  description: string
  free: boolean
  duration?: string
}

interface Stage {
  id: number
  anchor: string
  emoji: string
  title: string
  subtitle: string
  color: string
  description: string
  resources: Resource[]
  tips: string[]
  codeSnippet?: { label: string; lines: Array<{ type: string; text: string }> }
}

interface Challenge {
  id: number
  title: string
  description: string
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado'
  category: 'SQL' | 'Python' | 'ETL' | 'Cloud'
  question: string
  hint: string
  solution: string
}

// ─── Data ────────────────────────────────────────────────────────────────────

const stages: Stage[] = [
  {
    id: 1,
    anchor: 'fundamentos',
    emoji: '⬡',
    title: 'Fundamentos Teóricos',
    subtitle: 'Entenda o campo antes de mergulhar no código',
    color: '--green',
    description:
      'Antes de qualquer linha de código, é essencial compreender o que é Engenharia de Dados, quais problemas ela resolve e como ela se encaixa no ecossistema de dados moderno. Aqui você também começa a construir sua base sólida em Python.',
    resources: [
      {
        title: 'Fundamentos de Engenharia de Dados',
        provider: 'Data Science Academy',
        type: 'Curso',
        url: 'https://www.datascienceacademy.com.br/cursosgratuitos',
        description:
          'Curso gratuito que cobre os conceitos fundamentais de Engenharia de Dados: pipelines, data warehouses, data lakes, ETL/ELT e o papel do engenheiro de dados.',
        free: true,
        duration: '~8h',
      },
      {
        title: 'Fundamentos de Linguagem Python — Do Básico a Aplicações de IA',
        provider: 'Data Science Academy',
        type: 'Curso',
        url: 'https://www.datascienceacademy.com.br/cursosgratuitos',
        description:
          'Introdução completa ao Python com foco em dados: variáveis, estruturas de controle, funções, módulos e primeiras aplicações práticas.',
        free: true,
        duration: '~15h',
      },
      {
        title: 'What is Data Engineering?',
        provider: 'Data Engineering Podcast',
        type: 'Guia',
        url: 'https://www.dataengineeringpodcast.com/',
        description: 'Podcast semanal sobre carreira, ferramentas e práticas em Engenharia de Dados.',
        free: true,
      },
      {
        title: 'The Data Engineering Cookbook',
        provider: 'Andreas Kretz',
        type: 'Guia',
        url: 'https://github.com/andkret/Cookbook',
        description: 'Guia completo com conceitos, arquiteturas e boas práticas em Engenharia de Dados.',
        free: true,
      },
    ],
    tips: [
      'Faça os dois cursos da DSA em paralelo — o contexto de Engenharia de Dados vai tornar o Python mais significativo.',
      'Crie uma conta no GitHub agora mesmo. Commit seu primeiro script Python, mesmo que pequeno.',
      'Acompanhe newsletters como "Data Engineering Weekly" para se manter atualizado.',
    ],
  },
  {
    id: 2,
    anchor: 'linguagens',
    emoji: '⬡',
    title: 'Python & SQL Essenciais',
    subtitle: 'As duas linguagens que todo engenheiro de dados precisa dominar',
    color: '--blue',
    description:
      'Python é a linguagem principal para pipelines e automações; SQL é a língua universal dos dados. Juntas, elas cobrem praticamente todo o dia a dia de um engenheiro de dados. Aprenda os dois com recursos de alta qualidade e pratique constantemente.',
    resources: [
      {
        title: 'Aprenda Python em Y Minutos',
        provider: 'Learn X in Y Minutes',
        type: 'Tutorial',
        url: 'https://learnxinyminutes.com/pt-br/python/',
        description:
          'Referência densa e rápida da sintaxe Python em português. Perfeito para revisão rápida ou para programadores que já conhecem outra linguagem.',
        free: true,
      },
      {
        title: 'Aprenda SQL em Y Minutos',
        provider: 'Learn X in Y Minutes',
        type: 'Tutorial',
        url: 'https://learnxinyminutes.com/pt-br/sql/',
        description:
          'Referência completa de SQL em português: SELECT, JOINs, agregações, subqueries, DDL e DML — tudo em uma única página.',
        free: true,
      },
      {
        title: 'Python Tutorial & Exercícios',
        provider: 'W3Schools',
        type: 'Exercício',
        url: 'https://www.w3schools.com/python/default.asp',
        description:
          'Tutorial interativo com centenas de exemplos práticos e exercícios com correção automática. Ideal para reforçar fundamentos.',
        free: true,
      },
      {
        title: 'SQL Exercises',
        provider: 'W3Schools',
        type: 'Exercício',
        url: 'https://www.w3schools.com/sql/sql_exercises.asp',
        description:
          'Exercícios de SQL com banco de dados real no navegador. Cobre SELECT, WHERE, GROUP BY, JOINs, funções de agregação e muito mais.',
        free: true,
      },
      {
        title: 'LeetCode Database',
        provider: 'LeetCode',
        type: 'Exercício',
        url: 'https://leetcode.com/problemset/database/',
        description: 'Centenas de desafios de SQL para praticar desde iniciante até avançado.',
        free: true,
      },
      {
        title: 'HackerRank Python',
        provider: 'HackerRank',
        type: 'Exercício',
        url: 'https://www.hackerrank.com/domains/python',
        description: 'Desafios de Python com níveis de dificuldade progressivos.',
        free: true,
      },
    ],
    tips: [
      'Dedique pelo menos 1h/dia praticando SQL. É a habilidade mais requisitada em entrevistas de Dados.',
      'No Python, foque em: listas, dicionários, compreensões, funções, leitura de arquivos CSV/JSON e a biblioteca requests.',
      'Instale o DBeaver (gratuito) para praticar SQL localmente com SQLite ou PostgreSQL.',
      'Pratique no LeetCode e HackerRank diariamente.',
    ],
    codeSnippet: {
      label: 'Python + SQL no dia a dia',
      lines: [
        { type: 'comment', text: '# Padrão básico: Python conectando a um banco SQL' },
        { type: 'keyword', text: 'import' },
        { type: 'var', text: ' sqlite3' },
        { type: 'normal', text: ', ' },
        { type: 'var', text: 'pandas' },
        { type: 'keyword', text: ' as' },
        { type: 'var', text: ' pd' },
        { type: 'normal', text: '\n' },
        { type: 'normal', text: '\nconn = ' },
        { type: 'func', text: 'sqlite3.connect' },
        { type: 'normal', text: '(' },
        { type: 'string', text: '"vendas.db"' },
        { type: 'normal', text: ')' },
        { type: 'normal', text: '\ndf = ' },
        { type: 'var', text: 'pd' },
        { type: 'normal', text: '.' },
        { type: 'func', text: 'read_sql' },
        { type: 'normal', text: '(' },
        { type: 'string', text: '"SELECT * FROM pedidos WHERE valor > 100"' },
        { type: 'normal', text: ', conn)' },
        { type: 'normal', text: '\n' },
        { type: 'func', text: 'print' },
        { type: 'normal', text: '(df.' },
        { type: 'func', text: 'describe' },
        { type: 'normal', text: '())' },
      ],
    },
  },
  {
    id: 3,
    anchor: 'cloud',
    emoji: '⬡',
    title: 'Cloud Computing',
    subtitle: 'A infraestrutura moderna de dados vive na nuvem',
    color: '--purple',
    description:
      'Engenharia de Dados moderna é inseparável de cloud. Comece pelo Google Cloud Platform (GCP) — tem excelente material gratuito e certificação reconhecida. Mas lembre: AWS e Azure dominam o mercado e os serviços são altamente equivalentes. Aprenda um bem e você entenderá os outros.',
    resources: [
      {
        title: 'Getting Started with Google Cloud Learning Path',
        provider: 'Google Cloud Skills Boost',
        type: 'Curso',
        url: 'https://www.skills.google/paths/8',
        description:
          'Trilha oficial do Google para iniciantes em cloud. Cobre fundamentos de GCP, IAM, Compute Engine, Cloud Storage e serviços essenciais.',
        free: true,
        duration: '~20h',
      },
      {
        title: 'Professional Data Engineer Learning Path',
        provider: 'Google Cloud Skills Boost',
        type: 'Curso',
        url: 'https://www.skills.google/paths/16',
        description:
          'Preparação para a certificação Professional Data Engineer. Cobre BigQuery, Dataflow, Pub/Sub, Dataproc, Cloud Composer e arquiteturas de dados.',
        free: true,
        duration: '~60h',
      },
      {
        title: 'AWS Cloud Practitioner Essentials',
        provider: 'Amazon Web Services',
        type: 'Curso',
        url: 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/',
        description: 'Curso gratuito que cobre os fundamentos da AWS, ideal para iniciantes.',
        free: true,
        duration: '~6h',
      },
      {
        title: 'Microsoft Azure Fundamentals (AZ-900)',
        provider: 'Microsoft Learn',
        type: 'Curso',
        url: 'https://learn.microsoft.com/pt-br/training/paths/az-900-describe-cloud-concepts/',
        description: 'Trilha gratuita para aprender os conceitos fundamentais do Azure.',
        free: true,
        duration: '~8h',
      },
    ],
    tips: [
      'Os primeiros 90 dias no GCP Free Tier são generosos — crie projetos reais para praticar.',
      'Foque em BigQuery primeiro: é o produto de dados mais popular do mercado e tem 1TB de queries gratuitas/mês.',
      'AWS tem o "AWS Cloud Practitioner Essentials" gratuito; Azure tem o "AZ-900 fundamentals" — ambos excelentes como complemento.',
      'Crie uma conta gratuita em cada cloud para explorar os serviços.',
    ],
  },
  {
    id: 4,
    anchor: 'pratica',
    emoji: '⬡',
    title: 'Engenharia na Prática',
    subtitle: 'Pipelines reais com Python: APIs, scraping, ETL e orquestração',
    color: '--orange',
    description:
      'Aqui a teoria vira código. Um engenheiro de dados coleta dados de diversas fontes, transforma e entrega para análise. Você aprenderá a consumir APIs REST, fazer web scraping, construir pipelines ETL/ELT e começar a orquestrar tarefas.',
    resources: [
      {
        title: 'Requests: HTTP for Humans',
        provider: 'Documentação Oficial',
        type: 'Tutorial',
        url: 'https://requests.readthedocs.io/en/latest/',
        description:
          'A biblioteca padrão para consumir APIs REST em Python. Aprenda GET, POST, autenticação, paginação e tratamento de erros.',
        free: true,
      },
      {
        title: 'Beautiful Soup Documentation',
        provider: 'Crummy.com',
        type: 'Tutorial',
        url: 'https://www.crummy.com/software/BeautifulSoup/bs4/doc/',
        description:
          'Web scraping com Python. Aprenda a extrair dados estruturados de páginas HTML usando seletores CSS e navegação na árvore DOM.',
        free: true,
      },
      {
        title: 'Pandas User Guide',
        provider: 'pandas.pydata.org',
        type: 'Tutorial',
        url: 'https://pandas.pydata.org/docs/user_guide/index.html',
        description:
          'Guia oficial do pandas para transformação e análise de dados. Essencial para o T do ETL: limpeza, merge, pivot, agrupamento e exportação.',
        free: true,
      },
      {
        title: 'Apache Airflow — Tutorial',
        provider: 'Apache Foundation',
        type: 'Tutorial',
        url: 'https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html',
        description:
          'Introdução à orquestração de pipelines de dados com Airflow. Aprenda DAGs, Operators, schedulers e como automatizar fluxos complexos.',
        free: true,
      },
      {
        title: 'dbt (data build tool) — Tutorial',
        provider: 'dbt Labs',
        type: 'Tutorial',
        url: 'https://docs.getdbt.com/docs/introduction',
        description: 'Transformação de dados com SQL declarativo. Padrão de mercado para ELT moderno.',
        free: true,
      },
    ],
    tips: [
      'Crie um projeto prático: colete dados de uma API pública (clima, moedas, criptos), salve em CSV, depois em Postgres e visualize.',
      'Scraping ético: sempre leia o robots.txt do site e adicione delays entre requisições.',
      'Para ETL mais robusto, explore dbt (data build tool) — padrão de mercado para transformações SQL declarativas.',
      'Versionamento de dados: aprenda a usar dbt para versionar suas transformações.',
    ],
    codeSnippet: {
      label: 'Pipeline completo: API → transformação → banco',
      lines: [
        { type: 'keyword', text: 'import' },
        { type: 'var', text: ' requests' },
        { type: 'normal', text: ', ' },
        { type: 'var', text: 'pandas' },
        { type: 'keyword', text: ' as' },
        { type: 'var', text: ' pd' },
        { type: 'normal', text: '\n' },
        { type: 'keyword', text: 'from' },
        { type: 'var', text: ' sqlalchemy' },
        { type: 'keyword', text: ' import' },
        { type: 'func', text: ' create_engine' },
        { type: 'normal', text: '\n\n' },
        { type: 'comment', text: '# 1. Extract — consumir API REST' },
        { type: 'normal', text: '\nresp = ' },
        { type: 'var', text: 'requests' },
        { type: 'normal', text: '.' },
        { type: 'func', text: 'get' },
        { type: 'normal', text: '(' },
        { type: 'string', text: '"https://api.exchangerate.host/latest"' },
        { type: 'normal', text: ')\n' },
        { type: 'var', text: 'dados' },
        { type: 'normal', text: ' = resp.' },
        { type: 'func', text: 'json' },
        { type: 'normal', text: '()[' },
        { type: 'string', text: '"rates"' },
        { type: 'normal', text: ']\n\n' },
        { type: 'comment', text: '# 2. Transform — normalizar e limpar' },
        { type: 'normal', text: '\ndf = ' },
        { type: 'var', text: 'pd' },
        { type: 'normal', text: '.' },
        { type: 'func', text: 'DataFrame' },
        { type: 'normal', text: '(' },
        { type: 'var', text: 'dados' },
        { type: 'normal', text: '.items(), columns=[' },
        { type: 'string', text: '"moeda"' },
        { type: 'normal', text: ', ' },
        { type: 'string', text: '"taxa"' },
        { type: 'normal', text: '])\n\n' },
        { type: 'comment', text: '# 3. Load — persistir no banco' },
        { type: 'normal', text: '\nengine = ' },
        { type: 'func', text: 'create_engine' },
        { type: 'normal', text: '(' },
        { type: 'string', text: '"postgresql://user:pwd@localhost/dados"' },
        { type: 'normal', text: ')\n' },
        { type: 'var', text: 'df' },
        { type: 'normal', text: '.' },
        { type: 'func', text: 'to_sql' },
        { type: 'normal', text: '(' },
        { type: 'string', text: '"cotacoes"' },
        { type: 'normal', text: ', engine, if_exists=' },
        { type: 'string', text: '"replace"' },
        { type: 'normal', text: ')' },
      ],
    },
  },
  {
    id: 5,
    anchor: 'avancado',
    emoji: '⬡',
    title: 'Especialização Profissional',
    subtitle: 'Certificação, streaming e arquiteturas de dados avançadas',
    color: '--rose',
    description:
      'Com os fundamentos consolidados, é hora de aprofundar em tópicos avançados e conquistar reconhecimento de mercado. A certificação Professional Data Engineer do Google é uma das mais valorizadas do setor.',
    resources: [
      {
        title: 'Professional Data Engineer Certification',
        provider: 'Google Cloud',
        type: 'Curso',
        url: 'https://cloud.google.com/learn/certification/data-engineer',
        description:
          'Certificação oficial do Google Cloud para Engenheiros de Dados. Valida conhecimentos em BigQuery, Dataflow, Pub/Sub, arquiteturas de dados e Machine Learning na nuvem.',
        free: false,
        duration: 'Prep: ~60h',
      },
      {
        title: 'Apache Kafka — Getting Started',
        provider: 'Confluent',
        type: 'Tutorial',
        url: 'https://developer.confluent.io/get-started/python/',
        description:
          'Introdução a streaming de dados com Kafka em Python. Aprenda producers, consumers, topics e processamento de eventos em tempo real.',
        free: true,
      },
      {
        title: 'dbt (data build tool) — Tutorial',
        provider: 'dbt Labs',
        type: 'Tutorial',
        url: 'https://docs.getdbt.com/docs/introduction',
        description:
          'Transformação de dados com SQL declarativo. dbt é padrão de mercado para a camada T do ELT moderno — essencial para times de dados.',
        free: true,
      },
      {
        title: 'The Data Engineering Cookbook',
        provider: 'Andreas Kretz',
        type: 'Guia',
        url: 'https://github.com/andkret/Cookbook',
        description:
          'Guia gratuito e abrangente com arquiteturas, tecnologias e conceitos avançados de Engenharia de Dados. Excelente para ter visão sistêmica.',
        free: true,
      },
      {
        title: 'Data Engineering with dbt',
        provider: 'Coalesce 2024',
        type: 'Curso',
        url: 'https://www.getdbt.com/coalesce-2024',
        description: 'Conferência anual com as melhores práticas e novidades em dbt.',
        free: true,
      },
    ],
    tips: [
      'A certificação GCP Professional Data Engineer custa ~$200 USD — mas o estudo para ela cobre praticamente tudo que você precisa saber.',
      'Streaming vs Batch: entenda quando usar cada um. Kafka/Pub/Sub para eventos em tempo real; Airflow para pipelines agendados.',
      'Contribua para projetos open source relacionados a dados — é a melhor forma de construir portfólio.',
      'Mantenha um blog ou portfolio documentando seus projetos de dados.',
    ],
  },
]

// ─── Challenges Data ─────────────────────────────────────────────────────────

const challenges: Challenge[] = [
  {
    id: 1,
    title: 'Encontre os Clientes com Mais Compras',
    description: 'Dada uma tabela de pedidos, encontre os top 5 clientes que mais gastaram.',
    difficulty: 'Iniciante',
    category: 'SQL',
    question: `-- Tabela: pedidos (id, cliente_id, valor, data)
-- Tarefa: Liste os top 5 clientes que mais gastaram no total
-- Colunas esperadas: cliente_id, total_gasto

SELECT cliente_id, SUM(valor) as total_gasto
FROM pedidos
GROUP BY cliente_id
ORDER BY total_gasto DESC
LIMIT 5;`,
    hint: 'Use SUM para somar os valores e GROUP BY para agrupar por cliente.',
    solution: 'SELECT cliente_id, SUM(valor) as total_gasto FROM pedidos GROUP BY cliente_id ORDER BY total_gasto DESC LIMIT 5;'
  },
  {
    id: 2,
    title: 'Média Móvel de Vendas',
    description: 'Calcule a média móvel de 7 dias das vendas diárias.',
    difficulty: 'Intermediário',
    category: 'SQL',
    question: `-- Tabela: vendas (data, valor)
-- Tarefa: Calcule a média móvel de 7 dias para cada data
-- Colunas esperadas: data, valor, media_7_dias

SELECT 
    data,
    valor,
    AVG(valor) OVER (
        ORDER BY data 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as media_7_dias
FROM vendas
ORDER BY data;`,
    hint: 'Use Window Functions com AVG OVER e ROWS BETWEEN.',
    solution: 'SELECT data, valor, AVG(valor) OVER (ORDER BY data ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) as media_7_dias FROM vendas ORDER BY data;'
  },
  {
    id: 3,
    title: 'Funcionários com Salário Acima da Média do Departamento',
    description: 'Encontre funcionários que ganham mais que a média do seu departamento.',
    difficulty: 'Intermediário',
    category: 'SQL',
    question: `-- Tabelas: funcionarios (id, nome, salario, dept_id)
-- Tabelas: departamentos (id, nome)
-- Tarefa: Liste funcionários com salário acima da média do seu departamento

SELECT f.nome, f.salario, d.nome as departamento
FROM funcionarios f
JOIN departamentos d ON f.dept_id = d.id
WHERE f.salario > (
    SELECT AVG(salario)
    FROM funcionarios f2
    WHERE f2.dept_id = f.dept_id
);`,
    hint: 'Use uma subquery para calcular a média do departamento.',
    solution: 'SELECT f.nome, f.salario, d.nome as departamento FROM funcionarios f JOIN departamentos d ON f.dept_id = d.id WHERE f.salario > (SELECT AVG(salario) FROM funcionarios f2 WHERE f2.dept_id = f.dept_id);'
  },
  {
    id: 4,
    title: 'Validação de CPF',
    description: 'Crie uma função que valide se um CPF é válido (incluindo dígitos verificadores).',
    difficulty: 'Intermediário',
    category: 'Python',
    question: `def validar_cpf(cpf: str) -> bool:
    """
    Valida um CPF brasileiro.
    
    Args:
        cpf: String com o CPF (pode conter pontos e traço)
    
    Returns:
        True se CPF válido, False caso contrário
    """
    # Seu código aqui
    pass`,
    hint: 'Remova pontuação, verifique se tem 11 dígitos, calcule os dois dígitos verificadores.',
    solution: `def validar_cpf(cpf: str) -> bool:
    cpf = ''.join(filter(str.isdigit, cpf))
    if len(cpf) != 11 or len(set(cpf)) == 1:
        return False
    
    # Primeiro dígito
    soma = sum(int(cpf[i]) * (10 - i) for i in range(9))
    digito1 = 11 - (soma % 11)
    if digito1 >= 10:
        digito1 = 0
    
    # Segundo dígito
    soma = sum(int(cpf[i]) * (11 - i) for i in range(10))
    digito2 = 11 - (soma % 11)
    if digito2 >= 10:
        digito2 = 0
    
    return digito1 == int(cpf[9]) and digito2 == int(cpf[10])`
  },
  {
    id: 5,
    title: 'Análise de Logs de Servidor',
    description: 'Processe um arquivo de log e extraia estatísticas de requisições.',
    difficulty: 'Avançado',
    category: 'Python',
    question: `import re
from collections import Counter
from datetime import datetime

def analisar_log(conteudo: str) -> dict:
    """
    Analisa logs no formato comum: "IP - - [DATA] "METODO /PATH HTTP/1.1" STATUS BYTES"
    
    Retorna um dicionário com:
    - total_requests: número total
    - status_mais_comum: código HTTP mais frequente
    - endpoint_mais_acessado: path mais requisitado
    - requests_por_hora: dicionário com hora -> contagem
    """
    # Seu código aqui
    pass`,
    hint: 'Use regex para extrair os campos: r\'(\\d+\\.\\d+\\.\\d+\\.\\d+).*?\\[(.*?)\\].*?"(.*?)".*?(\\d+)\'',
    solution: `def analisar_log(conteudo: str) -> dict:
    logs = conteudo.strip().split('\\n')
    pattern = r'(\\d+\\.\\d+\\.\\d+\\.\\d+).*?\\[(.*?)\\].*?"(.*?)".*?(\\d+)'
    
    total = len(logs)
    status_counter = Counter()
    endpoint_counter = Counter()
    hora_counter = Counter()
    
    for log in logs:
        match = re.search(pattern, log)
        if match:
            status = match.group(4)
            request = match.group(3)
            endpoint = request.split()[1] if request else '/'
            data = match.group(2)
            hora = datetime.strptime(data, '%d/%b/%Y:%H:%M:%S %z').hour
            
            status_counter[status] += 1
            endpoint_counter[endpoint] += 1
            hora_counter[hora] += 1
    
    return {
        'total_requests': total,
        'status_mais_comum': status_counter.most_common(1)[0][0],
        'endpoint_mais_acessado': endpoint_counter.most_common(1)[0][0],
        'requests_por_hora': dict(hora_counter)
    }`
  },
  {
    id: 6,
    title: 'ETL de API de Moedas',
    description: 'Extraia dados de uma API, transforme e carregue em um formato estruturado.',
    difficulty: 'Avançado',
    category: 'ETL',
    question: `import requests
import pandas as pd

def etl_moedas():
    """
    Extrai dados de https://api.exchangerate.host/latest
    Transforma em DataFrame com moeda e taxa
    Salva em CSV e retorna o DataFrame
    """
    # Seu código aqui
    pass`,
    hint: 'Use requests.get(), depois json() para extrair os rates, crie DataFrame com pandas.',
    solution: `def etl_moedas():
    # Extract
    response = requests.get('https://api.exchangerate.host/latest')
    data = response.json()
    
    # Transform
    rates = data['rates']
    df = pd.DataFrame(list(rates.items()), columns=['moeda', 'taxa'])
    df['timestamp'] = data['date']
    
    # Load
    df.to_csv('cotacoes.csv', index=False)
    return df`
  },
  {
    id: 7,
    title: 'Tratamento de Dados Faltantes',
    description: 'Implemente diferentes estratégias para lidar com valores nulos.',
    difficulty: 'Intermediário',
    category: 'ETL',
    question: `import pandas as pd
import numpy as np

def tratar_nulos(df: pd.DataFrame, estrategia: str) -> pd.DataFrame:
    """
    Aplica diferentes estratégias para valores nulos.
    
    Args:
        df: DataFrame com valores nulos
        estrategia: 'remover', 'media', 'mediana', 'forward_fill'
    
    Returns:
        DataFrame tratado
    """
    # Seu código aqui
    pass`,
    hint: 'Use dropna(), fillna() com diferentes métodos.',
    solution: `def tratar_nulos(df: pd.DataFrame, estrategia: str) -> pd.DataFrame:
    df = df.copy()
    
    if estrategia == 'remover':
        return df.dropna()
    elif estrategia == 'media':
        return df.fillna(df.mean())
    elif estrategia == 'mediana':
        return df.fillna(df.median())
    elif estrategia == 'forward_fill':
        return df.fillna(method='ffill')
    return df`
  },
  {
    id: 8,
    title: 'Query Otimizada no BigQuery',
    description: 'Otimize uma query ineficiente que está consumindo muitos recursos.',
    difficulty: 'Avançado',
    category: 'Cloud',
    question: `-- Query ineficiente (melhore-a)
SELECT * FROM tabela_gigante t1
JOIN tabela_gigante t2 ON t1.id = t2.id
WHERE t1.data BETWEEN '2024-01-01' AND '2024-12-31'
AND t2.status IN ('ativo', 'pendente')
AND t1.valor > (SELECT AVG(valor) FROM tabela_gigante)

-- Dicas: Use particionamento, clustering, e reduza dados antes do JOIN`,
    hint: 'Filtre os dados antes do JOIN, use PARTITION BY, evite subqueries desnecessárias.',
    solution: `WITH dados_filtrados AS (
    SELECT * FROM tabela_gigante
    WHERE data BETWEEN '2024-01-01' AND '2024-12-31'
    AND valor > (SELECT AVG(valor) FROM tabela_gigante)
)
SELECT * FROM dados_filtrados t1
JOIN dados_filtrados t2 ON t1.id = t2.id
WHERE t2.status IN ('ativo', 'pendente')`
  }
]

// ─── Cloud Comparison Data ────────────────────────────────────────────────────

const cloudServices = [
  { category: 'Armazenamento de Objetos', gcp: 'Cloud Storage (GCS)', aws: 'Amazon S3', azure: 'Azure Blob Storage' },
  { category: 'Data Warehouse', gcp: 'BigQuery', aws: 'Amazon Redshift', azure: 'Azure Synapse Analytics' },
  { category: 'Processamento de Dados', gcp: 'Dataflow (Apache Beam)', aws: 'AWS Glue', azure: 'Azure Data Factory' },
  { category: 'Mensageria / Streaming', gcp: 'Pub/Sub', aws: 'Amazon Kinesis', azure: 'Azure Event Hubs' },
  { category: 'Orquestração (Airflow)', gcp: 'Cloud Composer', aws: 'Amazon MWAA', azure: 'Azure Managed Airflow' },
  { category: 'Spark Gerenciado', gcp: 'Dataproc', aws: 'Amazon EMR', azure: 'Azure HDInsight' },
  { category: 'Banco Relacional Gerenciado', gcp: 'Cloud SQL', aws: 'Amazon RDS', azure: 'Azure SQL Database' },
  { category: 'Banco NoSQL', gcp: 'Bigtable / Firestore', aws: 'DynamoDB', azure: 'Azure Cosmos DB' },
  { category: 'Notebooks / IA', gcp: 'Vertex AI Workbench', aws: 'SageMaker Studio', azure: 'Azure ML Studio' },
  { category: 'Monitoramento', gcp: 'Cloud Monitoring', aws: 'CloudWatch', azure: 'Azure Monitor' },
]

// ─── Components ───────────────────────────────────────────────────────────────

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function ResourceCard({ resource, stageColor }: { resource: Resource; stageColor: string }) {
  const tagClass = {
    Curso: 'tag-course',
    Tutorial: 'tag-tutorial',
    Exercício: 'tag-exercise',
    Guia: 'tag-guide',
  }[resource.type]

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="resource-card"
      style={{ '--stage-color': `var(${stageColor})`, '--stage-glow': `var(${stageColor.replace('--', '--') + '-glow'.replace('--green-glow', '--green-glow')})` } as React.CSSProperties}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
          <span className={`tag ${tagClass}`}>{resource.type}</span>
          {resource.free && <span className="tag tag-free">Gratuito</span>}
          {resource.duration && (
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'JetBrains Mono', letterSpacing: '0.05em' }}>
              {resource.duration}
            </span>
          )}
        </div>
        <span style={{ color: `var(${stageColor})`, opacity: 0.7, flexShrink: 0, marginTop: 2 }}>
          <ExternalLinkIcon />
        </span>
      </div>

      <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 4, color: 'var(--text)', lineHeight: 1.4 }}>
        {resource.title}
      </div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'JetBrains Mono', marginBottom: 8 }}>
        {resource.provider}
      </div>
      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        {resource.description}
      </div>
    </a>
  )
}

function CodeSnippet({ snippet }: { snippet: NonNullable<Stage['codeSnippet']> }) {
  const colorMap: Record<string, string> = {
    comment: 'var(--text-dim)',
    keyword: 'var(--purple)',
    string: 'var(--green)',
    func: 'var(--blue)',
    var: 'var(--orange)',
    normal: 'var(--text)',
  }

  const raw = snippet.lines.map(l => l.text).join('')
  const lineCount = raw.split('\n').length

  return (
    <div style={{ marginTop: 24 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '8px 20px',
        background: 'var(--surface3)',
        border: '1px solid var(--border)',
        borderBottom: 'none',
        borderRadius: '8px 8px 0 0',
        fontSize: '0.72rem',
        fontFamily: 'JetBrains Mono',
        color: 'var(--text-muted)',
      }}>
        <span>{snippet.label}</span>
        <span style={{ color: 'var(--text-dim)' }}>{lineCount} linhas</span>
      </div>
      <div className="code-block" style={{ borderRadius: '0 0 8px 8px', borderTop: 'none' }}>
        {snippet.lines.map((l, i) => (
          <span key={i} style={{ color: colorMap[l.type] || 'var(--text)' }}>
            {l.text}
          </span>
        ))}
      </div>
    </div>
  )
}

function StageSection({ stage, index }: { stage: Stage; index: number }) {
  const [open, setOpen] = useState(false)
  const colorVar = stage.color

  return (
    <section
      id={stage.anchor}
      className={`stage-${stage.id} animate-in`}
      style={{ animationDelay: `${0.1 * (index + 1)}s`, display: 'flex', gap: 0, alignItems: 'flex-start' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 56, flexShrink: 0 }}>
        <div className="stage-dot">
          {String(stage.id).padStart(2, '0')}
        </div>
        <div style={{
          width: 2,
          flex: 1,
          minHeight: 40,
          background: `linear-gradient(to bottom, var(${colorVar}), transparent)`,
          opacity: 0.3,
          marginTop: 4,
        }} />
      </div>

      <div style={{ flex: 1, paddingLeft: 24, paddingBottom: 56 }}>
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            overflow: 'hidden',
            transition: 'border-color 0.3s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.borderColor = `var(${colorVar})`
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'
          }}
        >
          <button
            onClick={() => setOpen(!open)}
            style={{
              width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              gap: 16, padding: '28px 32px', cursor: 'pointer', background: 'transparent',
              border: 'none', color: 'inherit', textAlign: 'left',
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span style={{
                  fontFamily: 'JetBrains Mono', fontSize: '0.7rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: `var(${colorVar})`,
                }}>
                  Etapa {String(stage.id).padStart(2, '0')}
                </span>
                <span style={{
                  width: 4, height: 4, borderRadius: '50%',
                  background: `var(${colorVar})`, opacity: 0.5,
                }} />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'JetBrains Mono' }}>
                  {stage.resources.length} recursos
                </span>
              </div>
              <h2 style={{
                fontFamily: 'Syne', fontWeight: 700, fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                color: 'var(--text)', margin: '0 0 6px',
              }}>
                {stage.title}
              </h2>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                {stage.subtitle}
              </p>
            </div>
            <div style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: 4 }}>
              <ChevronIcon open={open} />
            </div>
          </button>

          {open && (
            <div style={{ padding: '0 32px 32px', borderTop: '1px solid var(--border)' }}>
              <p style={{
                margin: '24px 0 24px',
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                maxWidth: '72ch',
              }}>
                {stage.description}
              </p>

              <h3 style={{
                fontFamily: 'JetBrains Mono', fontSize: '0.72rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--text-dim)', margin: '0 0 14px',
              }}>
                Recursos Recomendados
              </h3>
              <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', marginBottom: 28 }}>
                {stage.resources.map((r, i) => (
                  <ResourceCard key={i} resource={r} stageColor={colorVar} />
                ))}
              </div>

              <h3 style={{
                fontFamily: 'JetBrains Mono', fontSize: '0.72rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--text-dim)', margin: '0 0 12px',
              }}>
                Dicas Práticas
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: stage.codeSnippet ? 0 : 0 }}>
                {stage.tips.map((tip, i) => (
                  <div key={i} className="tip-box">
                    {tip}
                  </div>
                ))}
              </div>

              {stage.codeSnippet && <CodeSnippet snippet={stage.codeSnippet} />}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function CloudComparisonSection() {
  return (
    <section id="clouds" style={{ marginTop: 80, marginBottom: 80 }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
        <div className="animate-in" style={{ marginBottom: 40, textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16,
            padding: '6px 16px', borderRadius: 999, background: 'var(--gold-glow-sm)',
            border: '1px solid rgba(201, 137, 58, 0.2)',
          }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Guia de Clouds
            </span>
          </div>
          <h2 style={{
            fontFamily: 'Syne', fontWeight: 800,
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            color: 'var(--text)', margin: '0 0 12px',
          }}>
            GCP, AWS e Azure: Qual Escolher?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '60ch', margin: '0 auto', lineHeight: 1.7 }}>
            Os três grandes provedores de cloud oferecem serviços equivalentes. Dominar um significa entender a lógica dos outros — o que muda é a nomenclatura e algumas particularidades de implementação.
          </p>
        </div>

        <div style={{
          display: 'grid', gap: 16,
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          marginBottom: 40,
        }}>
          {[
            {
              name: 'Google Cloud Platform',
              abbr: 'GCP',
              color: 'var(--blue)',
              glow: 'var(--blue-glow)',
              highlights: ['BigQuery é imbatível para analytics', 'Melhor integração com Kubernetes (GKE)', 'Cloud Composer (Airflow gerenciado)', 'Vertex AI para ML/IA'],
              verdict: 'Melhor ponto de partida para Engenharia de Dados'
            },
            {
              name: 'Amazon Web Services',
              abbr: 'AWS',
              color: 'var(--orange)',
              glow: 'var(--orange-glow)',
              highlights: ['Maior market share do mercado', 'S3 é o padrão de armazenamento na nuvem', 'Ecossistema mais amplo de serviços', 'Redshift consolidado no mercado'],
              verdict: 'Maior demanda de mercado — vale investir depois do GCP'
            },
            {
              name: 'Microsoft Azure',
              abbr: 'AZURE',
              color: 'var(--purple)',
              glow: 'var(--purple-glow)',
              highlights: ['Dominante em empresas com stack Microsoft', 'Synapse Analytics integrado ao Power BI', 'Azure DevOps para pipelines de dados', 'Active Directory para auth corporativa'],
              verdict: 'Essencial para trabalhar com grandes corporações'
            },
          ].map((cloud) => (
            <div key={cloud.abbr} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 16, padding: 24,
              borderTop: `3px solid ${cloud.color}`,
              transition: 'box-shadow 0.3s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px ${cloud.glow}` }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none' }}
            >
              <div style={{
                fontFamily: 'JetBrains Mono', fontSize: '0.65rem', letterSpacing: '0.15em',
                color: cloud.color, textTransform: 'uppercase', marginBottom: 8,
              }}>
                {cloud.abbr}
              </div>
              <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.05rem', marginBottom: 16 }}>
                {cloud.name}
              </div>
              <ul style={{ margin: '0 0 16px', padding: '0 0 0 16px', listStyle: 'disc' }}>
                {cloud.highlights.map((h, i) => (
                  <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 6, lineHeight: 1.5 }}>
                    {h}
                  </li>
                ))}
              </ul>
              <div style={{
                padding: '8px 12px', borderRadius: 6,
                background: `${cloud.glow}`, fontSize: '0.78rem',
                color: cloud.color, fontStyle: 'italic',
              }}>
                {cloud.verdict}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 16, overflow: 'hidden',
        }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontFamily: 'Syne', fontWeight: 700, margin: 0, fontSize: '1.05rem' }}>
              Serviços Equivalentes entre Clouds
            </h3>
            <p style={{ margin: '6px 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Aprenda um e você entende a lógica de todos
            </p>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="cloud-table">
              <thead>
                <tr>
                  <th style={{ width: '22%' }}>Categoria</th>
                  <th style={{ color: 'var(--blue)' }}>GCP</th>
                  <th style={{ color: 'var(--orange)' }}>AWS</th>
                  <th style={{ color: 'var(--purple)' }}>Azure</th>
                </tr>
              </thead>
              <tbody>
                {cloudServices.map((row, i) => (
                  <tr key={i}>
                    <td style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', fontSize: '0.78rem' }}>
                      {row.category}
                    </td>
                    <td style={{ color: 'var(--blue)', fontWeight: 500 }}>{row.gcp}</td>
                    <td style={{ color: 'var(--orange)', fontWeight: 500 }}>{row.aws}</td>
                    <td style={{ color: 'var(--purple)', fontWeight: 500 }}>{row.azure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

function ChallengeSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
  const [showSolution, setShowSolution] = useState(false)

  const categories = ['all', 'SQL', 'Python', 'ETL', 'Cloud']
  const difficultyColors = {
    Iniciante: 'var(--green)',
    Intermediário: 'var(--orange)',
    Avançado: 'var(--rose)'
  }

  const filteredChallenges = challenges.filter(
    c => selectedCategory === 'all' || c.category === selectedCategory
  )

  return (
    <section id="desafios" style={{ marginTop: 80, marginBottom: 80 }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
        <div className="animate-in" style={{ marginBottom: 40, textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16,
            padding: '6px 16px', borderRadius: 999, background: 'var(--rose-glow)',
            border: '1px solid rgba(240, 96, 128, 0.2)',
          }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: 'var(--rose)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Pratique
            </span>
          </div>
          <h2 style={{
            fontFamily: 'Syne', fontWeight: 800,
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            color: 'var(--text)', margin: '0 0 12px',
          }}>
            Desafios de Código
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '60ch', margin: '0 auto', lineHeight: 1.7 }}>
            Teste seus conhecimentos com desafios práticos de SQL, Python, ETL e Cloud.
            Resolva cada desafio e confira a solução.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 32, flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat)
                setSelectedChallenge(null)
                setShowSolution(false)
              }}
              style={{
                padding: '8px 20px',
                borderRadius: 999,
                border: `1px solid ${selectedCategory === cat ? 'var(--gold)' : 'var(--border)'}`,
                background: selectedCategory === cat ? 'var(--gold-glow-sm)' : 'var(--surface)',
                color: selectedCategory === cat ? 'var(--gold)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontFamily: 'JetBrains Mono',
                fontSize: '0.8rem',
                transition: 'all 0.2s'
              }}
            >
              {cat === 'all' ? 'Todos' : cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
          {filteredChallenges.map(challenge => (
            <div
              key={challenge.id}
              onClick={() => {
                setSelectedChallenge(challenge)
                setShowSolution(false)
              }}
              style={{
                background: 'var(--surface)',
                border: `1px solid ${selectedChallenge?.id === challenge.id ? 'var(--gold)' : 'var(--border)'}`,
                borderRadius: 12,
                padding: 20,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                    <span className="tag" style={{ background: `${difficultyColors[challenge.difficulty]}20`, color: difficultyColors[challenge.difficulty] }}>
                      {challenge.difficulty}
                    </span>
                    <span className="tag" style={{ background: 'var(--blue-glow)', color: 'var(--blue)' }}>
                      {challenge.category}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'Syne', fontSize: '1.1rem', margin: 0, color: 'var(--text)' }}>
                    {challenge.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 8 }}>
                    {challenge.description}
                  </p>
                </div>
                <span style={{ color: 'var(--gold)', fontSize: '1.5rem' }}>▼</span>
              </div>
            </div>
          ))}
        </div>

        {selectedChallenge && (
          <div style={{
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: 28,
            marginTop: 32
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'Syne', fontSize: '1.3rem', margin: 0, color: 'var(--text)' }}>
                {selectedChallenge.title}
              </h3>
              <button
                onClick={() => setShowSolution(!showSolution)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: '1px solid var(--gold)',
                  background: 'transparent',
                  color: 'var(--gold)',
                  cursor: 'pointer',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '0.8rem'
                }}
              >
                {showSolution ? 'Esconder Solução' : 'Ver Solução'}
              </button>
            </div>

            <div style={{ marginBottom: 24 }}>
              <h4 style={{ color: 'var(--text-muted)', marginBottom: 12 }}>📝 Desafio:</h4>
              <div className="code-block" style={{ fontSize: '0.8rem' }}>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{selectedChallenge.question}</pre>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <h4 style={{ color: 'var(--text-muted)', marginBottom: 12 }}>💡 Dica:</h4>
              <div style={{ padding: 12, background: 'var(--gold-glow-sm)', borderRadius: 8 }}>
                {selectedChallenge.hint}
              </div>
            </div>

            {showSolution && (
              <div>
                <h4 style={{ color: 'var(--text-muted)', marginBottom: 12 }}>✅ Solução:</h4>
                <div className="code-block" style={{ fontSize: '0.8rem' }}>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{selectedChallenge.solution}</pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

function RoadmapPage() {
  const { completedStages, markStageComplete } = useProgressStore();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      <div className="grid-bg" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '40%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 400,
          background: 'radial-gradient(ellipse, rgba(201,137,58,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 960, margin: '0 auto', padding: '80px 24px 72px', textAlign: 'center', position: 'relative' }}>
          <div className="animate-in" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 18px', borderRadius: 999,
            background: 'var(--gold-glow-sm)',
            border: '1px solid rgba(201, 137, 58, 0.25)',
            marginBottom: 28,
          }}>
            <span style={{
              fontFamily: 'JetBrains Mono', fontSize: '0.68rem',
              color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>
              Roteiro Completo &amp; Gratuito
            </span>
          </div>

          <h1 className="animate-in delay-100" style={{
            fontFamily: 'Syne', fontWeight: 800,
            fontSize: 'clamp(2.2rem, 6vw, 4rem)',
            lineHeight: 1.05, margin: '0 0 20px',
            letterSpacing: '-0.02em',
          }}>
            <span className="gradient-text">Trilha do</span>{' '}
            <br />
            <span style={{ color: 'var(--text)' }}>Engenheiro de Dados</span>
          </h1>

          <p className="animate-in delay-200" style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
            color: 'var(--text-muted)', maxWidth: '56ch', margin: '0 auto 40px',
            lineHeight: 1.75,
          }}>
            Do zero ao profissional. Um roteiro estruturado com recursos gratuitos para dominar Python, SQL, Cloud Computing e Engenharia de Dados na prática.
          </p>

          <div className="animate-in delay-300" style={{
            display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 32, marginBottom: 56,
          }}>
            {[
              { value: '5', label: 'Etapas' },
              { value: '90%', label: 'Gratuito' },
              { value: '8', label: 'Desafios' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'Syne', fontWeight: 800,
                  fontSize: '2rem', color: 'var(--gold)',
                  lineHeight: 1,
                }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono', marginTop: 4 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="animate-in delay-400">
            <div className="stage-nav" style={{ justifyContent: 'center' }}>
              {stages.map(s => (
                <a
                  key={s.id}
                  href={`#${s.anchor}`}
                  className={`stage-nav-pill stage-${s.id}`}
                  style={{ '--stage-color': `var(${s.color})`, '--stage-glow': 'transparent' } as React.CSSProperties}
                >
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', opacity: 0.5 }}>
                    {String(s.id).padStart(2, '0')}
                  </span>
                  {s.title}
                </a>
              ))}
              <a href="#clouds" className="stage-nav-pill" style={{ '--stage-color': 'var(--gold)' } as React.CSSProperties}>
                Guia de Clouds
              </a>
              <a href="#desafios" className="stage-nav-pill" style={{ '--stage-color': 'var(--rose)' } as React.CSSProperties}>
                🎯 Desafios
              </a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px 0' }}>
        <div className="animate-in delay-500" style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: '28px 32px',
          marginBottom: 16,
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono', fontSize: '0.7rem', letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 18,
          }}>
            Visão Geral da Trilha
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap' }}>
            {stages.map((stage, i) => {
              const colors = ['var(--green)', 'var(--blue)', 'var(--purple)', 'var(--orange)', 'var(--rose)']
              return (
                <div key={stage.id} style={{ display: 'flex', alignItems: 'center' }}>
                  <a
                    href={`#${stage.anchor}`}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                      padding: '12px 16px', borderRadius: 10, textDecoration: 'none',
                      transition: 'background 0.2s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--surface2)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent' }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      border: `2px solid ${colors[i]}`, display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '0.78rem',
                      color: colors[i],
                    }}>
                      {String(stage.id).padStart(2, '0')}
                    </div>
                    <span style={{
                      fontSize: '0.72rem', color: 'var(--text-muted)',
                      textAlign: 'center', maxWidth: 80, lineHeight: 1.3,
                    }}>
                      {stage.title}
                    </span>
                  </a>
                  {i < stages.length - 1 && (
                    <div style={{
                      width: 24, height: 2,
                      background: `linear-gradient(90deg, ${colors[i]}, ${colors[i + 1]})`,
                      opacity: 0.3, flexShrink: 0,
                    }} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="animate-in delay-600" style={{
          padding: '20px 24px',
          background: 'var(--gold-glow-sm)',
          border: '1px solid rgba(201, 137, 58, 0.15)',
          borderRadius: 12,
          marginBottom: 56,
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
          lineHeight: 1.7,
        }}>
          <strong style={{ color: 'var(--gold)' }}>Como usar esta trilha:</strong> Clique em cada etapa para expandir os recursos e dicas. Siga a ordem — cada etapa constrói sobre a anterior. Todos os recursos marcados com{' '}
          <span className="tag tag-free" style={{ verticalAlign: 'middle', display: 'inline-flex' }}>Gratuito</span>{' '}
          são 100% acessíveis sem custo.
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
        {stages.map((stage, i) => (
          <StageSection key={stage.id} stage={stage} index={i} />
        ))}
      </div>

      <div style={{ borderTop: '1px solid var(--border)' }}>
        <CloudComparisonSection />
      </div>

      <div style={{ borderTop: '1px solid var(--border)' }}>
        <ChallengeSection />
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 64, marginBottom: 48 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16,
              padding: '6px 16px', borderRadius: 999, background: 'rgba(245,134,60,0.08)',
              border: '1px solid rgba(245,134,60,0.2)',
            }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: 'var(--orange)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Tópicos Essenciais
              </span>
            </div>
            <h2 style={{
              fontFamily: 'Syne', fontWeight: 800,
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              color: 'var(--text)', margin: '0 0 12px',
            }}>
              ELT na Prática com Python
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '55ch', margin: '0 auto', lineHeight: 1.7 }}>
              Estes são os padrões e bibliotecas que aparecem em todo projeto real de Engenharia de Dados. Domine-os.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
            {[
              {
                topic: 'REST APIs com requests',
                desc: 'Consumir dados de APIs externas com autenticação OAuth, paginação e rate limiting.',
                lib: 'requests, httpx',
                color: 'var(--blue)',
              },
              {
                topic: 'Web Scraping',
                desc: 'Extrair dados estruturados de páginas HTML com seletores CSS e XPath.',
                lib: 'beautifulsoup4, scrapy',
                color: 'var(--green)',
              },
              {
                topic: 'Transformação de Dados',
                desc: 'Limpeza, normalização, merge de datasets e detecção de anomalias.',
                lib: 'pandas, polars',
                color: 'var(--purple)',
              },
              {
                topic: 'Conexão com Bancos de Dados',
                desc: 'Leitura e escrita em PostgreSQL, MySQL, BigQuery via Python.',
                lib: 'sqlalchemy, psycopg2',
                color: 'var(--orange)',
              },
              {
                topic: 'Leitura de Arquivos',
                desc: 'CSV, JSON, Parquet, Excel — leitura eficiente de grandes volumes de dados.',
                lib: 'pandas, pyarrow',
                color: 'var(--rose)',
              },
              {
                topic: 'Orquestração de Pipelines',
                desc: 'Agendar, monitorar e recuperar tarefas automatizadas de processamento de dados.',
                lib: 'apache-airflow, prefect',
                color: 'var(--gold)',
              },
              {
                topic: 'Streaming de Dados',
                desc: 'Processar eventos em tempo real com consumidores e produtores Kafka.',
                lib: 'kafka-python, confluent-kafka',
                color: 'var(--blue)',
              },
              {
                topic: 'Testes de Qualidade de Dados',
                desc: 'Validar esquemas, integridade e distribuição de dados em pipelines.',
                lib: 'great-expectations, dbt',
                color: 'var(--green)',
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '18px 20px',
                borderLeft: `3px solid ${item.color}`,
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.transform = 'translateY(-3px)'
                  el.style.boxShadow = `0 8px 24px rgba(0,0,0,0.3)`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.transform = 'none'
                  el.style.boxShadow = 'none'
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 6, color: 'var(--text)' }}>
                  {item.topic}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 10 }}>
                  {item.desc}
                </div>
                <div style={{
                  fontFamily: 'JetBrains Mono', fontSize: '0.7rem',
                  color: item.color, opacity: 0.9,
                }}>
                  {item.lib}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--surface)',
        padding: '40px 24px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{
            fontFamily: 'Syne', fontWeight: 700, fontSize: '1.1rem',
            marginBottom: 8, color: 'var(--text)',
          }}>
            Trilha do Engenheiro de Dados
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', margin: '0 0 20px', lineHeight: 1.6 }}>
            Roteiro gratuito e independente. Os links externos pertencem aos seus respectivos criadores.
            <br />
            Foco em aprendizado real — sem atalhos, sem promessas vazias.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
            {stages.map(s => (
              <a key={s.id} href={`#${s.anchor}`} style={{
                fontSize: '0.78rem', color: 'var(--text-dim)', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-dim)' }}
              >
                {s.title}
              </a>
            ))}
            <a href="#desafios" style={{
              fontSize: '0.78rem', color: 'var(--text-dim)', textDecoration: 'none',
              transition: 'color 0.2s',
            }}>
              Desafios
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default RoadmapPage