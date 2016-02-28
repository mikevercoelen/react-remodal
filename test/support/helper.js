import jsdom from 'jsdom'
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import { expect } from 'chai'
import createTest from './createTest'
import sinon from 'sinon'

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
const win = doc.defaultView

global.document = doc
global.window = win
global.navigator = win.navigator

global.createTest = createTest
global.React = React
global.expect = expect
global.sinon = sinon

chai.use(chaiEnzyme())
