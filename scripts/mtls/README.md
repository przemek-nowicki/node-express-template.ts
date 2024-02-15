# Use scripts to creat Self-Signed Certificates for Local mTLS Testing

In this folder, you'll find two scripts that you may use for setting up and testing mTLS locally:

`generate_certificate.sh` - This script generates the **server** and **client** keys needed to set up a **secure mTLS connection**. It's straightforward and tailored for **local development** and testing. After running the script besides the above keys, you'll get **copy_these_keys_to.env.local** file that containse base64-encoded environment variables for the server. Simply copy the content of the file into **.env.local** file, and after build node server will be ready to recognize these credentials.

There is also included a `client_tests.sh` script for a quick validation of local mTLS setup. It runs tests making HTTP requests with and without the client certificate using curls, showing that the setup works localy.

```console
$ ./client_tests.sh
Testing request WITH client certificate...
Test with certificate PASSED: Able to access https://localhost:8080/api/secure/test-data
Response: {"status":"OK","data":"Secure data protected by mTLS"}

Testing request WITHOUT client certificate...
Test without certificate PASSED: Correctly denied access to https://localhost:8080/api/secure/test-data
```

You can also run the `client.js` javascript client via Node.js to test local mTLS (btw, just don't forget to run NET.ts server before you start testing those clients ;).

```console
node client.js
Attempt to call: https://localhost//api/secure/test-data:8080 with client certificate and key
SERVER RESPONSE
STATUS: 200
Response body: {"status":"OK","data":"Secure data protected by mTLS"}
--
```

Important: For a production-ready solution, it's essential to use certificates signed by a trusted Certificate Authority (CA) to ensure the highest level of security and trustworthiness of mTLS setup.

If you need this setup to work on AWS, just drop me a line.
