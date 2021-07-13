const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

class TopologyAPI {
  constructor() {
    this.topologies = []
  }

  getTopology(filter) {
    return this.topologies.filter(filter);
  }

  async readJson(fileName) {
    const data = await readFile(path.resolve() + `/${fileName}.json`);
    const topology = JSON.parse(data);

    this.topologies.push(topology);

    return topology;
  }

  async writeJson(id) {
    const topology = this.getTopology({ id });

    await writeFile(path.resolve() + `/output/topology_${id}.json`, JSON.stringify(topology));

    return topology;
  }
}

const obj = new TopologyAPI();

obj.readJson('topology')