/*
On a campus represented as a 2D grid, there are N workers and M bikes, with N <= M. Each worker and bike is a 2D coordinate on this grid.

Our goal is to assign a bike to each worker. Among the available bikes and workers, we choose the (worker, bike) pair with the shortest Manhattan distance between each other, and assign the bike to that worker. (If there are multiple (worker, bike) pairs with the same shortest Manhattan distance, we choose the pair with the smallest worker index; if there are multiple ways to do that, we choose the pair with the smallest bike index). We repeat this process until there are no available workers.

The Manhattan distance between two points p1 and p2 is Manhattan(p1, p2) = |p1.x - p2.x| + |p1.y - p2.y|.

Return a vector ans of length N, where ans[i] is the index (0-indexed) of the bike that the i-th worker is assigned to.

Constraints:

0 <= workers[i][j], bikes[i][j] < 1000
All worker and bike locations are distinct.
1 <= workers.length <= bikes.length <= 1000

source:
*/

function assignBikes(workers, bikes) {

  // helper
  const getDist = ([ax, ay],[bx, by]) => {
    return Math.abs(bx - ax) + Math.abs(by - ay);
  }

  // find all worker-bike pairs, ie. assignment candidates
  let candidates = []
  for (let wi = 0; wi < workers.length; wi++) {
    for (let bi = 0; bi < bikes.length; bi++) {
      candidates.push({
        dist: getDist(workers[wi], bikes[bi]),
        wid: wi,
        bid: bi
      })
    }
  }

  // native sort by dist, then by workerId, then by bikeId
  candidates.sort((a,b) => {
    if (a.dist !== b.dist) {
      return a.dist - b.dist; // ascending
    } else if (a.wid !== b.wid) {
      return a.wid - b.wid;
    } else { // a.bid !== b.bid)
      return a.bid - b.bid;
    }
  })

  // take shortest without reusing workers or bikes
  let assignedWorkers = new Set();
  let assignedBikes = new Set();
  let assignments = Array(workers.length).fill(-1);
  for (let {wid, bid} of candidates) {
    if (!assignedWorkers.has(wid) && !assignedBikes.has(bid)) {
      assignments[wid] = bid;
      assignedWorkers.add(wid);
      assignedBikes.add(bid);
    }
  }

  return assignments;
}


// using bucket sort and reusing inputs inplace of assignment sets

function assignBikes(workers, bikes) {
  const getDist = ([x1, y1], [x2, y2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

  const dists = []; // distance -> array of worker-bike assignment candidates (bucket)
  for (let wi = 0; wi < workers.length; wi++) {
    for (let bi = 0; bi < bikes.length; bi++) {
      const d = getDist(workers[wi], bikes[bi]);
      if (dists[d] == null) dists[d] = [];
      dists[d].push([wi, bi]);
    }
  }

  const assignments = [];
  for (const bucket of dists) {
    if (bucket != null) {
      for (const [wi, bi] of bucket) {
        if (workers[wi] != null && bikes[bi] != null) { // ids can be zero
          workers[wi] = null;
          bikes[bi] = null;
          assignments[wi] = bi;
        }
      }
    }
  }
  return assignments;
}
