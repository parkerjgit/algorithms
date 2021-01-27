function groupByAge(students) {
  let counts = {};
  let [minAge, maxAge] = [10,100];

  // inialize counts to zero
  [...Array(maxAge).keys()]
    .slice(minAge)
    .forEach(age => {
      counts[age] = [];
    });

  //
  students.forEach((student, idx) => {
    counts[student.age].push(idx);
  });

  let result = [];
  Object.keys(counts).forEach(age => {
    counts[age].forEach(idx =>
      result.push(students[idx]))
  })
  return result;
}

const isGrouped = (students) => {
  let seen = new Set();
  let curAgeGroup = -1;
  let result = true;
  students.forEach(student => {
    if (seen.has(student.age) && student.age === curAgeGroup) {
      // skip
    } else if (!seen.has(student.age) && student.age !== curAgeGroup) {
      curAgeGroup = student.age;
      seen.add(student.age);
    } else {
      result = false;
    }
  });
  return result;
}

// test

describe('groupByAge', function(){

  beforeEach(function() {
  })

  it('group student objects by age property', function() {
    const students = [
      {name: 'joe', age: 13},
      {name: 'john', age: 18},
      {name: 'sarah', age: 13},
      {name: 'berry', age: 22},
      {name: 'greg', age: 22},
      {name: 'dan', age: 13},
      {name: 'lily', age: 45},
      {name: 'jill', age: 13},
    ]
    const groupedStudents = [
      {name: 'joe', age: 13},
      {name: 'sarah', age: 13},
      {name: 'dan', age: 13},
      {name: 'jill', age: 13},
      {name: 'john', age: 18},
      {name: 'berry', age: 22},
      {name: 'greg', age: 22},
      {name: 'lily', age: 45},
    ]
    expect(isGrouped(groupByAge(students))).toEqual(true);
    expect(isGrouped(groupedStudents)).toEqual(true);
    expect(isGrouped(students)).toEqual(false);
  })

})
