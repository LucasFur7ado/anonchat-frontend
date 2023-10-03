<script>
  import Chat from "./Chat.svelte";
  import { io } from "socket.io-client";
  import { username } from "$lib/store.js";
  import { generate } from "random-username-generator";

  let socket = null;
  let isConnected = false;

  const connect = () => {
    $username = $username ?? generate();

    socket = io("https://anonchat.lucasfurtado.xyz", {
      query: {
        username: $username,
      },
    });

    if (socket) isConnected = true;
  };
</script>

<section
  class="px-2 w-full flex flex-col items-center justify-center h-screen py-12">
  <h1
    class="text-4xl md:text-7xl p-4 text-center font-bold from-[var(--main-red)] to-[var(--main-blue)] bg-gradient-to-r bg-clip-text text-transparent">
    Anon chat
  </h1>
  {#if isConnected}
    <Chat bind:socket />
  {:else}
    <p class="w-full px-2 text-center">
      Chat anonymously in a real time global chat.
    </p>
    <div
      class="w-full md:w-96 border-[1px] border-[#fff1] rounded-full mt-4 flex p-[3px] items-center justify-center">
      <input
        type="text"
        bind:value={$username}
        on:keyup={(e) => {
          if (e.key == "Enter") connect();
        }}
        placeholder="Username"
        class="w-full active:outline bg-transparent rounded-full p-2" />
      <button
        on:click={connect}
        class="rounded-full bg-[var(--main-blue)] py-2 px-6">
        Enter
      </button>
    </div>
  {/if}
</section>
