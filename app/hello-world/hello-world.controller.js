module.exports = (axios) => {
    const request = (type, params, body) => axios({
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        url: `${BASE_URL}${ENDPOINT}`,
        method: type,
        data: body,
        params,
    });

    const requestUsage = async params => request('get', params);

    const getHelloWorld = () => 'Hello World';

    const sayHello = (name) => {
        return `Hello ${name}`;
    }

    const getBadges = () => {
        return [
            "Bronze", "Silver", "Gold"
        ];
    }

    return {
        getHelloWorld,
        sayHello,
        getBadges,
    };
};
