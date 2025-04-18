import axios from 'axios';

const API_KEY = 'f282a522-7872-4b5d-ac06-e0e0472872f3';
const BASE_URL = 'https://api.livecoinwatch.com';

export async function getCoinsList(limit = 10) {
  try {
    const response = await axios.post(`${BASE_URL}/coins/list`, {
      currency: 'USD',
      sort: 'rank',
      order: 'ascending',
      offset: 0,
      limit,
      meta: false
    }, {
      headers: {
        'content-type': 'application/json',
        'x-api-key': API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching coins list:', error);
    return [];
  }
}

export async function getCoinHistory(coin: string) {
  try {
    const response = await axios.post(`${BASE_URL}/coins/single/history`, {
      currency: 'USD',
      code: coin,
      start: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
      end: Date.now(),
      meta: true
    }, {
      headers: {
        'content-type': 'application/json',
        'x-api-key': API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching coin history:', error);
    return null;
  }
}