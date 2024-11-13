import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    axios.get('/api/tarefas')
      .then(response => setTarefas(response.data))
      .catch(error => console.error('Erro ao buscar tarefas:', error));
  }, []);

  const adicionarTarefa = () => {
    axios.post('/api/tarefas', { descricao })
      .then(response => {
        setTarefas([...tarefas, response.data]);
        setDescricao('');
      })
      .catch(error => console.error('Erro ao adicionar tarefa:', error));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Lista de Tarefas</h1>
      <div className="row">
        <div className="col-md-8 mx-auto">
          <ul className="list-group mb-4">
            {tarefas.map(tarefa => (
              <li key={tarefa.id} className="list-group-item">
                {tarefa.descricao}
              </li>
            ))}
          </ul>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Adicionar nova tarefa"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
            />
            <button className="btn btn-primary" onClick={adicionarTarefa}>
              Adicionar Tarefa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
