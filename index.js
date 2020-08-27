const fs = require('fs')

module.exports = (api, options) => {
    api.registerCommand(

        'env-vars-check',

        {

            description: 'Checks if env variables are present',

            usage: 'vue-cli-service env-vars-check'

        },

        () => {
            // get lines from required ENV variables file
            var required_env_vars = fs.readFileSync('.env.example', 'utf8').split('\n')

            // get only variable names in case there are some values
            required_env_vars = required_env_vars.map(line => line.split('=')[0])

            // remove empty lines
            required_env_vars = required_env_vars.filter(value => value !== '')

            // get variable names from current ENV
            var current_env_vars = Object.keys(process.env)

            // get every required variable which is not present in current ENV
            var missing_env_vars = required_env_vars.filter(value => !current_env_vars.includes(value))

            if(missing_env_vars.length) {
                console.log('Following ENV variables are missing:')
                console.log(missing_env_vars.join(', '))
                process.exit(-1)
            }

        }
    )
}
