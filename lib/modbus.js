exports.transports = {
	tcp    : require("./transport/tcp"),
	ascii  : require("./transport/ascii"),
};

exports.drivers = {
	tcp    : require("./driver/tcp"),
	udp    : require("./driver/udp")
};

exports.stream = require("./stream");
exports.pdu    = require("modbus-pdu");

exports.tcp = {
	connect : function () {
		var port    = 502;
		var host    = "localhost";
		var options = {};
		var next    = noop;

		Array.prototype.slice.apply(arguments).map(function (arg) {
			switch (typeof arg) {
				case "number":
					port = arg;
					break;
				case "string":
					host = arg;
					break;
				case "object":
					options = arg;
					break;
				case "function":
					next = arg;
					break;
			}
		});

		if (typeof options.retry == "undefined") {
			options.retry = 30000;
		}

		var socket = exports.drivers.tcp.connect(port, host, options);

		socket.attach(exports.transports.tcp.prepare(options), next);
	},
	server : function () {
		var options = {};
		var next    = noop;

		Array.prototype.slice.apply(arguments).map(function (arg) {
			switch (typeof arg) {
				case "object":
					options = arg;
					break;
				case "function":
					next = arg;
					break;
			}
		});

		if (typeof options.retry == "undefined") {
			options.retry = 30000;
		}

		return exports.drivers.tcp.server(options).attach(exports.transports.tcp.prepare(options), next);
	}
};

exports.udp = {
	connect : function () {
		var port    = 502;
		var host    = "localhost";
		var options = {};
		var next    = noop;

		Array.prototype.slice.apply(arguments).map(function (arg) {
			switch (typeof arg) {
				case "number":
					port = arg;
					break;
				case "string":
					host = arg;
					break;
				case "object":
					options = arg;
					break;
				case "function":
					next = arg;
					break;
			}
		});

		if (typeof options.retry == "undefined") {
			options.retry = 3000;
		}

		var socket = exports.drivers.udp.connect(port, host, options);

		socket.attach(exports.transports.tcp.prepare(options), next);
	},
	server : function () {
		var options = {};
		var next    = noop;

		Array.prototype.slice.apply(arguments).map(function (arg) {
			switch (typeof arg) {
				case "object":
					options = arg;
					break;
				case "function":
					next = arg;
					break;
			}
		});

		if (typeof options.retry == "undefined") {
			options.retry = 3000;
		}

		return exports.drivers.udp.server(options).attach(exports.transports.tcp.prepare(options), next);
	}
};
function noop() {}
