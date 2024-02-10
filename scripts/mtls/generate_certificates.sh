#!/bin/bash
# To run this script execute: chmod +x generate_certificates.sh 

# Function to check if OpenSSL is installed
check_openssl() {
  if ! command -v openssl &> /dev/null; then
    echo "OpenSSL is required but not found. Please install OpenSSL before generating certificates."
    exit 1
  fi
}

# Function to generate the CA certificate and key
generate_ca() {
  openssl genrsa -out ca.key 2048
  openssl req -x509 -new -nodes -key ca.key -sha256 -days 365 -out ca.crt -subj "/CN=MyCA"
}

# Function to generate the server certificate and key signed by the CA
generate_server_cert() {
  openssl genrsa -out server.key 2048
  openssl req -new -key server.key -out server.csr -subj "/CN=localhost"
  openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days 365 -sha256
}

# Function to generate the client certificate and key signed by the CA
generate_client_cert() {
  openssl genrsa -out client.key 2048
  openssl req -new -key client.key -out client.csr -subj "/CN=Client"
  openssl x509 -req -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt -days 365 -sha256
}

# Encode files in base64 and create output file
encode_and_create_env() {
  # Use command substitution with cat to ensure file content is correctly passed to base64
  MTLS_SERVER_KEY=$(base64 < server.key)
  MTLS_SERVER_CERT=$(base64 < server.crt)
  MTLS_CA_CERT=$(base64 < ca.crt)
  
  cat <<EOF > copy_these_keys_to.env.local
# mTLS config
MTLS_SERVER_KEY=$MTLS_SERVER_KEY
MTLS_SERVER_CERT=$MTLS_SERVER_CERT
MTLS_CA_CERT=$MTLS_CA_CERT
EOF
}


# Main execution
check_openssl
generate_ca
generate_server_cert
generate_client_cert
encode_and_create_env
cleanup() {
  rm -f ca.srl server.csr client.csr
}
cleanup
