const configs = {
    production: {
        url: 'https://develoxy.com',
        backendUrl: 'https://develoxy.com'
    },
    development: {
        url: 'http://localhost:3000',
        backendUrl: 'http://localhost:4000'
    }
};

export default configs[process.env.NODE_ENV];