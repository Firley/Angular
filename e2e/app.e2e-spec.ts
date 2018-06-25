import {AppPage} from './app.po';
import {browser, element, by} from 'protractor';

describe('Routes list tab E2E Tests', function () {

  beforeEach(function () {
    browser.get('/home');
  });

  it('should display title in home view', function () {
    element(by.className('top-header')).getText()
      .then(t => expect(t).toEqual('Z nami wygodnie do celu...'));
  });
});

describe('Routes details tab E2E Tests', function () {
  let idRoute = '5b294e3d0cde85780004456c';
  beforeEach(function () {
    browser.get('/route-details/:' + idRoute);
  });

  it('should display title in routes details view', function () {
    element(by.tagName('h3')).getText()
      .then(t => expect(t).toEqual('Szczegóły przejazdu'));
  });
});

describe('przejazdomat App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
});
