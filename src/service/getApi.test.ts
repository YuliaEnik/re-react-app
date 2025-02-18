import { vi } from 'vitest';
import { useGetAllArtworksQuery } from './getApi';

describe('useGetAllArtworksQuery', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls fetch once', async () => {
    const cardData = {
      id: 43768,
      title: 'E-9: English Drawing Room of the Georgian period, 1770-1800',
      artistTitle: 'Narcissa Niblack Thorne',
      dateDisplay: 'c. 1937',
      imageId: '134f4704-90b5-c956-94ed-6548a52f819a',
    };
    const mockResponse = Promise.resolve(cardData);
    const mockFetch = Promise.resolve({
      json: () => mockResponse,
    });
    global.fetch = vi.fn().mockImplementation(() => mockFetch);

    await useGetAllArtworksQuery(123);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('returns true when called', () => {
    const mockGetURL = vi.fn(() => true);
    mockGetURL();
    expect(mockGetURL).toHaveReturned();
  });

  it('returns a product object', async () => {
    const cardData = {
      id: 43768,
      title: 'E-9: English Drawing Room of the Georgian period, 1770-1800',
      artist_title: 'Narcissa Niblack Thorne',
      date_display: 'c. 1937',
      image_id: '134f4704-90b5-c956-94ed-6548a52f819a',
    };
    const mockResponse = Promise.resolve(cardData);
    const mockFetch = Promise.resolve({
      json: () => mockResponse,
    });
    global.fetch = vi.fn().mockImplementation(() => mockFetch);

    const data = await useGetAllArtworksQuery(234);
    expect(data).toMatchObject(cardData);
  });
});
