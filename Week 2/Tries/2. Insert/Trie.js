const TrieNode = require("./TrieNode");

class Trie {
  constructor() {
    this.root = new TrieNode(null);
  }

  insert(data) {
    let head = this.root;

    let insertOnHead = (head, data) => {
      while (data.length > 0) {
        let curr = data.shift();
        head.children[curr] = {
          key: curr,
          isWord: data.length == 0,
          children: {},
        };
        if (data.length != 0) {
          head.children[curr].children[data[0]] = data[0];
        }

        head = head.children[curr];
        return insertOnHead(head, data);
      }
    };

    insertOnHead(head, data.split(""));
  }
}
