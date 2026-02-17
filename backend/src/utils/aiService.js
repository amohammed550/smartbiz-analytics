const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Analyze feedback sentiment and generate insights
 */
const analyzeFeedback = async (feedbackContent) => {
  try {
    const prompt = `Analyze the following customer feedback and provide:
1. Sentiment (positive, negative, or neutral)
2. A brief summary (2-3 sentences)
3. 3 actionable business recommendations

Feedback: "${feedbackContent}"

Respond in JSON format:
{
  "sentiment": "positive|negative|neutral",
  "sentimentScore": 0.0-1.0,
  "summary": "brief summary here",
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"]
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a business analytics assistant. Analyze customer feedback and provide actionable insights.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const responseText = completion.choices[0].message.content.trim();
    
    // Try to extract JSON from the response
    let analysis;
    try {
      // Remove markdown code blocks if present
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        analysis = JSON.parse(responseText);
      }
    } catch (parseError) {
      // Fallback if JSON parsing fails
      console.error('Failed to parse AI response:', parseError);
      analysis = {
        sentiment: 'neutral',
        sentimentScore: 0.5,
        summary: 'Unable to analyze feedback at this time.',
        recommendations: [
          'Review the feedback manually',
          'Consider customer follow-up',
          'Monitor similar feedback patterns',
        ],
      };
    }

    // Validate and normalize sentiment
    const validSentiments = ['positive', 'negative', 'neutral'];
    if (!validSentiments.includes(analysis.sentiment?.toLowerCase())) {
      analysis.sentiment = 'neutral';
    }

    // Ensure sentimentScore is a number between 0 and 1
    if (typeof analysis.sentimentScore !== 'number') {
      analysis.sentimentScore = analysis.sentiment === 'positive' ? 0.8 : 
                                analysis.sentiment === 'negative' ? 0.2 : 0.5;
    }

    // Ensure recommendations is an array
    if (!Array.isArray(analysis.recommendations)) {
      analysis.recommendations = analysis.recommendations 
        ? [analysis.recommendations] 
        : ['No specific recommendations available'];
    }

    return {
      sentiment: analysis.sentiment.toLowerCase(),
      sentimentScore: Math.max(0, Math.min(1, analysis.sentimentScore)),
      summary: analysis.summary || 'Summary not available',
      recommendations: analysis.recommendations.slice(0, 3), // Limit to 3 recommendations
    };
  } catch (error) {
    console.error('AI Analysis Error:', error);
    // Return default analysis on error
    return {
      sentiment: 'neutral',
      sentimentScore: 0.5,
      summary: 'Unable to analyze feedback at this time. Please try again later.',
      recommendations: [
        'Review the feedback manually',
        'Consider customer follow-up',
        'Monitor similar feedback patterns',
      ],
    };
  }
};

module.exports = {
  analyzeFeedback,
};

