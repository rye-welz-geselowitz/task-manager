import { Status } from './status.js';

function isLocked(task, incompleteTasks){
    return task.dependencyIds.reduce((acc, val)=> {
        return acc || incompleteTasks.has(val);
    }, false);
}

function getStatus(task, incompleteTasks){
    if(task.completedAt !== null){ return Status.completed; }
    return isLocked(task, incompleteTasks)? Status.locked : Status.incomplete;
}

function getIncompleteTaskSet(tasks){
    const incomplete = tasks.reduce((acc, task)=> {
        return task.completedAt===null? acc.concat([task.id]) : acc;
    }, []);
    return new Set(incomplete);
}

function toggleTaskInList(tasks, id){
    const incompleteTasks = getIncompleteTaskSet(tasks);
    return tasks.map( (task)=> {
        return task.id === id? toggleTask(task, incompleteTasks) : {...task}
    });
}

function toggleTask(task, incompleteTasks){
    switch(getStatus(task, incompleteTasks)){
        case Status.locked:
            return {...task};
        case Status.incomplete:
            return {...task, completedAt: Date.now()};
        case Status.completed:
            return {...task, completedAt: null};
        default:
            return {...task};
    }
}

function filterTaskGroups(taskGroups, selectedGroup){
    return selectedGroup === null? taskGroups :
        taskGroups.filter( (groupData) => groupData.name === selectedGroup);
}

export { getStatus, toggleTaskInList, filterTaskGroups, getIncompleteTaskSet };
