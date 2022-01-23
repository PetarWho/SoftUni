function constructionCrew(obj){

    if(obj.dizziness){
        let litersToDrink = (0.1*obj.weight)*obj.experience;
        obj.levelOfHydrated+=litersToDrink;
        obj.dizziness = false;
    }
      return obj;
}
constructionCrew({ weight: 80,
    experience: 1,
    levelOfHydrated: 0,
    dizziness: true }
  )