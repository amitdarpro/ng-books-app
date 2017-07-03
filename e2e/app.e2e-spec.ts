import { NgBooksAppPage } from './app.po';

describe('ng-books-app App', () => {
  let page: NgBooksAppPage;

  beforeEach(() => {
    page = new NgBooksAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
