// global, for html page
dt = require("../dom-document-tool.js");

var ele = function (el) { return document.getElementById(el) || el; }	//test tool

module.exports = {
	".appendHtml()": function (done) {
		var a = dt.appendHtml('divResult3', '<span>aa</span> <span>bb</span> ');
		return a.textContent == 'aa';
	},
	".appendBodyHtml()": function (done) {
		var a = dt.appendBodyHtml('<span>aa</span> <span>bb</span> ');
		return a.textContent == 'aa'
	},
	".prependHtml()": function (done) {
		var a = dt.prependHtml('divResult3', '<span>pp</span> <span>qq</span> ');
		return a.textContent == 'pp';
	},
	".querySelectorByAttr()": function (done) {
		ele('divResult3').innerHTML = '<span myattr=11>aaa</span> <span myattr=22>bbb</span> <b myattr=22>ccc</b> <b myattr=22>ddd</b>';
		return dt.querySelectorByAttr('divResult3', '', 'myattr').getAttribute('myattr') === '11' &&
			dt.querySelectorByAttr('divResult3', '', 'myattr', '22').textContent === 'bbb' &&
			dt.querySelectorByAttr('divResult3', 'b', 'myattr', '22').textContent === 'ccc' &&
			dt.querySelectorByAttr('divResult3', 'b', 'myattr', '22', ':nth-of-type(2)').textContent === 'ddd';
	},
	".getSearchPart()": function (done) {
		return dt.getSearchPart('a', '?aa=1&a=2') === '2' &&
			dt.getSearchPart('aa', '?aa=1&a=2') === '1' &&
			dt.getSearchPart('a', '?aa=1&a=2&cc=3') === '2' &&
			dt.getSearchPart('d', '?aa=1&a=2&cc=3') === null
	},
	".dispatchEventByName()": function (done) {
		ele('divResult3').innerHTML = '<span myattr=11>aaa</span>';

		ele('divResult3').firstChild.onclick = function () { done(false); };

		dt.dispatchEventByName(ele('divResult3').firstChild, "click", 500);
	},
	".observeSingleMutation()": function (done) {
		ele('divResult3').innerHTML = "<span myattr='11'>aaa</span>";

		dt.observeSingleMutation(ele('divResult3').firstChild, "myattr",
			function (mutationItem) { if (ele('divResult3').firstChild.getAttribute("myattr") == "22") { done(false); } }
		);

		setTimeout(function () { ele('divResult3').firstChild.setAttribute("myattr", "22"); }, 500);
	},

};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('mocha-test', function () { for (var i in module.exports) { it(i, module.exports[i]); } });
