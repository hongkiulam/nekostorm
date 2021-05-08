<script lang="ts">
  import { toasts } from "../../store/toasts";
  import { vlc } from "../../helpers/ipc";
  import { size } from "../../helpers/constants";
  import Button from "../atoms/Button.svelte";
  import { LinkIcon } from "svelte-feather-icons/src";
  export let streamUrl: string;
</script>

<style lang="scss">
  video {
    height: calc(100% - var(--u3));
  }
  .video-footer {
    display: grid;
    grid-auto-flow: column;
    height: var(--u3);
    width: 100%;
    border-top: 1px solid var(--copy-primary);
    flex: 1;
    :global(button) {
      height: 100%;
    }
    :global(img) {
      margin-left: var(--u);
    }
    :global(svg) {
      margin-left: var(--u);
    }
  }
</style>

<video src={streamUrl} controls width="100%" height="100%">
  <track kind="captions" />
</video>
<div class="video-footer">
  <Button
    on:click={() => {
      const { error } = vlc.play(streamUrl);
      if (error) {
        toasts.add({
          kind: "danger",
          label: error,
          icon: "danger",
        });
      }
    }}
  >
    Open in VLC
    <img src="/img/vlc.svg" alt="vlc" height={size.u} />
  </Button>
  <Button
    on:click={() => {
      alert(streamUrl);
    }}
  >
    Get stream url
    <LinkIcon size={size.u} />
  </Button>
</div>
