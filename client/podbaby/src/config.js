const config = {
  API_URL: 'http://localhost:8000',
};

if (process.env.NODE_ENV === 'production') {
  config['API_URL'] = 'https://podbaby.me';
}
export default config;
