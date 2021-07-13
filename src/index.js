const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;

const readFile = promisify(fs.readFile);

class TopologyAPI {
  constructor() {
    this.topologies = []
  }

  async readJson(fileName) {
    const data = await readFile(path.resolve() + `/${fileName}.json`);
    const topology = JSON.parse(data);

    this.topologies.push(topology);

    return topology;
  }
}

const obj = new TopologyAPI();

obj.readJson('topology')