import React, { useEffect, useState } from "react";
import openSocket from 'socket.io-client';
import Button from '@material-ui/core/Button';
import { FaShare } from 'react-icons/fa';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


export default function Chat() {
  var socket = openSocket('http://localhost:8080');

  const [chat, setchat] = useState([]);
  const [name, setname] = useState("");
  const [mensagem, setmensagem] = useState("");
  const [inRoom, setInRoom] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  const handleInRoom = () => { inRoom ? setInRoom(false) : setInRoom(true); };

  //enter, leave room
  useEffect(() => {
    if (inRoom) {
      console.log('joining room');
      socket.emit('join room', { room: 'room' });
      var nome_usuario = prompt("Qual seu nome?");
      socket.emit('chat message', "Bem vindo! " + nome_usuario);
    }

    return () => {
      if (inRoom) {
        console.log('leaving room');
        socket.emit('leave room', { room: 'room' });
      }
    };
  }, []);

  useEffect(() => {
    socket.on('room', data => { console.log(data); });
  });

  function sendMessage() {
    console.log('emitting new message');

    socket.emit('new message', { room: 'room', user: name, mensagem: mensagem });

    setMessageCount(messageCount + 1);
  }

  socket.on('chat message', function (msg) {
    // busca o elemento UL
    let ul = document.getElementById("messages");
    // cria um elemento LI
    let li = document.createElement('li');
    // cria o elemento de quebra de linha
    let br = document.createElement('br');
    li.appendChild(document.createTextNode(msg));
    // adicionar o nome do usuário quebra a linha e adicionar a mensagem à lista de mensagems
    ul.appendChild(li);
  });

  socket.on('new message', function (msg) {
    console.log(msg);
  });

  return (
    <>
      {inRoom ? `Você entrou na sala!` : `Você está fora da sala`}
      <Button variant="outlined" color="primary" onClick={() => handleInRoom()}>
        {inRoom ? `Sair da Sala` : `Entrar na Sala`}
      </Button>
      <Grid container justify="space-around" alignItems="flex-end">
        <TextField maxLength="50" value={name} name="name" label="Nome" onChange={(e) => setname(e.target.value)} />
        <TextField maxLength="50" value={mensagem} name="mensagem" label="Mensagem" onChange={(e) => setmensagem(e.target.value)} />
        <Button variant="outlined" color="primary" onClick={() => sendMessage()}>
          <FaShare />
        </Button>
      </Grid>

      <ul id="messages"></ul>
    </>
  );
}