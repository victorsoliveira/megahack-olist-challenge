import express from 'express';
import cors from 'cors';

import * as chat from  'twilio-chat'

import { TwilioTokenGenerator } from './twilio/TwilioTokenGenerator';
import { MercadoLivreConnector } from './connectors/MercadoLivreConnector';

const getTwilioToken = () => new TwilioTokenGenerator().getToken('olist-api');

const connector = new MercadoLivreConnector();

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));
app.use(express.static('public'));

app.get('/connect', (req, res, next) => {
  const redirectUrl = connector.getRedirectUrl();
  res.redirect(redirectUrl);
});

app.get('/auth', (req, res, next) => {
  connector.authorize(req.query.code.toString());
  res.send('Aplicação autenticada com sucesso !');
});

app.post('/notification', async (req, res, next) => {
  
  console.log("Pergunta recebida! ");

  // Pega nova pergunta
  const question = await connector.getQuestion(req.body.resource);

  if (question) {

    // Inicia chat com bot
    const channelFriendlyName = `${connector.identity}_${question.from.id}_${question.item_id}`
    const client = await chat.Client.create(getTwilioToken());
    const channel = await client.createChannel({ friendlyName: channelFriendlyName });
    const activeChannel = await channel.join();

    activeChannel.on('messageAdded', async (message) => {
      
    //Se a mensagem postada for do Bot prossegue para resposta no mercado livre
    if (message.author === 'system') {
      console.log("Resposta resolvida!");
      console.log("Resposta -> ", message.body);
      console.log("Encaminhando ao marketplace...");
      await connector.postAnswer(question.id, message.body);
      console.log(`Resposta postada com sucesso em ${connector.identity}`);
    }});

    console.log("Enviando pergunta", question.text);

    // Envia mensagem para processamento
    activeChannel.sendMessage(question.text);
      
  } else {
    console.warn("Notificação de pergunta recebida sem conteúdo!");
  }

  res.send();

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Olist application is running on port ${ PORT }`);
});


