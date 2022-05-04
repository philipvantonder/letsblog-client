
function lazyLoad(view: string) { return () => import(`../${view}.vue`); }

export { lazyLoad };