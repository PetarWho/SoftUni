#!/bin/bash

echo "* Add Docker repository"
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/9/x86_64/stable
sudo rpm --import https://download.docker.com/linux/centos/gpg

echo "* Install the packages (ocker)"
sudo dnf install -y docker-ce docker-ce-cli containerd.io

echo "* Start Docker service"
sudo systemctl enable --now docker

echo "* Adjust the group membership"
usermod -aG docker vagrant

echo "* Adjust firewall"
firewall-cmd --permanent --add-port=3000/tcp
firewall-cmd --permanent --add-port=9090/tcp
firewall-cmd --reload
