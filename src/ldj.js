'use strict'
const { EventEmitter } = require('events')

class LDJClient extends EventEmitter {
  constructor (stream) {
    super()
    let buffer = ''
    stream.on('data', data => {
      buffer += data
      const limiter = '\n'
      let existLimiter = buffer.includes(limiter)
      while (existLimiter) {
        const index = buffer.indexOf(limiter)
        const input = buffer.substring(0, index)
        buffer = buffer.substring(index + 1)
        this.emit('message', JSON.parse(input))
        existLimiter = buffer.includes(limiter)
      }
    });
  }
  static connect(stream) {
    return new LDJClient(stream)
  }
}

module.exports = LDJClient