# My Hiking Pack

A web application to help you plan your hiking trips by managing your hiking gear and packing lists.

## Developing

Once you've created a cloned the project, install its dependencies with `pnpm install`.
Currently pushing to master automatically builds / deploys to Vercel.

## Database

The development database setup uses sqlite by default. To browse data within the database you can also run `pnpm run db:studio`.
To create/migrate the database: `pnpm run db:migrate`. (This is automatically run prior to building the app.)
To push schema changes to the database: `pnpm run db:push`. (Useful in dev, to migrate the database as you make changes, solidify your schema changes with the command below.)
To generate a new migration: `pnpm run db:generate --name=<migration-name>`.

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
