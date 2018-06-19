import { PrbookAppPage } from './app.po';

describe('prbook-app App', function() {
  let page: PrbookAppPage;

  beforeEach(() => {
    page = new PrbookAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
