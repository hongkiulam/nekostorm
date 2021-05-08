<script lang="ts">
  import { toasts } from "../../store/toasts";
  import { vlc } from "../../helpers/ipc";
  import Button from "../atoms/Button.svelte";
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
  }
  img {
    height: var(--u);
    margin-left: var(--u);
  }
</style>

<video src={streamUrl} controls width="100%" height="100%">
  <track kind="captions" />
</video>
<div class="video-footer">
  <Button
    on:click={async () => {
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
    <img src="/img/vlc.svg" alt="vlc" height="10px" />
  </Button>
</div>
