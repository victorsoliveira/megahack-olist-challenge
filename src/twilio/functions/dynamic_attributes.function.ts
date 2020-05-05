exports.handler = function(context, event, callback) {

    const axios = require('axios');
    const stringSimilarity = require('string-similarity');
    const _ = require('lodash');

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

        const composedFriendlyName = chatInfo.friendly_name;

        const marketplaceIdentity = composedFriendlyName.split('_')[0];
        const userId = composedFriendlyName.split('_')[1];
        const productId = composedFriendlyName.split('_')[2];
        
        axios.get(`https://api.mercadolibre.com/items/${productId}`)
            .then((response) => {
                
                const attributes = response.data.attributes.map(x=> {
                  x.id = x.id.toLowerCase().replace(/[_]/gi, ' ').replace(/[-]/gi, '');
                  x['sanitizedName']= x.name.toLowerCase().replace(/[?.,;:|!_-]/gi, '');
                  x['orderedSanitizedName'] = _.orderBy(x['sanitizedName'].split(' ')).join(' ');
                  return x;
                });
                
                const tokens = question.split(' ');
                
                let phrase = [];

                tokens.forEach(t => {
                
                  const tokenMatches = stringSimilarity.findBestMatch(t, attributes.map(x => x['sanitizedName']));
                
                  if (tokenMatches.bestMatch.rating > 0.4) {
                      phrase.push(t);
                  }

                });

                let message = "";
                let match = null
                
                const newQuestion = _.orderBy(phrase).join(' ');
                
                const questionMatches = stringSimilarity.findBestMatch(newQuestion, attributes.map(x => x['orderedSanitizedName']));
                
                if (questionMatches.bestMatch.rating >= 0.4){
                    console.log('attrs -> ', questionMatches.bestMatch);
                    match = attributes[questionMatches.bestMatchIndex];
                }

                if (match){
                    message = `Você perguntou por ${match.name} ? Nesse caso o valor de ${match.name} é ${match.value_name} ! Caso não tenha atendido a sua expectativa tente ser mais específico(a) por favor.`
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