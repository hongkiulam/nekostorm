<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { MpvJs } from 'mpv.js-vanilla';

  // Define handler functions
  const handleMPVReady = (mpv: any) => {
    const observe = mpv.observe.bind(mpv);
    ['pause', 'time-pos', 'duration', 'eof-reached'].forEach(observe);
    mpv.property('hwdec', 'auto');
    mpvReady = true;
  };
  const handlePropertyChange = (name: string, value: any) => {
    if (name === 'time-pos' && seeking) {
      return;
    } else if (name === 'eof-reached' && value) {
      mpv.property('time-pos', 0);
    } else {
      state[name] = value;
    }
  };
  const toggleFullscreen = () => {
    if (state.fullscreen) {
      (document as any)['webkitExitFullscreen' || 'exitFullscreen']();
    } else {
      mpv.fullscreen();
    }
    state.fullscreen = !state.fullscreen;
  };
  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    if (e.key === 'f' || (e.key === 'Escape' && state.fullscreen)) {
      toggleFullscreen();
    } else if (state.duration) {
      mpv.keypress(e);
    }
  };

  const togglePause = (e: any) => {
    e.target.blur();
    if (!state.duration) return;
    mpv.property('pause', !state.pause);
  };
  const handleStop = (e: any) => {
    e.target.blur();
    mpv.property('pause', true);
    mpv.command('stop');
    state['time-pos'] = 0;
    state.duration = 0;
  };
  const handleSeekMouseDown = () => {
    seeking = true;
  };
  const handleSeek = (e: any) => {
    e.target.blur();
    const timePos = +e.target.value;
    state['time-pos'] = timePos;
    mpv.property('time-pos', timePos);
  };
  const handleSeekMouseUp = () => {
    seeking = false;
  };
  const handleLoad = (e: any) => {
    e.target.blur();
  };

  // state and other lifecycle things
  export let streamUrl: string;

  let mpvReady = false;
  let state: { [key: string]: any } = {
    pause: false,
    'time-pos': 0,
    duration: 0,
    fullscreen: false,
  };
  let seeking = false;

  const mpv = new MpvJs(handleMPVReady, handlePropertyChange);
  let embed: HTMLEmbedElement;
  const embedProps = mpv.getDefProps();

  $: if (mpvReady && streamUrl) {
    mpv.command('loadfile', streamUrl);
  }

  onMount(() => {
    mpv.setPluginNode(embed);
    document.addEventListener('keydown', handleKeyDown, false);
  });

  onDestroy(() => {
    document.removeEventListener('keydown', handleKeyDown, false);
    mpv.destroy();
  });
</script>

<style>
  .player {
    width: 100%;
    height: 100%;
  }
  .embed {
    width: 100%;
    height: calc(100% - 40px);
  }
  .controls {
    height: 40px;
    width: 100%;
    display: flex;
  }
  .control {
    flex: 0 1;
  }
  .seek {
    flex: 1 1;
  }
</style>

<figure class="player">
  <embed
    bind:this={embed}
    type={embedProps.type}
    on:mousedown={togglePause}
    class="embed"
  />
  <div class="controls">
    <button class="control" on:click={togglePause}>
      {state.pause ? '▶' : '❚❚'}
    </button>
    <button class="control" on:click={handleStop}>■</button>
    <input
      class="seek"
      type="range"
      min={0}
      step={0.1}
      max={state.duration}
      value={state['time-pos']}
      on:change={handleSeek}
      on:mousedown={handleSeekMouseDown}
      on:mouseup={handleSeekMouseUp}
    />
    <button class="control" on:click={handleLoad}>⏏</button>
  </div>
</figure>
