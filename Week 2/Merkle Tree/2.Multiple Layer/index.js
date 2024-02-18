class MerkleTree {
  constructor(leaves, concat) {
    this.leaves = leaves;
    this.concat = concat;
  }

  getRoot() {
    let arr = this.leaves;
    while (arr.length > 1) {
      arr = this.getNextLayer(arr);
    }
    return arr;
  }

  getNextLayer(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (i % 2 == 0) {
        newArr.push(this.concat(arr[i], arr[i + 1]));
      }
    }
    return newArr;
  }
}
