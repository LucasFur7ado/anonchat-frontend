<script>
  import { userId } from "$lib/store.js";
    import { slide } from "svelte/transition";
  import * as timeAgo from "timeago.js";

  export let message;
</script>

<div transition:slide
  class={`flex w-full flex-col ${
    $userId == message.socketId
      ? "items-end text-right"
      : ""
  }`}>
  <div class={`my-[2px] rounded-full px-8 w-fit p-2 bg-[var(--bg-dark)]`}>
    <span class={`text-[14px] ${!($userId == message.socketId) ? "text-[var(--main-cyan)]" : "text-[var(--main-red)]"}`} style="font-weight:800">
      {message.username}
    </span>
    <p class="text-[16px]">
      {message.message}
    </p>
    <span class="text-[14px] opacity-[.5]">
      {timeAgo?.format(message.time)}
    </span>
  </div>
</div>
