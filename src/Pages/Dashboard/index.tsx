import React, { useState, FormEvent } from 'react';
import { EventEmitter } from 'stream';
import api from '../../services/api';
import Repository from '../Repository';

import { Title, Repositories, Form } from './style';

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
  const [repositories, setRepositories] = useState<Repository[]>([]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
      event.preventDefault();

      const response = await api.get<Repository>(`repos/${newRepo}`);
      const repository = response.data;

      setRepositories([...repositories, repository]);
  }

  return (
    <>
      <Title>Explore repositórios no GitHub</Title>

      <Form onSubmit={handleAddRepository}>
        <input value={newRepo} onChange={e => setNewRepo(e.target.value)} placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>

        {repositories.map(repository => (
          <>
            <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </>
          ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
