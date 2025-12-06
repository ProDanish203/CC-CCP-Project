cat << EOF >> ~/.ssh/config

HOST ${hostname}
  HostName ${hostname}
  User ${user}
  IdentityFile {ssh_private_key_path}
EOF