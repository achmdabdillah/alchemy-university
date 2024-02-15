class MerkleTree {
  constructor(leaves, concat) {
    this.leaves = leaves;
    this.concat = concat;
  }
  getRoot() {
    if (this.leaves.length == 1) {
      return this.leaves[0];
    } else {
      // count layer levels
      let i = 2;
      let layer = 1;
      while (i !== this.leaves.length) {
        if (i <= this.leaves.length) {
          break;
        } else {
          layer++;
          i *= 2;
        }
      }

      // slice the array based on levels
      let chunksSize = 2;
      let sliceArray = (array, level) => {
        if (array.length === 3) {
          let tmp = this.concat(array[0], array[1]);
          return this.concat(tmp, array[2]);
        } else if (array.length === 2) {
          return this.concat(...array);
        } else {
          while (level < layer) {
            let chunks = [];
            if (array.length % 2 == 0) {
              for (let i = 0; i < array.length; i += chunksSize) {
                const chunk = array.slice(i, i + chunksSize);
                chunks.push(this.concat(...chunk));
              }
            } else {
              for (let i = 0; i < array.length - 1; i += chunksSize) {
                const chunk = array.slice(i, i + chunksSize);
                chunks.push(this.concat(...chunk));
              }
              chunks.push(array[array.length - 1]);
            }
            return sliceArray(chunks, level++);
          }
        }
      };
      return sliceArray(this.leaves, 0);
    }
  }

  getProof(index) {
    // count layer levels
    let i = 2;
    let layer = 1;

    while (true) {
      if (i >= this.leaves.length) {
        break;
      } else {
        layer++;
        i *= 2;
      }
    }

    let chunksSize = 2;
    let tree = [this.leaves];

    // generate tree
    let generateMerkleTree = (array, level) => {
      if (array.length === 3) {
        let lastElement = array.slice(-1);
        let join = array.slice(0, -1).join("");
        tree[level] = [join, ...lastElement];
      } else if (array.length === 2) {
        tree[level] = [array.join("")];
      } else {
        while (level < layer) {
          let chunks = [];
          if (array.length % 2 == 0) {
            for (let i = 0; i < array.length; i += chunksSize) {
              const chunk = array.slice(i, i + chunksSize);
              chunks.push(chunk.join(""));
            }
          } else {
            for (let i = 0; i < array.length - 1; i += chunksSize) {
              const chunk = array.slice(i, i + chunksSize);
              chunks.push(chunk.join(""));
            }
            chunks.push(array[array.length - 1]);
          }
          tree[level] = chunks;
          return generateMerkleTree(chunks, ++level);
        }
      }
      return tree;
    };
    tree = generateMerkleTree(this.leaves, 1);

    let proof = [{}];

    if (index % 2 == 0) {
      proof = [{ data: this.leaves[index + 1], left: false }];
    } else {
      proof = [{ data: this.leaves[index - 1], left: true }];
    }

    let tmp;
    if (index % 2 == 0) {
      tmp = this.leaves[index] + proof[0].data;
    } else {
      tmp = proof[0].data + this.leaves[index];
    }

    let generateProof = (proof, level, tmp) => {
      while (level < layer) {
        for (let row = 1; row < tree.length; row++) {
          for (let col = 0; col < tree[row].length; col++) {
            if (tree[row][col] == tmp) {
              if (col % 2 != 0) {
                if (col > 0) {
                  proof.push({
                    data: tree[row][col - 1],
                    left: (col - 1) % 2 == 0,
                  });
                  tmp = proof[level].data + tmp;
                }
              } else {
                if (col < tree[row].length - 1) {
                  proof.push({
                    data: tree[row][col + 1],
                    left: (col + 1) % 2 == 0,
                  });
                  tmp = tmp + proof[level].data;
                }
              }
              return generateProof(proof, ++level, tmp);
            }
          }
        }
        return proof;
      }
      return proof;
    };

    proof = generateProof(proof, 1, tmp);
    return proof;
  }
}

const concat = (a, b) => `Hash(${a} + ${b})`;
const leaves1 = ["A", "B"];
const merkleTree1 = new MerkleTree(leaves1, concat);

const leaves2 = ["A", "B", "C", "D"];
const merkleTree2 = new MerkleTree(leaves2, concat);

const leaves3 = ["A", "B", "C", "D", "E", "F", "G", "H"];
const merkleTree3 = new MerkleTree(leaves3, concat);

const leaves4 = ["A", "B", "C"];
const merkleTree4 = new MerkleTree(leaves4, concat);

const leaves5 = ["A", "B", "C", "D", "E"];
const merkleTree5 = new MerkleTree(leaves5, concat);

const leaves6 = ["A", "B", "C", "D", "E", "F", "G"];
const merkleTree6 = new MerkleTree(leaves6, concat);

const leaves7 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const merkleTree7 = new MerkleTree(leaves7, concat);

// merkleTree1.getRoot();
// merkleTree2.getRoot();
// merkleTree3.getRoot();
// merkleTree4.getRoot();
// merkleTree5.getRoot();
// merkleTree6.getRoot();

// merkleTree1.getProof(1);
// merkleTree2.getProof();
// merkleTree3.getProof();
// merkleTree4.getProof();
// merkleTree5.getProof(2);
// merkleTree6.getProof();
console.log(merkleTree7.getProof(0));
