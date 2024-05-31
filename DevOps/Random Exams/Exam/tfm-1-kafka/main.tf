terraform {
  required_providers {
    docker = {
      source = "kreuzwerker/docker"
    }
  }
}
provider "docker" {
  host = "unix:///var/run/docker.sock"
}

resource "docker_image" "img-zookeeper" {
  name = "bitnami/zookeeper:latest"
}

resource "docker_image" "img-kafka" {
  name = "bitnami/kafka:latest"
}

resource "docker_container" "zookeeper" {
  name   = "zookeeper"
  image  = docker_image.img-zookeeper.name
  env    = ["ALLOW_ANONYMOUS_LOGIN=yes"]
  ports {
    internal = 2181
    external = 2181
  }
  networks_advanced {
    name = "exam"
  }
}

resource "docker_container" "kafka" {
  name   = "kafka"
  image  = docker_image.img-kafka.name
  env    = [
    "KAFKA_BROKER_ID=1",
    "KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181",
    "ALLOW_PLAINTEXT_LISTENER=yes"
  ]
  ports {
    internal = 9092
    external = 9092
  }
  networks_advanced {
    name = "exam"
  }
  depends_on = [
    docker_container.zookeeper,
  ]
}
