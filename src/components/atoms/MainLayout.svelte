<style>
  main {
    margin: 0 var(--spaceL);
    display: grid;
    grid-template-rows: [header] auto [section] 1fr [footer] auto;
    height: 100%;
  }
  header {
    display: flex;
    align-items: center;
    height: var(--spaceL);
    margin-bottom: var(--spaceL);
  }
  footer {
    display: flex;
    align-items: center;
    height: var(--spaceL);
  }
</style>

<main>
  <header><slot name="header" /></header>
  <section><slot /></section>
  <footer><slot name="footer" /></footer>
</main>
