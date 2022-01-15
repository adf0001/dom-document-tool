
//global variable, for html page, refer tpsvr @ npm.
dom_document_tool = require("../dom-document-tool.js");

_ele = function (idOrEl) { return (typeof idOrEl === "string") ? document.getElementById(idOrEl) : idOrEl; }

module.exports = {

	".querySelectorByAttr()": function (done) {
		_ele('divResult3').innerHTML = '<span myattr=11>aaa</span> <span myattr=22>bbb</span> <b myattr=22>ccc</b> <b myattr=22>ddd</b>';
		return dom_document_tool.querySelectorByAttr('divResult3', '', 'myattr').getAttribute('myattr') === '11' &&
			dom_document_tool.querySelectorByAttr('divResult3', '', 'myattr', '22').textContent === 'bbb' &&
			dom_document_tool.querySelectorByAttr('divResult3', 'b', 'myattr', '22').textContent === 'ccc' &&
			dom_document_tool.querySelectorByAttr('divResult3', 'b', 'myattr', '22', ':nth-of-type(2)').textContent === 'ddd';
	},
	".getSearchPart()": function (done) {
		return dom_document_tool.getSearchPart('a', '?aa=1&a=2') === '2' &&
			dom_document_tool.getSearchPart('aa', '?aa=1&a=2') === '1' &&
			dom_document_tool.getSearchPart('a', '?aa=1&a=2&cc=3') === '2' &&
			dom_document_tool.getSearchPart('d', '?aa=1&a=2&cc=3') === null
	},
	".dispatchEventByName()": function (done) {
		_ele('divResult3').innerHTML = '<span myattr=11>aaa</span>';

		_ele('divResult3').firstChild.onclick = function () { done(false); };

		dom_document_tool.dispatchEventByName(_ele('divResult3').firstChild, "click", 500);
	},
	".observeSingleMutation()": function (done) {
		_ele('divResult3').innerHTML = "<span myattr='11'>aaa</span>";

		dom_document_tool.observeSingleMutation(_ele('divResult3').firstChild, "myattr",
			function (mutationItem) { if (_ele('divResult3').firstChild.getAttribute("myattr") == "22") { done(false); } }
		);

		setTimeout(function () { _ele('divResult3').firstChild.setAttribute("myattr", "22"); }, 500);
	},

};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('dom_document_tool', function () { for (var i in module.exports) { it(i, module.exports[i]).timeout(5000); } });
