import {
    getStatus,
    toggleTaskInList,
    filterTaskGroups,
    getIncompleteTaskSet
} from '../logic/task'
import {
    toGroups
} from '../logic/utils'

import {
    Status
} from '../logic/status'
const assert = require('assert');


describe('Utils', () => {
    describe("Convert list to grouped list", () => {
        it(`Transforms a list of items into a list of groups containing
            items`, () => {
            const students = [{
                    gender: 'non-binary',
                    name: 'Jay'
                },
                {
                    gender: 'female',
                    name: 'Liting'
                },
                {
                    gender: 'female',
                    name: 'Samira'
                },
                {
                    gender: 'non-binary',
                    name: 'Jordan'
                },
                {
                    gender: 'male',
                    name: 'Ben'
                }
            ]

            const actual = toGroups(students,
                'gender', (k, vals) => {
                    const studentNames = vals.map((v) => v.name)
                    return {
                        gender: k,
                        students: studentNames
                    }
                });
            const expected = [{
                    gender: 'non-binary',
                    students: ['Jay', 'Jordan']
                },
                {
                    gender: 'female',
                    students: ['Liting', 'Samira']
                },
                {
                    gender: 'male',
                    students: ['Ben']
                }
            ]


            assert.deepEqual(actual, expected);

        });
    });
});
describe('Tasks', () => {
    describe("Query a task's status", () => {
        it(`If task has a complete date, its status is "completed,"
        regardless of dependencies`, () => {
            const task = {
                "id": 1,
                "group": "Purchases",
                "task": "Go to the bank",
                "dependencyIds": [],
                "completedAt": Date.now()
            }
            assert.equal(getStatus(task, new Set()), Status.completed)
        });
        it(`If task has no complete date, and is not dependent on an incomplete
            task, its status is "incomplete"`, () => {
            const task = {
                "id": 1,
                "group": "Purchases",
                "task": "Go to the bank",
                "dependencyIds": [1, 2, 3],
                "completedAt": null
            }
            assert.equal(getStatus(task, new Set([4])), Status.incomplete)
        });
        it(`If task has no complete date, and is dependent on an incomplete
            task, its status is "locked"`, () => {
            const task = {
                "id": 1,
                "group": "Purchases",
                "task": "Go to the bank",
                "dependencyIds": [1, 2, 3],
                "completedAt": null
            }
            assert.equal(getStatus(task, new Set([2])), Status.locked)
        });
    });
    describe("Toggle a task's status in a list", () => {
        it(`If an incomplete task is dependent on another incomplete task,
            function does nothing`, () => {
            const tasks = [{
                    "id": 1,
                    "group": "Purchases",
                    "task": "Buy flour",
                    "dependencyIds": [],
                    "completedAt": null
                },
                {
                    "id": 2,
                    "group": "Cooking",
                    "task": "Make pancakes",
                    "dependencyIds": [1],
                    "completedAt": null
                }
            ]
            const actual = toggleTaskInList(tasks, 2);
            assert.deepEqual(actual, tasks);
        })
        it(`If task is incomplete and not dependent on incomplete task,
            time of completion is recorded`, () => {
            const tasks = [{
                    "id": 1,
                    "group": "Purchases",
                    "task": "Buy flour",
                    "dependencyIds": [],
                    "completedAt": Date.now()
                },
                {
                    "id": 2,
                    "group": "Cooking",
                    "task": "Make pancakes",
                    "dependencyIds": [1],
                    "completedAt": null
                }
            ]
            const [actualTask1, actualTask2] = toggleTaskInList(tasks, 2);
            assert.deepEqual(actualTask1, tasks[0]);
            assert.equal(actualTask2.id, 2);
            assert.equal(actualTask2.group, "Cooking");
            assert.equal(actualTask2.task, "Make pancakes");
            assert.deepEqual(actualTask2.dependencyIds, [1]);
            assert.notEqual(actualTask2.completedAt, null);
        });
        it(`If task is complete and not dependent on incomplete task, its
            completion date is set to null`, () => {
            const tasks = [{
                "id": 2,
                "group": "Cooking",
                "task": "Make pancakes",
                "dependencyIds": [],
                "completedAt": Date.now()
            }]
            const [actual] = toggleTaskInList(tasks, 2);
            assert.equal(actual.id, 2);
            assert.equal(actual.group, "Cooking");
            assert.equal(actual.task, "Make pancakes");
            assert.deepEqual(actual.dependencyIds, []);
            assert.equal(actual.completedAt, null);
        });
        it(`If task is complete and is dependent on incomplete task, its
            completion date is set to null`, () => {
            const tasks = [{
                    "id": 1,
                    "group": "Purchases",
                    "task": "Buy flour",
                    "dependencyIds": [],
                    "completedAt": Date.now()
                },
                {
                    "id": 2,
                    "group": "Cooking",
                    "task": "Make pancakes",
                    "dependencyIds": [1],
                    "completedAt": Date.now()
                }
            ]
            const [_, actual] = toggleTaskInList(tasks, 2);
            assert.equal(actual.id, 2);
            assert.equal(actual.group, "Cooking");
            assert.equal(actual.task, "Make pancakes");
            assert.deepEqual(actual.dependencyIds, [1]);
            assert.equal(actual.completedAt, null);
        });
    })
    describe("Filter task groups", () => {
        it(`If selected group is null, returns all task groups`, () => {
            const groups = [{
                name: "Group1"
            }, {
                name: "Group2"
            }, {
                name: "Group3"
            }];
            const actual = filterTaskGroups(groups, null);
            assert.deepEqual(actual, groups);
        });
        it(`If selected group is not null, returns list containing only
            selected task group`, () => {
            const groups = [{
                name: "Group1"
            }, {
                name: "Group2"
            }, {
                name: "Group3"
            }];
            const actual = filterTaskGroups(groups, "Group2");
            assert.deepEqual(actual, [{
                name: "Group2"
            }]);
        });
    });
    describe('Find set of incomplete tasks', () => {
        it(`given a list of tasks, produces a set of incomplete tasks`, () => {
            const tasks = [{
                    "id": 1,
                    "group": "Purchases",
                    "task": "Buy flour",
                    "dependencyIds": [],
                    "completedAt": Date.now()
                },
                {
                    "id": 2,
                    "group": "Cooking",
                    "task": "Make pancakes",
                    "dependencyIds": [1],
                    "completedAt": null
                },
                {
                    "id": 3,
                    "group": "Cooking",
                    "task": "Make waffles",
                    "dependencyIds": [1],
                    "completedAt": Date.now()
                }
            ]
            const actual = getIncompleteTaskSet(tasks)
            const expected = new Set([{
                    "id": 1,
                    "group": "Purchases",
                    "task": "Buy flour",
                    "dependencyIds": [],
                    "completedAt": Date.now()
                },
                {
                    "id": 3,
                    "group": "Cooking",
                    "task": "Make waffles",
                    "dependencyIds": [1],
                    "completedAt": Date.now()
                }
            ])
            assert.deepEqual(actual, expected);
        });
    })
});