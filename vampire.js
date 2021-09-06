class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let currentVampire = this;
    let cnt = 0;
    while (currentVampire.creator) {      
      currentVampire = currentVampire.creator;
      cnt++;
    }
    return cnt;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

    if (!this.creator)    return this;
    if (!vampire.creator) return vampire;
    if (this === vampire) return this;    
 
    if (this.numberOfVampiresFromOriginal === vampire.numberOfVampiresFromOriginal) {
      if (this.creator ===  vampire.creator) {
        return this.creator;
      }
      return this.creator.closestCommonAncestor(vampire.creator);
      
    } else {
      let juniorVampire;
      let seniorVampire;
      if (this.numberOfVampiresFromOriginal > vampire.numberOfVampiresFromOriginal) {
        juniorVampire = this;
        seniorVampire = vampire;
      } else {
        juniorVampire = vampire;
        seniorVampire = this;
      }

      if (seniorVampire === juniorVampire.creator) {
        return seniorVampire;
      } else {
        return seniorVampire.closestCommonAncestor(juniorVampire.creator);
      }
    }
  }
}

module.exports = Vampire;

