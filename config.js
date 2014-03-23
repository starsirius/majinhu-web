//
// Using ["The Twelve-Factor App"](http://12factor.net/) as a reference all 
// environment configuration will live in environment variables. This file 
// simply lays out all of those environment variables with sensible defaults 
// for development.
//

module.exports = {
  NODE_ENV    : 'development',
  PORT        : 4000,
  API_URL     : 'http://127.0.0.1:5000',
  APP_ID      : 'D336FF2DDAD57', // 128-bit key
  APP_SECRET  : '0aop8udOJuWLBY5oLMvvBVhQPZYWz9BV' // 256-bit key
}

// Override any values with env variables
for(var key in module.exports) {
  module.exports[key] = process.env[key] || module.exports[key];
}
