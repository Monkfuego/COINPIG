import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyDwNvyL2zSSZblp9BuASeUiVuUoDEq6LfY');

export async function getCryptoAnalysis(coin: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `Analyze the current state and future prospects of ${coin}. Include:
  1. Current market position
  2. Technical analysis
  3. Recent developments
  4. Future outlook
  Please be specific and data-driven in your analysis.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting crypto analysis:', error);
    return 'Unable to generate analysis at this time.';
  }
}

export async function checkAirdropLegitimacy(airdropDetails: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `Analyze this crypto airdrop for legitimacy. Details: ${airdropDetails}
  Consider:
  1. Project reputation
  2. Team verification
  3. Smart contract audit status
  4. Distribution method
  5. Red flags
  Return a JSON object with: { isLegitimate: boolean, confidence: number, reason: string }`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Error checking airdrop legitimacy:', error);
    return {
      isLegitimate: false,
      confidence: 0,
      reason: 'Unable to verify legitimacy at this time.'
    };
  }
}

export async function chatWithCoinPig(message: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `You are CoinPig, a friendly and knowledgeable crypto assistant. 
  Respond to this user query about cryptocurrency: ${message}
  Be helpful, accurate, and maintain a friendly tone.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error chatting with CoinPig:', error);
    return 'Oink! Sorry, I encountered an error. Please try again!';
  }
}