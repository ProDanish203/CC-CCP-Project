resource "aws_key_pair" "ssh_key" {
  key_name   = var.key_name
  public_key = file(var.ssh_public_key_path)

  tags = {
    Name = "${var.app_name}-${var.environment}-key"
  }
}

resource "aws_instance" "app_instance" {
  count         = 2
  ami           = var.ami
  instance_type = var.instance_type

  key_name = aws_key_pair.ssh_key.id

  # Add security group
  vpc_security_group_ids = [aws_security_group.app_sg.id]
  subnet_id              = element(aws_subnet.public_subnets[*].id, count.index)

  root_block_device {
    volume_size = 10
  }

  provisioner "local-exec" {
    command = templatefile("${path.module}/linux-ssh-config.tpl", {
      hostname             = self.public_ip
      user                 = "ubuntu"
      ssh_private_key_path = var.ssh_private_key_path
    })
    interpreter = ["bash", "-c"]
  }

  tags = {
    Name = "${var.app_name}-${var.environment}-instance-${count.index + 1}"
  }
}
