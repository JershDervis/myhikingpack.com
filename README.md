# My Hiking Pack

A web application to help you plan your hiking trips by managing your hiking gear and packing lists.

## Developing

Once you've created a cloned the project, install its dependencies with `pnpm install`.

The development database setup uses Docker by default. Make sure you have Docker installed and running before executing `pnpm run db:start`. To browse data within the database you can also run `pnpm run db:studio`.

To start a development server:

```bash
pnpm run dev
```

## Building

To create a production version of the app:

```bash
pnpm run build
```

You can preview the production build with `pnpm run preview`.
