# resource "local_file" "ansible_inventory" {
#   content = templatefile("${path.module}/inventory-template.yaml", {
#     server_1 = aws_instance.app_instance[0].public_ip
#     server_2 = aws_instance.app_instance[1].public_ip

#     pvt_server_1 = aws_instance.app_instance[0].private_ip
#     pvt_server_2 = aws_instance.app_instance[1].private_ip

#     ssh_key_path = var.ssh_private_key_path
#   })
#   filename   = "${path.module}/../ansible/inventory/hosts.yaml"
#   depends_on = [aws_instance.app_instance]
# }

# When there are greater number of instances
resource "local_file" "ansible_inventory" {
  content = templatefile("${path.module}/inventory-template-scalable.tpl", {
    # Generate arrays of IPs dynamically
    public_ips  = [for instance in aws_instance.app_instance : instance.public_ip]
    private_ips = [for instance in aws_instance.app_instance : instance.private_ip]
    ssh_key_path = var.ssh_private_key_path

    # Generate instance count for loops
    instance_count = length(aws_instance.app_instance)
  })
  filename   = "${path.module}/../ansible/inventory/hosts.yaml"
  depends_on = [aws_instance.app_instance]
}
