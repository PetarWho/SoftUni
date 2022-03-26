function usdToBgn(input){
    let usd = Number(input[0]);
    const usdInBgn = 1.79549;
    let bgn = usd * usdInBgn;

    console.log(bgn);
}
usdToBgn([50]);