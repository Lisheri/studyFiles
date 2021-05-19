import foo from './foo';

foo.bar();

if (module.hot) {
    module.hot.accept(() => {
        console.info("hmr")
    })
}