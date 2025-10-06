const fastify = require('fastify')({ logger: true });
const { isCssPropertyBaseline } = require('./baseline-checker');

fastify.get('/', async (request, reply) => {
  return { status: 'ok' };
});

fastify.get('/check/:property', async (request, reply) => {
  const { property } = request.params;
  const isBaseline = isCssPropertyBaseline(property);
  return { property, isBaseline };
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
