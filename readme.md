# eaze-alert [![Build Status](https://travis-ci.org/eaze/eaze-alert.svg?branch=master)](https://travis-ci.org/eaze/eaze-alert)

> Styled alert component for virtual-dom


## Install

```
$ npm install --save eaze-alert
```


## Usage

```js
var Alert = require('eaze-alert')
var error = Alert({type: 'error'})
Alert.render(error, 'Something broke!')
//=> <alert ...>Something broke!</alert>
```

## API

#### `Alert([data])` -> `function`

##### data

*Required*  
Type: `object`

Initial alert data:

###### type

Type: `string`  
Default: `basic`

You can use `basic`, `info`, `success`, `warning`, and `error`.

###### closable

Type: `boolean`  
Default: `false`

When `true`, the alert shows a close button in the top right.

###### open

Type: `boolean`  
Default: `false`

When `true`, show the alert. 

###### mobile

Type: `boolean`  
Default: `false`

A mobile viewport state managed by [observ-mobile](https://github.com/bendrucker/observ-mobile).

#### `Alert.render(state, content)` -> `vtree`

Render an alert using its state and the desired content. 

##### state

*Required*  
Type: `function`

The observable state returned from `Alert`.

##### content

*Required*  
Type: `string` / `vtree` / `function`

Any valid [virtual hyperscript](https://github.com/Matt-Esch/virtual-dom/tree/master/virtual-hyperscript) content or a function that will be called to get the content.


## License

MIT © [Ben Drucker](http://bendrucker.me)
