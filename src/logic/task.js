/*Functions for querying and mapping tasks.*/

import {
    Status
} from './status.js';
import {
    toGroups
} from './utils';

/*Takes:
    * task, an object
    * incompleteTasks, a set of integers, representing the ids of incomplete tasks
Returns::
    * a boolean representing whether a task is dependent on another, incomplete task
*/
function hasIncompleteDependency(task, incompleteTasks) {
    return task.dependencyIds.reduce((acc, val) => {
        return acc || incompleteTasks.has(val);
    }, false);
}

/*Takes:
    * task, an object
    * incompleteTasks, a set of integers, representing the ids of incomplete tasks
Returns::
    * an enum representing whether the task is locked, incomplete, or completed
*/
function getStatus(task, incompleteTasks) {
    if (task.completedAt !== null) {
        return Status.completed;
    }
    return hasIncompleteDependency(task, incompleteTasks) ? Status.locked : Status.incomplete;
}

/*Takes:
    * tasks, a list of objects
Returns::
    * a set of integers, representing the ids of incomplete tasks
*/
function getIncompleteTaskSet(tasks) {
    const incomplete = tasks.reduce((acc, task) => {
        return task.completedAt === null ? acc.concat([task.id]) : acc;
    }, []);
    return new Set(incomplete);
}

/*Takes:
    * tasks, a list of objects
    * id, an integer representing the id of the task whose status is to be toggled
Returns::
    * a list of objects representing the tasks after the specified task is toggled
*/
function toggleTaskInList(tasks, id) {
    const incompleteTasks = getIncompleteTaskSet(tasks);
    return tasks.map((task) => {
        return task.id === id ? toggleTask(task, incompleteTasks) : { ...task
        }
    });
}

/*Takes:
    * task, an object
    * incompleteTasks, a set of integers, representing the ids of incomplete tasks
Returns::
    * an copy of the task object, with the completedAt field updated to reflect its new status
*/
function toggleTask(task, incompleteTasks) {
    switch (getStatus(task, incompleteTasks)) {
        case Status.locked:
            return { ...task
            };
        case Status.incomplete:
            return { ...task,
                completedAt: Date.now()
            };
        case Status.completed:
            return { ...task,
                completedAt: null
            };
        default:
            return { ...task
            };
    }
}

/*Takes:
    * taskGroups, a list of objects representing groups of tasks
    * selectedGroup, a string representing the group name by which to filter
Returns:
    * a list of objects containing only the specified group of tasks - or, if none is specified,
    then all groups of tasks
*/
function filterTaskGroups(taskGroups, selectedGroup) {
    return selectedGroup === null ? taskGroups :
        taskGroups.filter((groupData) => groupData.name === selectedGroup);
}

/*Takes:
    * tasks, a list of objects
Returns:
    * a list of task groups with tasks nested inside
*/
function getTaskGroups(tasks) {
    return toGroups(tasks, "group", (k, v) => {
        return {
            name: k,
            tasks: v
        }
    });
}

export {
    getStatus,
    toggleTaskInList,
    filterTaskGroups,
    getIncompleteTaskSet,
    getTaskGroups
};