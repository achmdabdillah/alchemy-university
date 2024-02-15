class MerkleTree {
  constructor(leaves, concat) {
    this.leaves = leaves;
    this.concat = concat;
  }
  getRoot() {
    let arr = [...this.leaves];
    while (arr.length != 1) {
      arr = this.getNextLayer(arr);
    }
    return arr[0];
  }

  getNextLayer(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (i % 2 !== 0) {
        newArr.push(this.concat(arr[i - 1], arr[i]));
      } else if (i === arr.length - 1) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  }

  getProof(index) {
    let proof = [];
    let arr = [...this.leaves];
    while (arr.length != 1) {
      if (index % 2 === 0) {
        if (index < arr.length - 1) {
          proof.push({
            data: arr[index + 1],
            left: false,
          });
        }
      } else {
        console.log("masuk", index);
        proof.push({ data: arr[index - 1], left: true });
      }

      arr = this.getNextLayer(arr);
      index = Math.floor(index / 2);
    }

    return proof;
  }
}

const concat = (a, b) => `Hash(${a} + ${b})`;
const leaves = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const merkleTree = new MerkleTree(leaves, concat);

// merkleTree1.getRoot();
console.log("mine", merkleTree.getProof(7));
