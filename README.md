Inline JSX

This is a proof-of-concept to allow React JSX standalone components in existing legacy applications that might not allow for upgrading to a full-fledged React SPA.

## Intro

Using React's `lazy` function, `app.js` goes through all of the `jsx?` files and dynamically imports them. This lazy component is then rendered inside a `Suspense` component, which allows for rendering fallback content while waiting for the lazily-loaded component to load.

Each of the components in the template are standalone React apps. For this reason, an event bus pattern was also added to demonstrate a quick and dirty way to communicate between different apps on the same page.
