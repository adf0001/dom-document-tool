# dom-document-tool
dom document tool

# Install
```
npm install dom-document-tool
```

# Usage & Api
```javascript

var dt = require("dom-document-tool");

var ele = function (el) { return document.getElementById(el) || el; }	//test tool

//.appendHtml(parentNode, htmlText)		//insert adjacent 'beforeend', return the first inserted element
var a = dt.appendHtml('divResult3', '<span>aa</span> <span>bb</span> ');
a.textContent == 'aa';

//.appendBodyHtml(htmlText)		//insert adjacent 'beforeend' to document.body
var a = dt.appendBodyHtml('<span>aa</span> <span>bb</span> ');
a.textContent == 'aa'

//.prependHtml(parentNode, htmlText)		//insert adjacent 'afterbegin', return the first inserted element
var a = dt.prependHtml('divResult3', '<span>pp</span> <span>qq</span> ');
a.textContent == 'pp';

//.querySelectorByAttr(el, head, attrName, attrValue, tail)		//call .querySelector() by attribute name and value
ele('divResult3').innerHTML = '<span myattr=11>aaa</span> <span myattr=22>bbb</span> <b myattr=22>ccc</b> <b myattr=22>ddd</b>';
dt.querySelectorByAttr('divResult3', '', 'myattr').getAttribute('myattr') === '11' &&
	dt.querySelectorByAttr('divResult3', '', 'myattr', '22').textContent === 'bbb' &&
	dt.querySelectorByAttr('divResult3', 'b', 'myattr', '22').textContent === 'ccc' &&
	dt.querySelectorByAttr('divResult3', 'b', 'myattr', '22', ':nth-of-type(2)').textContent === 'ddd';

//.getSearchPart(name, searchString)		//get part value by name, default from window.location.search.
dt.getSearchPart('a', '?aa=1&a=2') === '2' &&
	dt.getSearchPart('aa', '?aa=1&a=2') === '1' &&
	dt.getSearchPart('a', '?aa=1&a=2&cc=3') === '2' &&
	dt.getSearchPart('d', '?aa=1&a=2&cc=3') === null;

//.dispatchEventByName(el, eventName, delay)		//compatible tool for dispatchEvent()
ele('divResult3').innerHTML = '<span myattr=11>aaa</span>';

ele('divResult3').firstChild.onclick = function () { done(false); };

dt.dispatchEventByName(ele('divResult3').firstChild, "click", 500);

//.observeSingleMutation(target, optionOrAttribute, callback)
//call MutationObserver.observe() for single object, default for single attribute.
ele('divResult3').innerHTML = "<span myattr='11'>aaa</span>";

dt.observeSingleMutation(ele('divResult3').firstChild, "myattr",
	function (mutationItem) { if (ele('divResult3').firstChild.getAttribute("myattr") == "22") { done(false); } }
);

setTimeout(function () { ele('divResult3').firstChild.setAttribute("myattr", "22"); }, 500);

```
