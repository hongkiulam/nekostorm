<script lang="ts">
  import RangeSlider from 'svelte-range-slider-pips/src/RangeSlider.svelte';
  import { formatTime } from '../../helpers/format';
  export let value: number;
  export let min: number;
  export let max: number;
  export let step: number;
  export let pips: boolean = false;
  export let pipstep: number = 0;

  $: _pipstep = pipstep as never; // typescript issue

  const id = 'stream-seeker' as never;
</script>

<style>
  :global(#stream-seeker) {
    flex: 1 1;
    --range-slider:          var(--white); /* slider main background color */
    --range-handle-inactive: var(--primary-light); /* inactive handle color */
    --range-handle:          var(--primary-light); /* non-focussed handle color */
    --range-handle-focus:    var(--primary-light); /* focussed handle color */
    --range-handle-border:   var(--range-handle);
    --range-range-inactive:  var(--range-handle-inactive); /* inactive range bar background color */
    --range-range:           var(--range-handle-focus); /* active range bar background color */
    --range-float-inactive:  var(--range-handle-inactive); /* inactive floating label background color */
    --range-float:           var(--range-handle-focus); /* floating label background color */
    --range-float-text:      var(--white); /* text color on floating label */
  }

  :global(#stream-seeker .rangePips) {
    bottom: auto;
    top: -1em;
  }
</style>


<RangeSlider
  {id}
  values={[value]}
  {min}
  {max}
  float
  hover
  {step}
  {pips}
  pipstep={_pipstep}
  formatter={(value) => formatTime(value)}
  on:change
  on:start
  on:stop
/>