<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { MpvJs } from 'mpv.js-vanilla';
  import {
    PauseIcon,
    PlayIcon,
    MaximizeIcon,
    MessageSquareIcon,
    InfoIcon,
  } from 'svelte-feather-icons/src';
  import Button from '../atoms/Button.svelte';
  import StreamSeeker from '../molecules/StreamSeeker.svelte';
  import { size } from '../../helpers/constants';

  // Define handler functions
  const handleMPVReady = (mpv: any) => {
    const observe = mpv.observe.bind(mpv);
    [
      'pause',
      'time-pos',
      'duration',
      'eof-reached',
      'track-list/count',
    ].forEach(observe);
    mpv.property('hwdec', 'auto');
    mpvReady = true;
  };
  const handlePropertyChange = (name: string, value: any) => {
    if (name === 'track-list/count') {
      for (let i = 0; i <= value; ++i) {
        mpv.observe(`track-list/${i}/id`);
        mpv.observe(`track-list/${i}/type`);
        mpv.observe(`track-list/${i}/lang`);
        mpv.observe(`track-list/${i}/default`);
        mpv.observe(`track-list/${i}/type`);
        mpv.observe(`track-list/${i}/src`);
        mpv.observe(`track-list/${i}/title`);
        mpv.observe(`track-list/${i}/lang`);
        mpv.observe(`track-list/${i}/selected`);
      }
      return;
    }
    if (/track-list\/\d+/.test(name)) {
      // 'track-list/:index/:type'
      const [, index, type] = name.split('/');

      if (type === 'id') {
        // we will store tracks in state object keyed by their track id
        // create an index to id map so we have access to that id with just the track index
        trackIndexToIdMap[index] = value;
      }

      const id = trackIndexToIdMap[index];

      state.tracks[id] = {
        ...(state.tracks[id] || {}),
        [type]: value,
      };
      return;
    }
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

  const handleSeekMouseDown = () => {
    seeking = true;
  };
  const handleSeek = (value: number) => {
    const timePos = +value;
    state['time-pos'] = timePos;
    mpv.property('time-pos', timePos);
  };
  const handleSeekMouseUp = () => {
    seeking = false;
  };

  // state and other lifecycle things
  export let streamUrl: string;

  let mpvReady = false;
  let state: { [key: string]: any } = {
    pause: false,
    'time-pos': 0,
    duration: 0,
    fullscreen: false,
    tracks: {},
  };
  let trackIndexToIdMap: { [index: string]: string } = {};
  let seeking = false;

  const mpv = new MpvJs(handleMPVReady, handlePropertyChange);
  let embed: HTMLEmbedElement;
  const embedProps = mpv.getDefProps();

  $: if (mpvReady && streamUrl) {
    mpv.command('loadfile', streamUrl);
    state['time-pos'] = 0;
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
    display: block;
    width: 100%;
    height: calc(100% - var(--video-control-bar-height));
  }
  .controls {
    height: var(--video-control-bar-height);
    width: 100%;
    display: flex;
    background-color: var(--primary);
  }
  .controls :global(button) {
    flex: 0 1;
    height: 100%;
  }
</style>

<div class="player">
  <embed
    bind:this={embed}
    type={embedProps.type}
    on:mousedown={togglePause}
    class="embed"
  />
  <div class="controls">
    <Button on:click={togglePause}>
      {#if state.pause}
        <PlayIcon size={size.u2} />
      {:else}
        <PauseIcon size={size.u2} />
      {/if}
    </Button>
    <StreamSeeker
      value={state['time-pos']}
      min={0}
      max={state.duration}
      step={0.1}
      on:change={(e) => {
        handleSeek(e.detail.value);
      }}
      on:start={handleSeekMouseDown}
      on:stop={handleSeekMouseUp}
    />
    <Button tippyProps={{ content: streamUrl, interactive: true }}>
      <InfoIcon size={size.u2} />
    </Button>
    <Button
      on:click={() => {
        const arr = Object.entries(state.tracks);
        console.log(state.tracks, arr, arr[0]);
        mpv.property('sid', Number(arr[0][0]));
      }}
    >
      <MessageSquareIcon size={size.u2} />
    </Button>
    <Button on:click={toggleFullscreen}>
      <MaximizeIcon size={size.u2} />
    </Button>
  </div>
</div>
