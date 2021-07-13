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

  getTopology(id) {
    const result = this.topologies.filter(topology => topology.id === id);

    if (result.length == 0)
      return null;

    return result[0];
  }

  async readJson(fileName) {
    const data = await readFile(path.resolve() + `/${fileName}.json`);
    const topology = JSON.parse(data);

    this.topologies.push(topology);

    return topology;
  }

  async writeJson(id) {
    const topology = this.getTopology(id);

    if (!topology) {
      return null;
    }

    await writeFile(path.resolve() + `/output/topology_${id}.json`, JSON.stringify(topology));

    return topology;
  }

  async queryTopologies() {
    this.topologies.forEach(logger.info);
    return this.topologies;
  }

  async deleteTopology(id) {
    const deletedTopology = this.getTopology(id);

    if (!deletedTopology) {
      return null;
    }

    this.topologies = this.topologies.filter(topology => topology.id !== id);
    return deletedTopology;
  }

  async queryDevices(id) {
    const topology = this.getTopology(id);

    if (!topology) {
      return null;
    }

    const { components } = topology;
    return components;
  }

  async queryDevicesWithNetlistNode(id, netlistNodeID) {
    const topology = this.getTopology(id);

    if (!topology) {
      return null;
    }

    const { components } = topology;

    const result = [];

    components.forEach(component => {

      for (const netlistNode of Object.values(component.netlist)) {
        if (netlistNode === netlistNodeID) {
          result.push(component);
          break;
        }
      }
    });

    return result;
  }
}

async function test() {
  const obj = new TopologyAPI();

  await obj.readJson('topology');
  await obj.queryTopologies();
  await obj.deleteTopology("top1");
}

test();