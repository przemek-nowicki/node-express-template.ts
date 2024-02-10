# mTLS scripts

In this folder, you'll find two scripts that you may use for setting up and testing mTLS locally:

`generate_certificate.sh` - This script generates the **server** and **client** keys needed to set up a **secure mTLS connection**. It's straightforward and tailored for **local development** and testing. After running the script besides the above keys, you'll get **copy_these_keys_to.env.local** file that containse base64-encoded environment variables for the server. Simply copy the content of the file into **.env.local** file, and after build node server will be ready to recognize these credentials.

There is also included a `client_tests.sh` script for a quick validation of local mTLS setup. It runs tests making HTTP requests with and without the client certificate using curls, showing that the setup works localy.

For a production-ready solution, it's essential to use certificates signed by a trusted Certificate Authority (CA) to ensure the highest level of security and trustworthiness of mTLS setup.
