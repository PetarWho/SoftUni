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

resource "docker_image" "img-kafka-prod" {
    name = "shekeriev/kafka-prod"
}

resource "docker_image" "img-kafka-cons" {
    name = "shekeriev/kafka-cons"
}

resource "docker_container" "kafka-producer" {
    name = "kafka-producer"
    image = docker_image.img-kafka-prod.image_id
    env = ["BROKER=kafka:9092", "TOPIC=prep"]
    networks_advanced{
        name = "exam-prep"
    }
}

resource "docker_container" "kafka-consumer" {
    name = "kafka-consumer"
    image = docker_image.img-kafka-cons.image_id
    env = ["BROKER=kafka:9092", "TOPIC=prep"]
    networks_advanced{
        name = "exam-prep"
    }
}