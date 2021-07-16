import React, { useState, FormEvent } from 'react';
import { EventEmitter } from 'stream';
import api from '../../services/api';
import Repository from '../Repository';
import { FiChevronRight } from 'react-icons/fi';

import { Title, Repositories, Form, Error } from './style';

interface Repository{
  full_name: string;
  description: string;
  owner:{
    login: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
      event.preventDefault();

      if(!newRepo){
        setInputError("Digite um usuário/repositório para pesquisar.")
        return;
      }

      try{
        const response = await api.get<Repository>(`repos/${newRepo}`);
        const repository = response.data;

        setRepositories([...repositories, repository]);
        setNewRepo('');
        setInputError('');
      }catch(err){
        setInputError("Repositório não encontrada ou inexistente");
      }

  }

  return (
    <>
      <Title>Explore repositórios no GitHub</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input value={newRepo} onChange={e => setNewRepo(e.target.value)} placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>

        {repositories.map(repository => (
          <a key={repository.full_name} href="teste">
              <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>
              <FiChevronRight size={20} color='#000'/>
          </a>
        ))}

          <a href="#">
              <img src="https://avatars.githubusercontent.com/u/82897833?v=4" alt="Maria"/>
              <div>
                <strong>GitHubRepository</strong>
                <p>Repositório</p>
              </div>
              <FiChevronRight size={20} color='#000'/>
          </a>

          <a href="#">
              <img src="https://avatars.githubusercontent.com/u/82897833?v=4" alt="Maria"/>
              <div>
                <strong>GitHubRepository</strong>
                <p>Repositório</p>
              </div>
              <FiChevronRight size={20} color='#000'/>
          </a>

          <a href="#">
              <img src="https://avatars.githubusercontent.com/u/82897833?v=4" alt="Maria"/>
              <div>
                <strong>GitHubRepository</strong>
                <p>Repositório</p>
              </div>
              <FiChevronRight size={20} color='#000'/>
          </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
