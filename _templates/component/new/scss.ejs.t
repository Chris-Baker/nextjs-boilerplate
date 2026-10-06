---
to: "src/components/<%= h.getComponentDirectory(typeof type === 'undefined' ? 'atom' : type) %>/<%= h.changeCase.param(name) %>/<%= h.changeCase.param(name) %>.scss"
---
.<%= h.changeCase.param(name) %> {
    // BEM elements: &__label; modifiers: &--active.
}
