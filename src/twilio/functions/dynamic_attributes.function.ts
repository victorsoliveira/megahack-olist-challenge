exports.handler = function(context, event, callback) {

  const axios = require('axios');
  const stringSimilarity = require('string-similarity');

  const twilioClient = context.getTwilioClient();
	const memory = JSON.parse(event.Memory);
	const question = event.CurrentInput.toLowerCase().replace(/[?.,;:|!_-]/gi, '');

    twilioClient.chat.request({
        method: "POST",
        uri: `v2/Services/${memory.twilio.chat.ServiceSid}/Channels/${memory.twilio.chat.ChannelSid}`,
        username: context.API_SID,
        password: context.API_SECRET
    }).then((response) => {
        
        const chatInfo = JSON.parse(response.body);
        
        axios.get(`https://api.mercadolibre.com/items/${chatInfo.friendly_name}`)
            .then((response) => {
                
                const attributes = response.data.attributes.map(x=> {
                    x.id = x.id.toLowerCase().replace(/[_]/gi, ' ').replace(/[-]/gi, '');
                    x.name = x.name.toLowerCase().replace(/[?.,;:|!_-]/gi, '');
                    return x;
                });
                
                const tokens = question.split(' ');
                
                let phrase = [];

                tokens.forEach(t => {
                
                  const tokenMatches = stringSimilarity.findBestMatch(t, attributes.map(x => x.name));
                
                  if (tokenMatches.bestMatch.rating > 0.4) {
                      phrase.push(t);
                  }

                });

                let message = "";
                let match = null
                
                const newQuestion = phrase.join(' ');
                
                const questionMatches = stringSimilarity.findBestMatch(newQuestion, attributes.map(x => x.name));
                
                if (questionMatches.bestMatch.rating >= 0.4){
                    console.log('attrs -> ', questionMatches.bestMatch);
                    match = attributes[questionMatches.bestMatchIndex];
                }

                if (match){
                    message = `De acordo com as características ${match.name} é igual a ${match.value_name}! Caso não tenha atendido a sua expectativa tente ser mais específico(a) por favor.`
                } else {
                    message = "Não encontramos nenhuma característica que responda a sua pergunta de forma eficiente, pode ser mais especifico(a) ?"
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