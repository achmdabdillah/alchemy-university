function verifyProof(proof, node, root, concat) {
  let res;
  for (let i = 0; i < proof.length; i++) {
    if (proof[i].left) {
      if (i == 0) {
        res = concat(proof[i].data, node);
      } else {
        res = concat(proof[i].data, res);
      }
    } else {
      if (i == 0) {
        res = concat(node, proof[i].data);
      } else {
        res = concat(res, proof[i].data);
      }
    }
  }
  return res === root;
}
