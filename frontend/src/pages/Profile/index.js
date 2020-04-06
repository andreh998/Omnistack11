import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.svg';

export default function Profile(){
  const history = useHistory();
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId]);

  async function handleDeleteIncidents(id){
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setIncidents(incidents.filter(incidents => incidents.id != id));
    } catch (error) {
      alert('Erro ao deletar caso, tente novamente');
      console.log(error);
    }
  }

  function handleLogout() {
    localStorage.clear(); //limpa os dados do usuário logado
    history.push('/');
  }

  return(
      <div className="profile-container">
        <header>
          <img src={logo} alt="Be The Hero"/>
          <span>Bem vinda, {ongName}</span>

          <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
          <button onClick={handleLogout} type="button">
            <FiPower size={18} color="#E02041" />
          </button>
        </header>

        <h1>Casos cadastrados</h1>

        <ul>
          {incidents.map(incidents => (
            <li key={incidents.id} >
            <strong>CASO:</strong>
            <p>{incidents.title}</p>
            
            <strong>DESCRIÇÃO:</strong>
            <p>{incidents.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incidents.value)}</p>
            
            <button onClick={() => handleDeleteIncidents(incidents.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
          ))}
        </ul>
      </div>
    )
}