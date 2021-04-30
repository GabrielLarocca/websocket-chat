import React, { useEffect, useState } from "react";
import openSocket from 'socket.io-client';
import Button from '@material-ui/core/Button';
import { FaShare, FaArrowLeft } from 'react-icons/fa';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import wallpaper from '../assets/img/wppwallpaper.jpg';
import IconButton from '@material-ui/core/IconButton';
import { toast } from "react-toastify";
import './styles.css';

export default function Chat() {
  var socket = openSocket('http://localhost:8080');

  const [mensagem, setmensagem] = useState("");
  const [inRoom, setInRoom] = useState(false);
  const [user, setuser] = useState();
  var myname = '';

  async function handleInRoom() {
    if (inRoom) {
      setInRoom(false);
      toast.dark("Você saiu da Sala", { position: toast.POSITION.TOP_RIGHT });
      socket.emit('chat message', user + " saiu da sala.");
    } else {
      setInRoom(true);
      myname = prompt("Qual seu nome?");
      setuser(myname);

      if (myname) {
        toast.dark("Você entrou na Sala", { position: toast.POSITION.TOP_RIGHT });
        socket.emit('chat message', `Bem vindo ${myname}!`);
      }
    }
  }

  //enter, leave room
  useEffect(() => {
    if (inRoom) {
      console.log('joining room');
      socket.emit('join room', { room: 'room' });
    }

    return () => {
      if (inRoom) {
        console.log('leaving room');
        socket.emit('leave room', { room: 'room' });
      }
    };
  }, []);

  //qual sala entrou
  useEffect(() => {
    socket.on('room', data => { console.log(data); });
  }, []);

  function enviar_menssagem(e) {
    if (mensagem.length > 0) {
      let message = {
        user: user,
        mensagem: mensagem,
        me: true
      };
      socket.emit('chat message', message);
      myname = user;
      document.getElementById("mensagem").focus();
      setmensagem("");
    }
  }

  //mostra as mensagens
  useEffect(() => {
    socket.on('chat message', function (msg) {
      // busca o elemento UL
      let ul = document.getElementById("messages");
      // cria um elemento LI
      let li = document.createElement('li');
      li.classList.add("textsMsgs");

      if (typeof msg === "object") {
        if (msg.user === myname) {
          li.classList.add("ourMsg");
        } else {
          li.classList.add("theyMsg");
        }
        var text = msg.user + ": " + msg.mensagem;
        let br = document.createElement('br');
        li.appendChild(document.createTextNode(text));
      } else {
        li.classList.add("serverMsg");
        li.appendChild(document.createTextNode(msg));
      }

      ul.appendChild(li);
    });
  }, []);

  return (
    <>
      <IconButton className={inRoom ? "" : "none"} color="primary" type="submit" onClick={() => handleInRoom()}>
        <FaArrowLeft />
      </IconButton>

      <div className="image" src={wallpaper}>
        <ul className="mensagens" id="messages"></ul>
      </div>

      {inRoom ? (
        <div className="input">
          <form>
            <Grid container justify="center" className="gridInput">
              <Grid container item xs={9} className="inputHeight" spacing={2}>
                <TextField fullWidth={true} maxLength="50" value={mensagem} id="mensagem" name="mensagem" label="Mensagem" onChange={(e) => setmensagem(e.target.value)} />
              </Grid>

              <Grid container item xs={1} spacing={2}>
                <IconButton color="primary" type="submit" onClick={(e) => { enviar_menssagem(e); e.preventDefault(); }}
                  className="enterButton">
                  <FaShare />
                </IconButton>
              </Grid>
            </Grid>
          </form>
        </div>
      ) : (
        <Grid container justify="center" className="btnEnterRoom">
          <Button variant="contained" color="primary" onClick={() => handleInRoom()}>
            Entrar na Sala
          </Button>
        </Grid>
      )
      }
    </>
  );
}