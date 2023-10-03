<script>
  import { slide } from "svelte/transition";
  import MessageCard from "./MessageCard.svelte";
  import { messages, username } from "$lib/store.js";
  import JoinNotification from "./JoinNotification.svelte";

  export let socket;

  let newMessage;
  let error = null;

  const sendMessage = () => {
    if (newMessage.length > 100 || newMessage.length <= 0) {
      error = "Message must be between 1 and 100 characters";
      return null;
    }

    socket.emit("client-new-message", {
      message: newMessage,
      username: $username,
    });
    newMessage = "";
  };

  socket.on("user-entered", ({ username }) => {
    $messages.push({
      username,
      isMessage: false,
    });
    $messages = $messages;
  });

  socket.on("new-message", (msg) => {
    $messages.push(msg);
    $messages = $messages;
  });
</script>

<div
  transition:slide
  class="rounded-lg w-full md:w-[30rem] h-full overflow-hidden p-[10px] flex flex-col justify-end mt-4">
  <div>
    {#each $messages as message, index}
      {#if message?.isMessage === false}
        <JoinNotification {message} />
      {:else}
        <MessageCard {message} />
      {/if}
    {/each}
  </div>
  {#if error}
    <span class="mt-2 text-red-400 text-[16px]">
      {error}
    </span>
  {/if}
  <div
    class="w-full border-[1px] border-[#fff1] rounded-full mt-4 flex p-[3px] items-center justify-center">
    <input
      on:keyup={(e) => {
        if (e.key == "Enter") sendMessage();
      }}
      type="text"
      bind:value={newMessage}
      placeholder="Write something"
      class="w-full flex-1 active:outline bg-transparent rounded-full p-2" />
    <button on:click={sendMessage} class="rounded-full bg-blue-500 py-2 px-6">
      Send
    </button>
  </div>
</div>
