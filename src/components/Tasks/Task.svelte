<script>
    import { actions } from "astro:actions";
    export let task;
    export let tasks;

    async function toggleComplete(taskItem) {
        try {
            taskItem = { ...taskItem, isDone: !taskItem.isDone };

            const { error } = await actions.updateTasks(taskItem);
            if (!error) {
                tasks = tasks.map((taskItem) => {
                    if (taskItem.id === task.id) {
                        taskItem.isDone = !taskItem.isDone;
                    }
                    return taskItem;
                });
            }
        } catch (error) {
            alert("Ошибка при обновлении задачи");
        }
    }

    async function deleteTask(id) {
        try {
            const { error } = await actions.deleteTask({ id });
            if (!error) {
                tasks = tasks.filter((taskItem) => taskItem.id !== id);
            }
        } catch (error) {
            alert("Ошибка при удалении задачи");
        }
    }
</script>

<li class="p-2 bg-blue-100 rounded">
    <a href={`/task/${task.id}`}> {task.title} </a>
</li>
<span class={task.isDone ? "line-through" : ""}>{task.title}</span>
<button
    class="bg-green-500 text-white p-1 rounded"
    on:click={() => toggleComplete(task)}
>
    {task.isDone ? "Отменить" : "Выполнено"}
</button>
<button
    class="bg-red-500 text-white p-1 rounded"
    on:click={() => deleteTask(task.id)}
>
    Удалить
</button>
