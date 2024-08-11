const findAuthTokenQuery = `
    SELECT value FROM auth_tokens WHERE username = $1
`;

module.exports = {
    findAuthTokenQuery,
};
