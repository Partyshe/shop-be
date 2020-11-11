import type { Serverless } from 'serverless/aws';
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

const serverlessConfiguration: Serverless = {
  service: {
    name: 'product-service-ts',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    dotenv: {
      exclude: [
        'AWS_ACCESS_KEY_ID',
        'AWS_SECRET_ACCESS_KEY'
      ]
    },
    environment: {
      PG_HOST: process.env['PG_HOST'],
      PG_PORT: process.env['PG_PORT'],
      PG_DATABASE: process.env['PG_DATABASE'],
      PG_USERNAME: process.env['PG_USERNAME'],
      PG_PASSWORD: process.env['PG_PASSWORD'],
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    stage: 'dev',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    getProductsList: {
      handler: 'handler.getProductsList',
      events: [
        {
          http: {
            method: 'get',
            path: 'products',
            cors: true,
          }
        }
      ]
    },
    getProductsById: {
      handler: 'handler.getProductsById',
      events: [
        {
          http: {
            method: 'get',
            path: 'products/{id}',
            cors: true,
          }
        }
      ]
    },
    createProduct: {
      handler: 'handler.createProduct',
      events: [
        {
          http: {
            method: 'post',
            path: 'products',
            cors: true,
          }
        }
      ]
    },
  }
}

module.exports = serverlessConfiguration;
