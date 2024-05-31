$packages = ['httpd', 'php', 'php-mysqlnd', 'git']

package { $packages: }

vcsrepo { '/code':
  ensure   => present,
  provider => git,
  source   => 'https://github.com/shekeriev/do2-app-pack.git',
}

file_line { 'hosts-web':
  ensure => present,
  path   => '/etc/hosts',
  line   => '192.168.99.101  web.do2.lab  web',
  match  => '^192.168.99.101',
}

file_line { 'hosts-db':
  ensure => present,
  path   => '/etc/hosts',
  line   => '192.168.99.102  db.do2.lab  db',
  match  => '^192.168.99.102',
}

file { '/etc/httpd/conf.d/vhost-app1.conf':
  ensure  => present,
  content => "Listen 8081\n
<VirtualHost *:8081>
    DocumentRoot \"/var/www/app1\"
</VirtualHost>",
}

file { '/etc/httpd/conf.d/vhost-app2.conf':
  ensure  => present,
  content => "Listen 8082\n
<VirtualHost *:8082>
    DocumentRoot \"/var/www/app2\"
</VirtualHost>",
}

file { '/var/www/app1':
  ensure  => 'directory',
  recurse => true,
  source  => '/code/app1/web/',
}

file { '/var/www/app2':
  ensure  => 'directory',
  recurse => true,
  source  => '/code/app2/web/',
}

class { 'firewall': }

firewall { '000 accept 8081/tcp':
  action => 'accept',
  dport  => 8081,
  proto  => 'tcp',
}

firewall { '001 accept 8082/tcp':
  action => 'accept',
  dport  => 8082,
  proto  => 'tcp',
}

class { 'selinux':
  mode => 'permissive',
}

service { 'httpd':
  ensure => running,
  enable => true,
}
