
//global variable, for html page, refer tpsvr @ npm.
dom_document_tool = require("../dom-document-tool.js");

_ele = function (idOrEl) { return (typeof idOrEl === "string") ? document.getElementById(idOrEl) : idOrEl; }

module.exports = {


};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('dom_document_tool', function () { for (var i in module.exports) { it(i, module.exports[i]).timeout(5000); } });
