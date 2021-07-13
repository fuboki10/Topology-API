const fs = require('fs');
const path = require('path');
const logger = require('./logger');
const promisify = require('util').promisify;

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

class TopologyAPI {
  constructor() {
    this.topologies = []
  }

  getTopology(filter) {
    if (this.topologies.length == 0)
      return null;

    return this.topologies.filter(filter)[0];
  }

  async readJson(fileName) {
    const data = await readFile(path.resolve() + `/${fileName}.json`);
    const topology = JSON.parse(data);

    this.topologies.push(topology);

    return topology;
  }

  async writeJson(id) {
    const topology = this.getTopology({ id });

    if (!topology) {
      logger.error(`Topology with ID = ${id} is not found`);
      return null;
    }

    await writeFile(path.resolve() + `/output/topology_${id}.json`, JSON.stringify(topology));

    return topology;
  }

  async queryTopologies() {
    console.log(this.topologies);
    this.topologies.forEach(logger.info);
    return this.topologies;
  }
}

async function test() {
  const obj = new TopologyAPI();

  await obj.readJson('topology');
  await obj.queryTopologies();
}

test();