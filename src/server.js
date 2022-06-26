const Hapi = require('@hapi/hapi')
const routes = require("./routes")

// create server
const init = async () => {
    const server = Hapi.server({
        port: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        host: "localhost",
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    })

    server.route(routes)

    // server call
    await server.start()
    console.log(`Server Running: ${server.info.uri}`)
}


init()