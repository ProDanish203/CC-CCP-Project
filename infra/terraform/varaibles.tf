# General variables
variable "region" {
  description = "AWS region to deploy resources"
  type        = string
}

variable "app_name" {
  description = "Name of the application"
  type        = string
}

variable "environment" {
  description = "Environment for the application (e.g., dev, prod)"
  type        = string

  validation {
    condition     = contains(["prod", "dev", "test"], var.environment)
    error_message = "Environment must be one of 'prod', 'dev', or 'test'."
  }
}

# VPC
variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
}

variable "public_subnet_cidrs" {
  description = "CIDR block for the public subnet"
  type        = list(string)
}

variable "private_subnet_cidrs" {
  description = "CIDR block for the private subnet"
  type        = list(string)
}

variable "azs" {
  description = "List of availability zones"
  type        = list(string)
}

# Compute
variable "ami" {
  description = "AMI ID for the instance"
  type        = string
  default     = "ami-02521d90e7410d9f0"
}

variable "instance_type" {
  description = "Type of instance to use"
  type        = string
  default     = "t2.micro"
}

variable "key_name" {
  description = "Name of the SSH key pair"
  type        = string
  default     = "tf-key"
}

variable "ssh_public_key_path" {
  description = "Path to SSH public key"
  type        = string
  default     = "~/.ssh/mainkey.pub"
}

variable "ssh_private_key_path" {
  description = "Path to SSH public key"
  type        = string
  default     = "~/.ssh/mainkey"
}
