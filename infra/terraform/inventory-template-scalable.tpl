all:
  vars:
    ansible_python_interpreter: /usr/bin/python3
  children:
    webservers:
      hosts:
%{ for i, ip in public_ips ~}
        server-${i}-public:
          ansible_host: ${ip}
          ansible_user: ubuntu
          ansible_ssh_private_key_file: ${ssh_key_path}
%{ endfor ~}
    
    public_servers:
      hosts:
%{ for i, ip in public_ips ~}
        server-${i}-public:
          ansible_host: ${ip}
          ansible_user: ubuntu
          ansible_ssh_private_key_file: ${ssh_key_path}
%{ endfor ~}
    
    private_servers:
      hosts:
%{ for i, ip in private_ips ~}
        server-${i}-private:
          ansible_host: ${ip}
          ansible_user: ubuntu
          ansible_ssh_private_key_file: ${ssh_key_path}
%{ endfor ~}