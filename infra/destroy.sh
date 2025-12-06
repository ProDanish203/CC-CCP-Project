#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Main function
main() {
    print_warning "This will destroy all infrastructure. Are you sure? (y/N)"
    read -r response
    
    if [[ "$response" =~ ^[Yy]$ ]]; then
        print_status "Destroying infrastructure with Terraform..."
        cd infra
        terraform destroy -var-file=terraform.tfvars -auto-approve
        print_status "🗑️ Infrastructure destroyed successfully!"
    else
        print_status "Cleanup cancelled."
    fi
}

# Run main function
main "$@"