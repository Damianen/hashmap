class Node {
    Node(key, value) {
        this.value = value;
        this.key = key;
        this.next = null;
    }
}

class HashMap {
    #ArrayLength = 16;
    #valuesAmount = 0;
    #loadFactor = 0.8;
    #buckets = [16];
    
    HashMap() {}

    #hash(key) {
        let hashCode = 0;

        const primeNum = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNum  * hashCode + key.charCodeAt(i);
        }

        return hashCode % this.#ArrayLength;
    }

    resizeMap() {
        let nodes = this.#nodes();
        this.#buckets.clear();
        this.#ArrayLength += 16;
        this.#buckets = this.#ArrayLength;
        this.#valuesAmount = 0;

        for (let i = 0; i < nodes.length; i++) {
            this.set(nodes[i].key, nodes[i].value);
        }

    }

    set(key, value) {
        let node = new Node(key, value);
        let hashCode = this.#hash(key);

        if (index < 0 || index >= this.#buckets.length) {
            throw new Error("Trying to access index out of bound");
        }

        this.#valuesAmount++;

        if (this.#valuesAmount / this.#ArrayLength > this.#loadFactor) {
            this.resizeMap();
        }

        if (this.#buckets[hashCode] != null) {
            let n = this.#buckets[hashCode];

            while (n.next != null) {
                n = n.next;
            }

            n.next = node;
            return;
        } 

        this.#buckets[hashCode] = node;
    }

    get(key) {
        let hashCode = this.#hash(key);
        let node = this.#buckets[hashCode];

        if (node == null) {
            return null;
        } else {
            while (true) {
                if (node == null) {
                    return null;
                }

                if (node.key != key) {
                    node = node.next;
                    continue;
                }

                return node.value;
            }
        }
    }

    has(key) {
        let temp = this.get(key);

        if (temp == null) {
            return false;
        }
        
        return true;
    }

    remove(key) {
        let hashCode = this.#hash(key);
        let node = this.#buckets[hashCode];

        if (node == null) {
            return false;
        } else if (node.next == null) {
            if (node.key != key) {
                node = node.next;
                return false;
            }
            this.#buckets[hashCode] == null;
            return true;
        } else {
            let prevNode = null;
            while (true) {
                if (node == null) {
                    return false;
                }

                if (node.key != key) {
                    prevNode = node;
                    node = node.next;
                    continue;
                }

                if (prevNode == null) {
                    this.#buckets[hashCode] == node.next;
                    return true;
                }

                prevNode.next = node.next;
                return true;
            }
        }
    }

    length() {
        return this.#valuesAmount;
    }

    clear() {
        this.#buckets.clear();
        this.#buckets.length = 16;
        this.#ArrayLength = 16;
        this.#valuesAmount = 0;
    }

    #nodes() {
        let nodes = [];

        for (let i = 0; i < this.#buckets.length; i++) {
            let node = this.#buckets[i];
            
            if (node == null) {
                continue;
            }

            if (node.next == null) {
                nodes.push(node);
                continue;
            }

            while (node != null) {
                nodes.push(node);
                node = node.next;
            }
        }
    }

    keys() {
        let nodes = this.#nodes();
        let keys = [];

        for (let i = 0; i < nodes.length; i++) {
            keys.push(nodes[i].key);
        }
        
        return keys;
    }

    values() {
        let nodes = this.#nodes();
        let values = [];

        for (let i = 0; i < nodes.length; i++) {
            values.push(nodes[i].value);
        }
        
        return values;
    }

    entries() {
        let nodes = this.#nodes();
        let pairs = [];

        for (let i = 0; i < nodes.length; i++) {
            pairs.push([nodes[i].key, nodes[i].value]);
        }
        
        return pairs;
    }
}