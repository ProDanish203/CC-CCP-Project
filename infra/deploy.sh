#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Step 1: Deploy infrastructure with Terraform
print_status "Deploying infrastructure with Terraform..."
cd infra
terraform apply -var-file=terraform.tfvars -auto-approve

# Step 2: Wait for instances to be ready
print_status "Waiting for instances to be ready..."
sleep 60

cd ../ansible

# Step 3: Test connectivity
print_status "Testing connectivity to instances..."
ansible public_servers -i inventory/hosts.yaml -m ping -e 'ansible_ssh_common_args="-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"'

# Step 4: Provision servers with Ansible
print_status "Provisioning servers with Ansible..."
ansible-playbook -i inventory/hosts.yaml main.ansible.yaml --limit public_servers -e 'ansible_ssh_common_args="-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"'

print_status "🎉 Deployment completed successfully!"