
// dom-document-tool @ npm, dom document tool.

var ele = require("ele-tool");
var insert_adjacent_return = require("insert-adjacent-return");

//insert adjacent 'beforeend' to document.body
var appendBodyHtml = function (htmlText) { return insert_adjacent_return.append(document.body, htmlText); }

//call .querySelector() by attribute name and value
var querySelectorByAttr = function (el, head, attrName, attrValue, tail) {
	return ele(el).querySelector((head || "") + "[" + attrName + ((typeof attrValue !== "undefined" && attrValue !== null) ? ("='" + ("" + attrValue).replace(/(\<\>\'\"\:)/g, "\\$1") + "'") : "") + "]" + (tail || ""));
}

//get part value by name, default from window.location.search.
var getSearchPart = function (name, searchString) {
	if (!searchString) searchString = window.location.search;

	if (typeof URLSearchParams === "function") return (new URLSearchParams(searchString)).get(name);

	var mr = searchString.match(new RegExp("(^|\\?|\\&)" + name + "\\=([^\\&]*)($|\\&)"));
	return mr && mr[2];
}

//call MutationObserver.observe() for single object, default for single attribute.
//callback: function( mutationItem )
var observeSingleMutation = function (target, optionOrAttribute, callback) {
	if (typeof optionOrAttribute === "string") optionOrAttribute = { attributes: true, attributeFilter: [optionOrAttribute], attributeOldValue: true };

	var mo = new MutationObserver(function (mutationList) { return callback(mutationList[mutationList.length - 1]); });
	mo.observe(target, optionOrAttribute);
	return mo;
}

//compatible tool for dispatchEvent()
var dispatchEventByName = function (el, eventName, delay) {
	var evt;
	if (typeof Event === "function") { evt = new Event(eventName); }
	else {
		evt = document.createEvent('Event');	//ie11
		evt.initEvent(eventName, true, true);
	}

	if (delay >= 0) { setTimeout(function () { ele(el).dispatchEvent(evt); }, delay); }
	else { ele(el).dispatchEvent(evt); }
}

// module

module.exports = {

	//insert_adjacent_return
	insertAdjacent: insert_adjacent_return,

	appendHtml: insert_adjacent_return.append,
	appendBodyHtml: appendBodyHtml,
	prependHtml: insert_adjacent_return.prepend,

	//other
	querySelectorByAttr: querySelectorByAttr,

	getSearchPart: getSearchPart,

	observeSingleMutation: observeSingleMutation,

	dispatchEventByName: dispatchEventByName,

};
