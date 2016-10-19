'use strict';

const HOST = global.config.host;

function steps() {
	this.Given(/^I am on the Homepage$/, function () {
		return this.browser.goto(`${HOST}`).wait('body');
	});

	this.Then(/^page title should contain text "(.+)"$/, function ($title, callback) {
		this.getPageTitle(function (title) {
			if (title.indexOf($title) === -1) {
				callback(new Error(`Page title is not as expected: ${$title}`));
			} else {
				callback(null);
			}
		});
	});

	this.Then(/^element "(.+)" should contain text "(.+)"$/, function ($element, $text, callback) {
		this.getText($element, function (text) {
			if (text.indexOf($text) === -1) {
				callback(new Error(`Text is not as expected: ${$text}`));
			} else {
				callback(null);
			}
		});
	});
}

module.exports = steps;
