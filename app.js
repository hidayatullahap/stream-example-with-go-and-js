// https://stackoverflow.com/questions/6789703/how-to-write-javascript-in-client-side-to-receive-and-parse-chunked-response-i
fetch("http://localhost:1323").then(function (response) {
    console.log('Stream start');
    let reader = response.body.getReader();
    let decoder = new TextDecoder();

    return readData();

    function readData() {
        return reader.read().then(function ({ value, done }) {
            if (done) {
                console.log('Stream complete');
                return;
            }

            let newData = decoder.decode(value, { stream: !done });
            console.log(newData);
            return readData();
        });
    }
});