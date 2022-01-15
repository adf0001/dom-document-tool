# dom-document-tool
dom document tool

# Install
```
npm install dom-document-tool
```

# Usage & Api
```javascript

var dom_document_tool = require("dom-document-tool");

var _ele = function (idOrEl) { return (typeof idOrEl === "string") ? document.getElementById(idOrEl) : idOrEl; }

//.querySelectorByAttr(el, head, attrName, attrValue, tail)		//call .querySelector() by attribute name and value
_ele('divResult3').innerHTML = '<span myattr=11>aaa</span> <span myattr=22>bbb</span> <b myattr=22>ccc</b> <b myattr=22>ddd</b>';
dom_document_tool.querySelectorByAttr('divResult3', '', 'myattr').getAttribute('myattr') === '11' &&
	dom_document_tool.querySelectorByAttr('divResult3', '', 'myattr', '22').textContent === 'bbb' &&
	dom_document_tool.querySelectorByAttr('divResult3', 'b', 'myattr', '22').textContent === 'ccc' &&
	dom_document_tool.querySelectorByAttr('divResult3', 'b', 'myattr', '22', ':nth-of-type(2)').textContent === 'ddd';

//.getSearchPart(name, searchString)		//get part value by name, default from window.location.search.
dom_document_tool.getSearchPart('a', '?aa=1&a=2') === '2' &&
	dom_document_tool.getSearchPart('aa', '?aa=1&a=2') === '1' &&
	dom_document_tool.getSearchPart('a', '?aa=1&a=2&cc=3') === '2' &&
	dom_document_tool.getSearchPart('d', '?aa=1&a=2&cc=3') === null;

//.dispatchEventByName(el, eventName, delay)		//compatible tool for dispatchEvent()
_ele('divResult3').innerHTML = '<span myattr=11>aaa</span>';

_ele('divResult3').firstChild.onclick = function () { done(false); };

dom_document_tool.dispatchEventByName(_ele('divResult3').firstChild, "click", 500);

//.observeSingleMutation(target, optionOrAttribute, callback)
//call MutationObserver.observe() for single object, default for single attribute.
_ele('divResult3').innerHTML = "<span myattr='11'>aaa</span>";

dom_document_tool.observeSingleMutation(_ele('divResult3').firstChild, "myattr",
	function (mutationItem) { if (_ele('divResult3').firstChild.getAttribute("myattr") == "22") { done(false); } }
);

setTimeout(function () { _ele('divResult3').firstChild.setAttribute("myattr", "22"); }, 500);

```
