resource "null_resource" "webservers" {
  provisioner "local-exec" {
    command = <<EOH
      sleep 10 && ansible public_servers -i inventory/hosts.yaml -m ping -e 'ansible_ssh_common_args="-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"'
    EOH
  }
  depends_on = [local_file.ansible_inventory]
}
