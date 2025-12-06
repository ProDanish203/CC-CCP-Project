resource "aws_security_group" "app_sg" {
  name        = "${var.app_name}-${var.environment}-sg"
  description = "Security group for ${var.app_name} in ${var.environment} environment"
  vpc_id      = aws_vpc.main.id
}

# SSH access
resource "aws_vpc_security_group_ingress_rule" "ssh" {
  security_group_id = aws_security_group.app_sg.id
  description       = "SSH access"
  from_port         = 22
  to_port           = 22
  ip_protocol       = "tcp"
  cidr_ipv4         = "0.0.0.0/0"
}

# HTTP access
resource "aws_vpc_security_group_ingress_rule" "http" {
  security_group_id = aws_security_group.app_sg.id
  description       = "HTTP access"
  from_port         = 80
  to_port           = 80
  ip_protocol       = "tcp"
  cidr_ipv4         = "0.0.0.0/0"
}

# HTTPS access
resource "aws_vpc_security_group_ingress_rule" "https" {
  security_group_id = aws_security_group.app_sg.id
  description       = "HTTPS access"
  from_port         = 443
  to_port           = 443
  ip_protocol       = "tcp"
  cidr_ipv4         = "0.0.0.0/0"
}

# Application port (for development/testing)
resource "aws_vpc_security_group_ingress_rule" "app_port" {
  security_group_id = aws_security_group.app_sg.id
  description       = "Application port"
  from_port         = 3000
  to_port           = 3000
  ip_protocol       = "tcp"
  cidr_ipv4         = "0.0.0.0/0"
}

# All outbound traffic
resource "aws_vpc_security_group_egress_rule" "all_outbound" {
  security_group_id = aws_security_group.app_sg.id
  description       = "All outbound traffic"
  ip_protocol       = "-1"
  cidr_ipv4         = "0.0.0.0/0"
}
