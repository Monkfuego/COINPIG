import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyDwNvyL2zSSZblp9BuASeUiVuUoDEq6LfY');

export async function getCryptoAnalysis(coin: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  
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
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  
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
    const parsedResponse = JSON.parse(response.text());

    // Format the response line by line with bold text
    return {
      isLegitimate: parsedResponse.isLegitimate,
      confidence: parsedResponse.confidence,
      reason: parsedResponse.reason.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Replace **bold** with <b>bold</b>
    };
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
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  
  const systemPrompt = `You are CoinPig, a friendly and knowledgeable crypto assistant. Your responses should be:
  1. Informative but concise
  2. Focus on factual data and market analysis
  3. Avoid speculation or financial advice
  4. Use a friendly, helpful tone
  5. Include relevant market data when discussing prices
  6. Explain technical terms when used`;

  const prompt = `${systemPrompt}\n\nUser question: ${message}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error chatting with CoinPig:', error);
    return 'Oink! Sorry, I encountered an error. Please try again!';
  }
}