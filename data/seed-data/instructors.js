const bcrypt = require('bcryptjs');

module.exports = [
    {
        username: 'omar12',
        password: bcrypt.hashSync('omar12', 12),
        first_name: 'Omar',
        last_name: 'Lopez',
        email: 'omar@gmail.com',
        stripe_account_id: 'acct_1Gdp0QIXRCCTqfEf'
    },
    {
        username: 'testinstructor',
        password: bcrypt.hashSync('test123', 12),
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@gmail.com'
    }
]