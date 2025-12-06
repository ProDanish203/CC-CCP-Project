# General
app_name    = "cc-ccp"
environment = "dev"
region      = "ap-south-1"

# VPC
vpc_cidr             = "10.123.0.0/16"
azs                  = ["ap-south-1a", "ap-south-1b"]
public_subnet_cidrs  = ["10.123.1.0/24", "10.123.2.0/24"]
private_subnet_cidrs = ["10.123.10.0/24", "10.123.20.0/24"]

# Compute
ami                  = "ami-02521d90e7410d9f0"
instance_type        = "t2.micro"
key_name             = "tf-key"
ssh_public_key_path  = "~/.ssh/mainkey.pub"
ssh_private_key_path = "~/.ssh/mainkey"
