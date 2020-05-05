exports.handler = function(context, event, callback) {

  const axios = require('axios');
  const _ = require('lodash');

  const twilioClient = context.getTwilioClient();
const memory = JSON.parse(event.Memory);

  twilioClient.chat.request({
      method: "POST",
      uri: `v2/Services/${memory.twilio.chat.ServiceSid}/Channels/${memory.twilio.chat.ChannelSid}`,
      username: context.API_SID,
      password: context.API_SECRET
  }).then((response) => {
      
      const chatInfo = JSON.parse(response.body);

      const composedFriendlyName = chatInfo.friendly_name;

      const marketplaceIdentity = composedFriendlyName.split('_')[0];
      const userId = composedFriendlyName.split('_')[1];
      const productId = composedFriendlyName.split('_')[2];
      
      let message = '';
      
      axios.get(`https://api.mercadolibre.com/items/${productId}`)
          .then((response) => {
              
              const variations = response.data.variations;
              
              if (variations && variations.length > 0) {
                  
                  const colorVariation = _.flattenDeep(variations.map(x => x.attribute_combinations)).find(x => x.id.toLowerCase() === "COLOR".toLowerCase());
                  const possibleColors = colorVariation.values.map(x=> x.name).join(', ');
                               
                  if (colorVariation) {

                      message = `A cor selecionada do produto nesse momento é "${colorVariation.value_name}.`;
                      
                      if (possibleColors && possibleColors.length > 0) {
                          message = `${message} Mas, temos a(s) cor(es) ${possibleColors}. Verifique a disponibilidade da cor que deseja.`;
                      }
                  } else {
                      message = "Não encontramos resposta a sua pergunta de forma eficiente, pode ser mais especifico(a) ?";
                  }

              } else {
                  message = "Infelizmente o produto não possui informações sobre cor. Para maiores informações entre em contato diretamente com vendedor pelo canal (CANAL_A_SER_ESPECIFICADO)";
              }

              const responseObject = {
                "actions": [
                  {
                    "say": message
                  },
                  {
                    "listen": true
                  }
                ]
              };

              callback(null, responseObject);

          }).catch((error) => {
              callback(error);
          });
          

  }).catch((error) => {
      callback(error);
  });

};