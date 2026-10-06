# Architecture

WeatherNow is a client-rendered React 19 single-page app. The code is organised as layers, and each layer may only depend on the layers below it.

```
pages → components → hooks → converters → api
                       │          │         │
                 frontendTypes ◄──┘    apiTypes
```

## Layer rules

| Layer                | May import                              | Must not                                       |
| -------------------- | --------------------------------------- | ---------------------------------------------- |
| `apiTypes/`          | nothing                                 | contain runtime code                           |
| `frontendTypes/`     | nothing                                 | mirror API naming (`feels_like`, `dt_txt`)     |
| `api/`               | `apiTypes`, `config`                    | transform data or know about React             |
| `converters/`        | `apiTypes`, `frontendTypes`             | perform I/O, read the clock, or touch the DOM  |
| `hooks/`             | `api`, `converters`, `providers`, `lib` | return raw API shapes                          |
| `components/weather` | `hooks`, `frontendTypes`, `lib`, `ui`   | call `fetch` or import `apiTypes`              |
| `pages/`             | everything above                        | contain reusable UI (move it to `components/`) |

In short:

- Only `src/api/client.ts` calls `fetch`.
- Only `src/converters/` sees OpenWeather field names.
- Components only receive `frontendTypes`.

## Data fetching

- **Query keys:** every query key comes from the factory in `src/hooks/queryKeys.ts`. Keys include coordinates and units, so switching between °C and °F refetches, and each unit system is cached separately.
- **Converters run inside `queryFn`:** the cache stores UI-ready objects, so components never re-derive daily summaries on each render.
- **Cache timing:** `staleTime` is 10 minutes for current conditions, 30 minutes for the forecast, and 24 hours for geocoding results.
- **Retries:** `ApiError.isRetryable` stops React Query from retrying 4xx responses such as an invalid key or an unknown city. It still retries network and 5xx failures twice.
- **Conditional queries:** queries that have no input yet use `skipToken`.

## Time zones

OpenWeather returns UTC epoch seconds plus a `timezone` offset in seconds for the location. To work with location-local time:

- Converters shift by that offset before taking a `YYYY-MM-DD` key.
- `lib/format.ts` formats the shifted instant with `timeZone: 'UTC'`.

As a result, a forecast for Tokyo groups its hours and labels them by Tokyo's calendar, whatever the viewer's own time zone is.

## State

| State                                      | Where                                                                                                |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Server data                                | TanStack Query                                                                                       |
| Selected location                          | URL search params (`/weather?lat&lon&name`)                                                          |
| Theme, units, recent searches              | `localStorage` via `useLocalStorage` (synced across components and tabs with `useSyncExternalStore`) |
| Ephemeral UI (selected day, combobox open) | Component state                                                                                      |

There is no global client store. Redux was removed in v2.

## Styling

- **Tailwind CSS v4:** configured CSS-first in `src/index.css`, with design tokens as `oklch` CSS variables. Light values sit on `:root` and dark values on `.dark`.
- **Condition tints:** gradients come from `[data-condition='rain']` selectors that set `--sky-from` and `--sky-to`.
- **shadcn/ui:** primitives live in `src/components/ui`. Treat them as owned code that can be edited, but keep edits small.
- **`glass` utility:** a translucent card surface used across weather components.

## SEO

The app is an SPA, so `index.html` carries the default title, description, Open Graph and Twitter tags, and JSON-LD. Each route also renders `<Seo>`, and React 19 hoists its `<title>`, `<meta>` and canonical `<link>` into `<head>`.

`public/sitemap.xml` and `robots.txt` cover the static routes.

## Testing conventions

- **Pure modules** (converters, `lib`) get plain unit tests.
- **Hooks and components** use `renderWithProviders` or `createWrapper` from `src/test/utils.tsx`, which set up a fresh `QueryClient` and a `MemoryRouter`.
- **Network calls** are mocked with `mockFetchByPath`, using fixtures from `src/test/fixtures/weather.ts`.
