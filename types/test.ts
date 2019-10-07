import * as modbus from "modbus-stream";

// $ExpectType void
modbus.tcp.connect(502, "134.2.56.231", { debug: "automaton-2454" }, (
    err, // $ExpectType Error | null
    connection // $ExpectType TCPStream
) => {
    // ...
});

modbus.tcp.server({ debug: "server" }, (
    connection // $ExpectType TCPStream
) => {
    // ...
}).listen(502, () => {
    // ready
});

// $ExpectType void
modbus.udp.connect(502, "134.2.56.231", { debug: "automaton-2454" }, (
    err, // $ExpectType Error | null
    connection // $ExpectType TCPStream
) => {
    // ...
});

modbus.udp.server({ debug: "server" }, (
    connection // $ExpectType TCPStream
) => {
    // ...
}).listen(502, () => {
    // ready
});
