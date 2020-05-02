const credentials = require('../credentials.json');

import axios from 'axios';
import * as meli from 'mercadolibre';

import { IMarketPlaceConnector } from './IMarketplaceConnector';

export class MercadoLivreConnector implements IMarketPlaceConnector {

  private mlObject: any;
  private accessToken: string;
  public identity: string = 'MercadoLivre';

  constructor() {
    this.mlObject = new meli.Meli(credentials.ml.key, credentials.ml.secret);
  }

  public authorize(code: string): string {
    return this.mlObject.authorize(code, credentials.ml.authUrl, (err, result) => {
  
      if (err) {
        console.error(err);
        return '';
      }
  
      this.accessToken = result.access_token;
      return this.accessToken;
  
    });
  }
 
  public getRedirectUrl(): string {
    return this.mlObject.getAuthURL(credentials.ml.authUrl);
  }

  public async getQuestion(resource: string): Promise<any> {
    const response = await axios.get(`https://api.mercadolibre.com${resource}?access_token=${this.accessToken}`);
    return response.data;
  }

  public async postAnswer(questionId: string, answer: string): Promise<void> {
    await axios.post(`https://api.mercadolibre.com/answers?access_token=${this.accessToken}`, { question_id: questionId, text: answer });
  }

}