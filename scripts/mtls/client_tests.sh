#!/bin/bash

# URLs to test
URL_WITH_CERT="https://localhost:8080/api/secure/test-data"
URL_WITHOUT_CERT="https://localhost:8080/api/secure/test-data"

# Check if client certificate files exist
if [[ ! -f "client.crt" ]] || [[ ! -f "client.key" ]]; then
    echo "Client certificate files not found. Please execute generate_certificates.sh script first."
    exit 1
fi

# Function to test request with client certificate
test_with_cert() {
    echo "Testing request WITH client certificate..."
    response=$(curl --cert client.crt --key client.key --cacert ca.crt --silent $URL_WITH_CERT)
    http_status=$(curl --cert client.crt --key client.key --cacert ca.crt --silent --output /dev/null --write-out "%{http_code}" $URL_WITH_CERT)
    if [ $http_status -eq 200 ]; then
        echo "Test with certificate PASSED: Able to access $URL_WITH_CERT"
        echo "Response: $response"
    else
        echo "Test with certificate FAILED: Unable to access $URL_WITH_CERT"
    fi
}

# Function to test request without client certificate
test_without_cert() {
    echo -e "\nTesting request WITHOUT client certificate..."
    response=$(curl --silent $URL_WITHOUT_CERT)
    http_status=$(curl --silent --output /dev/null --write-out "%{http_code}" $URL_WITHOUT_CERT)
    if [ $http_status -ne 200 ]; then
        echo "Test without certificate PASSED: Correctly denied access to $URL_WITHOUT_CERT"
    else
        echo "Test without certificate FAILED: Should not have been able to access $URL_WITHOUT_CERT"
    fi
}

# Execute tests
test_with_cert
test_without_cert