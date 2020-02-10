const net = require("net"),
  server = net.createServer(connection => {
    console.log("Subscriber connected.");
    connection.write('{"type":"changed","file":"targ');

    let timer = setTimeout(() => {
      connection.write('et.txt","timestamp":1358175758495' + "\n");
      connection.end();
    }, 1000);
    connection.on("end", () => {
      clearTimeout(timer);
      console.log("Subscriber disconnected");
    });
  });

server.listen(5432, () => {
  console.log("Test server listening for subscribers...");
});
