#!/bin/bash

echo "* Add Docker repository"
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/9/x86_64/stable

echo "* Install the packages (Java, git Docker)"
sudo dnf install -y java-17-openjdk git docker-ce docker-ce-cli containerd.io

echo "* Start Docker service"
sudo systemctl enable --now docker

echo "* Adjust the group membership"
usermod -aG docker vagrant

echo "* Adjust firewall"
firewall-cmd --permanent --add-port=8080/tcp
firewall-cmd --reload
