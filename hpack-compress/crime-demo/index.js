const { gzip } = require('./node-gzip')

const httpRequestInfo = `
    GET /?cookie=secr HTTP/1.1
    host:www.facebook.com
    header:cookie=secret
`

gzip(httpRequestInfo).then((data) => {
    console.log('data length', data.length)
})
