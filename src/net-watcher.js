const fs = require("fs"),
  net = require("net"),
  filename = process.argv[2];

if (!filename) {
  throw Error("Error: No filename specified.");
}
net
  .createServer(connection => {
    console.log("Subscriber connected.");
    // connection.write("Now watching " + filename + " for changes...\n");
    connection.write(
      JSON.stringify({
        type: "watching",
        file: filename
      }) + "\n"
    );
    let watcher = fs.watch(filename, () => {
      // connection.write("File " + filename + " changed: " + Date.now() + "\n");
      connection.write(
        JSON.stringify({
          type: "changed",
          file: filename,
          timestamp: Date.now()
        }) + "\n"
      );
    });
    connection.on("close", () => {
      console.log("Subscriber disconnected.");
      watcher.close();
    });
  })
  .listen(5432, () => {
    console.log("Listening for subscribers...");
  });
