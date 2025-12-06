output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "IDs of the public subnets"
  value       = aws_subnet.public_subnets.*.id
}

output "private_subnet_ids" {
  description = "IDs of the private subnets"
  value       = aws_subnet.private_subnets[*].id
}

output "instance_ids" {
  description = "IDs of the EC2 instances"
  value       = aws_instance.app_instance[*].id
}

output "instance_ips" {
  description = "Public IPs of the EC2 instances"
  value       = aws_instance.app_instance[*].public_ip
}
