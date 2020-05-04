export interface IMarketPlaceConnector {
  identity: string;
  authorize(code: string): string;
  getRedirectUrl(): string;
  getQuestion(resource: string): Promise<any>;
  postAnswer(questionId: number, answer: string): Promise<void>;
}