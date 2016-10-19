'use strict';

const argv = require('yargs');
const env = argv.env || 'default';
global.config = require('../../config.json')['test'];

const Nightmare = require('nightmare');
const nightmare = new Nightmare({
	show: true,
	waitTimeout: 30 * 1000,
	gotoTimeout: 30 * 1000,
	loadTimeout: 30 * 1000
});

function World () {
	this.browser = nightmare;

	this.count = function (selector, callback) {
		nightmare
			.evaluate(function() { 
				return +document.querySelectorAll(selector).length;
			})
			.then(callback);
	}

	this.getPageTitle = function (callback) {
		nightmare
			.title()
			.then(callback);
	}

	this.getText = function (element, callback) {
		nightmare
			.evaluate(function () {
				return document.querySelector(element).innerText;
			})
			.then(callback);
	}
}

module.exports = function() {
	this.setDefaultTimeout(30 * 1000);
	this.World = World;
};
