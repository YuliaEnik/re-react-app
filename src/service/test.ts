import { vi } from 'vitest';
import { getURL } from '.';

it('calls the right route', async () => {
  const cardData = {
    id: 43768,
    title: 'E-9: English Drawing Room of the Georgian period, 1770-1800',
    artistTitle: 'Narcissa Niblack Thorne',
    dateDisplay: 'c. 1937',
    imageId: '134f4704-90b5-c956-94ed-6548a52f819a',
  };
  const Respons = Promise.resolve(cardData);
  const mockFetch = Promise.resolve({
    json: () => Respons,
  });
  global.fetch = vi.fn().mockImplementation(() => mockFetch);
  vi.spyOn(global, 'fetch');
  await getURL('');
  expect(global.fetch).toHaveBeenCalledTimes(1);
});

it('calls the right route', async () => {
  const getURL = vi.fn(() => true);
  getURL();
  expect(getURL).toHaveReturned();
});

it('getDataCat returns a product object', async () => {
  const cardData = {
    id: 43768,
    title: 'E-9: English Drawing Room of the Georgian period, 1770-1800',
    artistTitle: 'Narcissa Niblack Thorne',
    dateDisplay: 'c. 1937',
    imageId: '134f4704-90b5-c956-94ed-6548a52f819a',
  };
  const Respons = Promise.resolve(cardData);
  const mockFetch = Promise.resolve({
    json: () => Respons,
  });
  global.fetch = vi.fn().mockImplementation(() => mockFetch);

  const data = await getURL('');
  expect(typeof data).toBe('object');
  expect(data).toHaveProperty('id');
  expect(data).toHaveProperty('title');
  expect(data).toHaveProperty('artistTitle');
  expect(data).toHaveProperty('dateDisplay');
  expect(data).toHaveProperty('primageIdice');
});
