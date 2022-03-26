function aquarium(input){
    let length = Number(input[0]);
    let width = Number(input[1]);
    let height = Number(input[2]);
    let percent = Number(input[3]);

    let volume = length * width * height;
    let liters = volume * 0.001;
    percent = percent * 0.01;
    let realLiters = liters * (1-percent);

    console.log(realLiters);
}
aquarium(["85", "75", "47", "17"])