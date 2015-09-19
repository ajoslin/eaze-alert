'use strict'

var State = require('dover')
var Observ = require('observ')
var Enum = require('observ-enum')
var device = require('observ-mobile')
var value = require('observ-value')
var extend = require('xtend')
var color = require('color-style')
var map = require('map-values')
var pipe = require('value-pipe')
var h = require('virtual-dom/h')
var clickEvent = require('value-event/click')

var types = require('./types.json')
var styles = require('./styles.json')

var close = require('./close')

var Types = Enum(Object.keys(types))

module.exports = Alert

function Alert (data) {
  data = data || {}

  return State({
    type: Observ(data.type || 'basic'),
    closable: Observ(data.closable || false),
    open: Observ(data.open || false),
    mobile: device.mobile,
    channels: {
      close: close
    }
  })
}

function close (state) {
  state.open.set(false)
}

Alert.render = function render (state, content) {
  if (!state.open) return

  var content = value(content)

  var rightPadding = {
    paddingRight: '2em'
  }

  var style = extend(
    styles.base,
    pipe(colors, toString)(state),
    deviceStyles(state),
    state.closable ? rightPadding : {}
  )

  return h('alert', {style: style}, [
    content,
    renderClose(state)
  ])
}

function renderClose (state) {
  if (!state.closable) return

  var type = colors(state)
  var size = '10px'
  var style = {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: size,
    padding: '0.75em',
    background: rgba(type.borderColor, 0.3),
    borderBottomLeftRadius: '3px'
  }

  var options = {
    style: style,
    'ev-click': clickEvent(state.channels.close)
  }

  return h('button', options, close({
    fill: rgba(type.borderColor),
    width: size,
    height: size
  }))
}

function colors (state) {
  return types[state.type]
}

function toString (colors) {
  return map(colors, function (tuple) {
    return rgba(tuple)
  })
}

function rgba (tuple, opacity) {
  if (opacity == null) opacity = 1
  return color.rgb(tuple.concat(opacity))
}

function deviceStyles (state) {
  return styles[state.mobile ? 'mobile' : 'desktop']
}
