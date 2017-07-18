import { BridgewaterPage } from './app.po';

describe('bridgewater App', () => {
  let page: BridgewaterPage;

  beforeEach(() => {
    page = new BridgewaterPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
