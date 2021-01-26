<style>
  main {
    margin: 0 var(--u4);
    display: grid;
    grid-template-rows: [header] auto [section] 1fr [footer] auto;
    height: 100%;
  }
  header {
    display: flex;
    align-items: center;
    height: var(--u4);
    margin-bottom: var(--u4);
  }
  footer {
    display: flex;
    align-items: center;
    height: var(--u4);
  }
</style>

<main>
  <header><slot name="header" /></header>
  <section><slot /></section>
  <footer><slot name="footer" /></footer>
</main>
