<script>
  export let tasks;
  import { actions } from "astro:actions";
  import Task from "./Task.svelte";
  import { titleValidation } from "./validationTask";
  let newTask = "";

  async function addTask() {
    console.log(titleValidation.parse({ title: newTask }));
    if (newTask) {
      const { data, error } = await actions.postTask({ title: newTask });
      if (!error) {
        tasks = [...tasks, data];
      } else {
        console.log(error);
        alert(error.fields["title"]);
      }

      newTask = "";
    }
  }
</script>

<div>
  <h1 class="text-2xl mb-4">Todo</h1>

  <input
    class="border p-2 w-full rounded mb-2"
    type="text"
    bind:value={newTask}
    placeholder="Новая задача"
    on:keydown={(e) => e.key === "Enter" && addTask()}
  />

  <button class="w-full bg-blue-500 text-white p-2 rounded" on:click={addTask}>
    Добавить
  </button>

  <ul class="mt-4 space-y-2">
    {#each tasks as task, i (i)}
      <Task {task} bind:tasks />
    {/each}
  </ul>
</div>
