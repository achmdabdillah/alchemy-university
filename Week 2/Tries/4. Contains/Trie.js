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

        if (!head.children[curr]) {
          head.children[curr] = {
            key: curr,
            isWord: data.length == 0,
            children: {},
          };
        }
        head = head.children[curr];
        return insertOnHead(head, data);
      }
    };

    insertOnHead(head, data.split(""));
  }

  contains(data) {
    let head = this.root;

    let search = (head, data) => {
      while (true) {
        let curr = data.shift();
        if (head.children[curr]) {
          if (head.children[curr].key == curr) {
            if (data.length == 0 && head.children[curr].isWord) {
              return true;
            } else {
              head = head.children[curr];
              return search(head, data);
            }
          }
        } else {
          return false;
        }
      }
    };

    return search(head, data.split(""));
  }
}
