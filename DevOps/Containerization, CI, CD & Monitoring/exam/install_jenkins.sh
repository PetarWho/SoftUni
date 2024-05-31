#!/bin/bash

echo "* Add and import the repository key"
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
sudo yum install -y java-11-openjdk-devel jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins


echo "* Udpate repositories and install components"
#dnf update
dnf install -y java-17-openjdk jenkins git

echo "* Start the service"
systemctl enable --now jenkins

echo "* Adjust firewall"
firewall-cmd --permanent --add-port=8080/tcp
firewall-cmd --reload

echo "* Admin password is:"
cat /var/lib/jenkins/secrets/initialAdminPassword