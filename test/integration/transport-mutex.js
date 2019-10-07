var assert = require("assert");
var help   = require("../help");

describe("transport passing a mutex", function () {


	function Mutex(completed) {
		var locked = false;
		var queue  = [];
		var check  = function () {
			if (locked) return;
			if (!queue.length) return;

			var item = queue.shift();

			locked = true;

			item(function () {
				locked = false;
				completed();
				check();
			});
		};

		return {
			lock : function (next) {
				queue.push(next);
				check();
			}
		}
	}
});
