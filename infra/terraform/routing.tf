# Public Route Table
# Purpose: Define the public route table and its routes for the VPC. used to route traffic from public subnets to the internet via an Internet Gateway.
resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.app_name}-${var.environment}-public-route-table"
  }
}

resource "aws_route" "public_route" {
  route_table_id         = aws_route_table.public_route_table.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.main_igw.id
}

resource "aws_route_table_association" "public_subnets_association" {
  count          = length(var.public_subnet_cidrs)
  subnet_id      = element(aws_subnet.public_subnets[*].id, count.index)
  route_table_id = aws_route_table.public_route_table.id
}

# Private Route Table
# Purpose: This route table is for private subnets, allowing them to route traffic internally and to NAT gateways if needed. Not connected to the internet directly.
resource "aws_route_table" "private_route_table" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.app_name}-${var.environment}-private-route-table"
  }
}

resource "aws_route_table_association" "private_subnets_association" {
  count          = length(var.private_subnet_cidrs)
  subnet_id      = element(aws_subnet.private_subnets[*].id, count.index)
  route_table_id = aws_route_table.private_route_table.id
}
