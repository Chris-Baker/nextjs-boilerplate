---
to: src/pages/<%= h.changeCase.param(name) %>.tsx
---
/** @format */

const <%= h.changeCase.pascal(name) %> = () => {
    return <div><%= h.changeCase.pascal(name) %> Page!</div>;
};

export default Home;