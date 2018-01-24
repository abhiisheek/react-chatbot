import { extractLinkFunc } from './ExtractLink';

describe('extract-link util', () => { 
  it('Should extract the http link from the given string', () => { 
    const result = extractLinkFunc('Help document http://help.doc');
    expect(result.data).toBe('Help document');
    expect(result.link).toBe('http://help.doc')
  });

  it('Should extract the https link from the given string', () => {
    const result = extractLinkFunc('Help document    https://help.doc');
    expect(result.data).toBe('Help document');
    expect(result.link).toBe('https://help.doc');
  });

  it('Should return the given string when there is no link/address', () => {
    const result = extractLinkFunc('Help document   ');
    expect(result.data).toBe('Help document   ');
  });
});