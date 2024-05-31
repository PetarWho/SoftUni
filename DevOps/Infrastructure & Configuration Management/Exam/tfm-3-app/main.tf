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

resource "docker_image" "img-kafka-discoverer" {
    name = "shekeriev/kafka-discoverer"
}

resource "docker_image" "img-kafka-observer" {
    name = "shekeriev/kafka-observer"
}

resource "docker_container" "kafka-discoverer" {
    name = "kafka-discoverer"
    image = docker_image.img-kafka-discoverer.image_id
    env = ["BROKER=kafka:9092", "TOPIC=animal-facts", "METRICPORT=8000"]
    networks_advanced{
        name = "exam"
    }
}

resource "docker_container" "kafka-observer" {
    name = "kafka-observer"
    image = docker_image.img-kafka-observer.image_id
    env = ["BROKER=kafka:9092", "TOPIC=animal-facts", "APPPORT=80"]
    networks_advanced{
        name = "exam"
    }
}