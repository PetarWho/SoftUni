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

resource "docker_image" "img-exporter" {
    name = "danielqsj/kafka-exporter"
}

resource "docker_container" "exporter" {
    name = "exporter"
    image = docker_image.img-exporter.image_id
    env = ["kafka.server=kafka:9092"]
    ports {
        internal = 9308
        external = 9308
    }
    networks_advanced { 
        name = "exam-prep"
    }
}