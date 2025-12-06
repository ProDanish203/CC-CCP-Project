# To setup the infra

```bash
terraform apply -var-file=terraform.tfvars -auto-approve

# Ping the instances
ansible public_servers -i inventory/hosts.yaml -m ping -e 'ansible_ssh_common_args="-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"'
# If the controller node for ansible is in the same VPC, you can use the private_servers here as well, which is considered a better and secure approach.
```

# To Provision the servers using ansible.

```bash
cd ansible

ansible-playbook -i inventory/hosts.yaml main.ansible.yaml --limit public_servers -e 'ansible_ssh_common_args="-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"'
```
