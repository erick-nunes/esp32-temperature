import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({ temperatura: null, umidade: null });

  useEffect(() => {
    // Função para buscar os dados
    const fetchData = () => {
      fetch("http://192.168.15.111/data")
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error("Erro ao buscar dados:", error));
    };

    // Buscar os dados imediatamente ao carregar o componente
    fetchData();

    // Configurar um intervalo para buscar os dados a cada 10 segundos
    const intervalId = setInterval(fetchData, 1000);

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <h1>Temperatura e Umidade</h1>
      <p>Temperatura: <b> {data.temperatura}°C </b></p>
      <p>Umidade: <b> {data.umidade}% </b></p>
    </div>
  );
}

export default App;
