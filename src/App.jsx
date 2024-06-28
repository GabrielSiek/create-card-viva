import { useState } from 'react';
import './App.css';

function App() {
  const [codigo, setCodigo] = useState("");
  const [link, setLink] = useState("");
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [descricao, setDescricao] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    formatAndSetCodigo();
  };

  const clearInputs = () => {
    setLink("")
    setNome("")
    setData("")
    setHorario("")
    setDescricao("")
  }

  const formatAndSetCodigo = async () => {
    const partes = data.split('-');
    const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;

    const novoCodigo = `<div class="card-evento">
            <img src={link} width="320px">
            <h3 class="titulo-card-evento">
                {nome}
            </h3>

            <span class="evento-descricao">
                {descricao}
            </span>

            <span class= "evento-infos">{data}</span>
            <span class= "evento-infos">{horario}</span>

            <a class="botao-evento-link" href="https://www.instagram.com/vivaopenmall/" target="_blank">Saiba mais!</a>
        </div>`;

    setCodigo(novoCodigo);

    // Aguarde o estado ser atualizado antes de copiar para o clipboard
    setTimeout(async () => {
      try {
        await navigator.clipboard.writeText(novoCodigo);
        setCopied(true);
        //setTimeout(() => setCopied(false), 2000); // Reinicia o estado de 'copied' após 2 segundos
      } catch (err) {
        console.error('Falha ao copiar para o clipboard:', err);
      }
    }, 0);
  };

  return (
    <section>
      <div className={`container ${copied ? 'blur' : ''}`}>
        <h1 className='titulo'>Criar card de evento</h1>

        <form onSubmit={handleSubmit} className='inputs'>
          <div className='container-input'>
            <span className='label'>Link da imagem</span>
            <input
              onChange={(event) => setLink(event.target.value)}
              value={link}
              type='text'
              className='input'
              placeholder='Insira o link da imagem'
            />
          </div>

          <div className='container-input'>
            <span className='label'>Nome do evento</span>
            <input
              onChange={(event) => setNome(event.target.value)}
              value={nome}
              type='text'
              className='input'
              placeholder='Insira o nome do evento'
            />
          </div>

          <div className='container-input-data-hora'>
            <div className='container-input-data'>
              <span className='label'>Data</span>
              <input
                onChange={(event) => setData(event.target.value)}
                value={data}
                type='date'
                className='input'
              />
            </div>

            <div className='container-input-horario'>
              <span className='label'>Horário</span>
              <input
                onChange={(event) => setHorario(event.target.value)}
                value={horario}
                type='time'
                className='input'
              />
            </div>
          </div>

          <div className='container-input-descricao'>
            <span className='label'>Descrição do evento</span>
            <textarea
              onChange={(event) => setDescricao(event.target.value)}
              value={descricao}
              className='input-descricao'
              placeholder='Insira a descrição do evento'
            />
          </div>

          <button className='botao'>Gerar Código para card</button>
        </form>


      </div>

      <button className={`botao-limpar ${copied ? 'blur' : ''}`} onClick={clearInputs}>Excluir campos</button>


      {
        copied && (
          <div className='popup'>
            <span>Código copiado para área de transferência!</span>
            <button className='botao-popup' onClick={() => setCopied(false)}>Fechar</button>
          </div>
        )
      }

    </section>
  );
}

export default App;
