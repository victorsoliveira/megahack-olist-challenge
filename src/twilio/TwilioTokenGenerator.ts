import twilio from 'twilio';

const AccessToken = twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

export class TwilioTokenGenerator {

  constructor(credentials) {
    this.accountSid = credentials.accountSid;
    this.signingKeySid = credentials.signingKeySid
    this.signingKeySecret = credentials.signingKeySecret || credentials.authToken;
    this.serviceSid = credentials.serviceSid || credentials.instanceSid;
    this.pushCredentialSid = credentials.pushCredentialSid
  }

  private accountSid: string;
  private signingKeySid: string;
  private signingKeySecret: string;
  private serviceSid: string;
  private pushCredentialSid: string;

  public getToken(identity): string {

    var token = new AccessToken(this.accountSid, this.signingKeySid, this.signingKeySecret, {
      identity: identity,
      ttl: 40000
    });
  
    var chatGrant = new ChatGrant({ serviceSid: this.serviceSid, pushCredentialSid: this.pushCredentialSid });
    token.addGrant(chatGrant);

    return token.toJwt();
  }

}
