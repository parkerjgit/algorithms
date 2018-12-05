/*
You are given a list of project and a list of dependacies. All of oa project dependencies must be buildt before the project is. 
Find a build order that  will allow the project to   e build. If therer is no valide build order, return error.

source: CTCI
*/

function Project(name) {
    this.name = name;
    this.dependancies = [];
    this.visited = false;
}

function printGraph(root) {
    console.log(root.name);
    root.dependancies.forEach(dep => {
        printGraph(dep)
    })
}

function buildGraph(prjs, deps) {

    let root = new Project('root');
    let seen = []

    deps.forEach(([dep,prj]) => {
        
        // find/create projects required for dependancy
        let {created: depNew, node: depNode} = findOrCreate(root, dep),
            {created: prjNew, node: prjNode} = findOrCreate(root, prj);

        // update graph
        if ( depNew ) {
            seen.push(dep);
        } else {
            let idx = getDependancyIdx(root, dep) 
            if (idx >= 0) {
                root.dependancies.splice(idx, 1)
            }
        }
        if ( prjNew ) {
            seen.push(prj);
            root.dependancies.push(prjNode)
        } 
        prjNode.dependancies.push(depNode);

    })

    // add remaining projects to graph
    prjs.filter( prj => !seen.includes(prj))
        .forEach( prj => {
            root.dependancies.push(new Project(prj))
    })

    return root;
}

function getDependancyIdx(project, target) { // get idx or -1
    return project.dependancies
        .map(dep => dep.name)
        .indexOf(target)
}

function findOrCreate(root, target){
    let targNode = getProject(root, target);
    return (targNode !== null)
        ? {created: false, node: targNode}
        : {created: true, node: new Project(target)}
}

function getProject(root, target) {

    if (root.name === target)
        return root;
    if (root.dependancies.length === 0)
        return null;

    let visited = new Set();

    return root.dependancies.reduce( (result, dep) => {
        if (!visited.has(dep)) {
            visited.add(dep);
            return result || getProject(dep, target);
        } else {
            return result;
        }
    }, null);
}

function dftPostOrder(root) {
    let order = [];
    let visited = new Set();
    function _dft(root){
        // visit dependancies
        root.dependancies.forEach(dep => {
            if (!visited.has(dep)) {
                _dft(dep);
            }
        })
        // visit project
        visited.add(root);
        order.push(root.name)
    }   
    _dft(root);
    return order.slice(0, -1);
}

// function dftPostOrder(root) {
//     if (root.dependancies.length === 0) {
//         return [root.name];
//     }
//     // visit children
//     let orderedChildren = root.dependancies.reduce((orderings, dep) => {
//         console.log(orderings)
//         if (!dep.visited) {
//             return [...orderings, ..._dft(dep)];
//         }
//     }, []);
//     // visit node
//     root.visited = true;
//     return [...orderedChildren, root.name];
// }

function buildOrder(prjs, deps) {
    let root = buildGraph(prjs, deps);
    return dftPostOrder(root);
}

// test

describe('getProject', function() {
    beforeEach(function() {
        this.root = new Project('root');
        this.a = new Project('a');
        this.b = new Project('b');
        this.c = new Project('c');
        this.d = new Project('d');
        this.e = new Project('e');
        this.f = new Project('f');
        this.root.dependancies.push(this.c);
        this.c.dependancies.push(this.d)
        this.d.dependancies.push(this.a)
        this.d.dependancies.push(this.b)
        this.a.dependancies.push(this.f)
        this.b.dependancies.push(this.f)
        this.b.dependancies.push(this.e)
    })
    it('gets a project node or null from a a-cyclic graph', function() {
        expect(getProject(this.root,'root').name).toEqual('root');
    })
    it('gets a project node or null from a a-cyclic graph', function() {
        expect(getProject(this.root,'c').name).toEqual('c');
    })
    it('gets a project node or null from a a-cyclic graph', function() {
        expect(getProject(this.root,'d').name).toEqual('d');
    })
    it('gets a project node or null from a a-cyclic graph', function() {
        expect(getProject(this.root,'a').name).toEqual('a');
    })
    it('gets a project node or null from a a-cyclic graph', function() {
        expect(getProject(this.root,'x')).toEqual(null);
    })
})

// describe('buildGraph', function() {
//     it('builds a graph from edges and nodes', function() {
//         expect(
//             buildGraph(['a','b','c','d','e','f'],[['a','d'],['f','b'],['b','d'],['f','a'],['d','c'],['e','b'],['b','a']]).dependancies.length
//         ).toEqual(
//             1
//         );
//     })
// })

describe('buildOrder', function() {
    it('gets topological order of set of projects and dependancies', function() {
        expect(
            buildOrder(['a','b','c','d','e','f'],[['a','d'],['f','b'],['b','d'],['f','a'],['d','c'],['e','b'],['b','a']])
        ).toEqual(
            ['f','e','b','a','d','c']
        );
    })
})