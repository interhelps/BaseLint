const fastify = require('fastify')({ logger: true });
const { isCssPropertyBaseline } = require('./baseline-checker');
const OpenAI = require('openai');
const postcss = require('postcss');

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

fastify.get('/', async (request, reply) => {
  return { status: 'ok' };
});

fastify.get('/check/:property', async (request, reply) => {
  const { property } = request.params;
  const isBaseline = isCssPropertyBaseline(property);
  return { property, isBaseline };
});

fastify.get('/generate', async (request, reply) => {
  const { prompt } = request.query;
  
  const openai = getOpenAIClient();
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a CSS expert. Generate CSS code based on user requests.' },
      { role: 'user', content: prompt }
    ]
  });
  
  return response.choices[0].message.content;
});

fastify.post('/govern', async (request, reply) => {
  const { prompt } = request.body;
  
  const openai = getOpenAIClient();
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a CSS expert. Generate CSS code based on user requests. Return only the CSS code without any explanations.' },
      { role: 'user', content: prompt }
    ]
  });
  
  const generatedCss = response.choices[0].message.content;
  
  const root = postcss.parse(generatedCss);
  const validationResults = [];
  
  root.walkDecls((decl) => {
    const isBaseline = isCssPropertyBaseline(decl.prop);
    validationResults.push({
      property: decl.prop,
      isBaseline
    });
  });
  
  return {
    generatedCss,
    validationResults
  };
});

const start = async () => {
  try {
    await fastify.listen({ port: 5000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
