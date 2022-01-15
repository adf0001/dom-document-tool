
// dom-document-tool @ npm, dom document tool.

//call .querySelector() by attribute name and value
var querySelectorByAttr = function (el, head, attrName, attrValue, tail) {
	if(typeof el === "string") el= document.getElementById(el);

	return el.querySelector((head || "") + "[" + attrName + ((typeof attrValue !== "undefined" && attrValue !== null) ? ("='" + ("" + attrValue).replace(/(\<\>\'\"\:)/g, "\\$1") + "'") : "") + "]" + (tail || ""));
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

	if(typeof el === "string") el= document.getElementById(el);

	if (delay >= 0) { setTimeout(function () { el.dispatchEvent(evt); }, delay); }
	else { el.dispatchEvent(evt); }
}

// module

module.exports = {

	querySelectorByAttr: querySelectorByAttr,

	getSearchPart: getSearchPart,

	observeSingleMutation: observeSingleMutation,

	dispatchEventByName: dispatchEventByName,

};
