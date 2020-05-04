import axios from 'axios';
import * as meli from 'mercadolibre';

import { IMarketPlaceConnector } from './IMarketplaceConnector';

export class MercadoLivreConnector implements IMarketPlaceConnector {

  private mlObject: any;
  private accessToken: string;
  public identity: string = 'MercadoLivre';

  constructor() {
    this.mlObject = new meli.Meli(process.env.ML_KEY, process.env.ML_SECRET);
  }

  public authorize(code: string): string {
    return this.mlObject.authorize(code, process.env.ML_AUTH_URL, (err, result) => {
  
      if (err) {
        console.error(err);
        return '';
      }
  
      this.accessToken = result.access_token;
      return this.accessToken;
  
    });
  }
 
  public getRedirectUrl(): string {
    return this.mlObject.getAuthURL(process.env.ML_AUTH_URL);
  }

  public async getQuestion(resource: string): Promise<any> {
    const response = await axios.get(`https://api.mercadolibre.com${resource}?access_token=${this.accessToken}`);
    return response.data;
  }

  public async postAnswer(questionId: number, answer: string): Promise<void> {
    await axios.post(`https://api.mercadolibre.com/answers?access_token=${this.accessToken}`, JSON.stringify({ question_id: questionId, text: answer }), {
      headers: {
          'Content-Type': 'application/json',
      }
    });
  }

}