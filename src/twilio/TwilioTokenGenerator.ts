import twilio from 'twilio';

const AccessToken = twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

export class TwilioTokenGenerator {

  constructor() {
    this.accountSid = process.env.TWILIO_ACCOUNT_SID;
    this.signingKeySid = process.env.TWILIO_SIGNING_KEY_ID;
    this.signingKeySecret = process.env.TWILIO_SIGNING_KEY_SECRET;
    this.serviceSid = process.env.TWILIO_SERVICE_ID;
    this.pushCredentialSid = process.env.TWILIO_PUSH_CREDENTIAL_SID;
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
