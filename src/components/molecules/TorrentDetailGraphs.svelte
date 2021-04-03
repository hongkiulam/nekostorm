<script lang="ts">
  import { webtorrentsOverTime } from '../../store/webtorrents';
  import Line from 'svelte-chartjs/src/Line.svelte';
  import type { WebTorrent } from '../../types/torrent';
  import { formatFileSize } from '../../helpers/format';

  export let torrentId: number;

  const createOptions = ({
    tickCallback,
  }: {
    tickCallback: (value: any, index: number, values: any) => string;
  }) => ({
    responsive: true,
    aspectRatio: 2,
    animation: { duration: 0 },
    scales: {
      xAxes: [{ display: false }],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            callback: tickCallback,
          },
        },
      ],
    },
    legend: { display: false },
  });

  $: webtorrentOverTime = $webtorrentsOverTime[torrentId];
  $: produceGraphData = (key: keyof WebTorrent, maxXDataPoints?: number) => {
    let data = webtorrentOverTime.map((webtorrent) => webtorrent[key]);
    let labels = data.map((_, index) => index);
    if (maxXDataPoints) {
      data = data.slice(-maxXDataPoints, -1);
      labels = labels.slice(-maxXDataPoints, -1);
    }

    const htmlEl =
      document.querySelector('html') || document.createElement('div');
    const color = getComputedStyle(htmlEl).getPropertyValue('--copy-primary');
    return {
      labels,
      datasets: [
        {
          label: key,
          data,
          borderColor: color,
          pointRadius: 0,
        },
      ],
    };
  };

  $: graphs = [
    {
      title: 'Download Speed',
      data: produceGraphData('downloadSpeed', 20),
      options: createOptions({
        tickCallback: (value) => formatFileSize(value),
      }),
    },
    {
      title: 'Downloaded',
      data: produceGraphData('downloaded'),
      options: createOptions({
        tickCallback: (value) => formatFileSize(value),
      }),
    },
    {
      title: 'Upload Speed',
      data: produceGraphData('uploadSpeed'),
      options: createOptions({
        tickCallback: (value) => formatFileSize(value),
      }),
    },
  ];
</script>

<style lang="scss">
  @import '../../styles/global';
  .graphs {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
    gap: var(--u2);
    @include media(xs) {
      grid-template-columns: 1fr;
    }
  }
  .graph_container {
    padding: var(--u);
    border: 1px solid var(--primary);
    padding-left: calc(var(--u2) + 1em);
    position: relative;
  }

  .graph_title {
    position: absolute;
    top: 50%;
    left: 1em;
    transform: translate(-50%, -50%) rotate(-90deg);
  }
  .graph_container :global(canvas) {
    width: 100% !important;
    height: auto !important;
  }
</style>

<!-- <h2>Graphs</h2> -->
<div class="graphs">
  {#each graphs as graph}
    <figure class="graph_container">
      <figcaption class="graph_title">{graph.title}</figcaption>
      <Line options={graph.options} data={graph.data} />
    </figure>
  {/each}
</div>
