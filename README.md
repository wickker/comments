## Dependencies
Node version > 18.18.0.

## How to run locally

1. Install node modules: 
```bash
yarn 
```

2. Start up json server on port 3000: 
```bash
yarn json-server
```

3. Start up project on port 5173:
```bash
yarn dev
```

## Approach

1. Makes use of a recursive component `<CommentTile />` to display all comment threads.

2. Initial data fetch built with json-server and React Query for ease of managing server state and advantages like client-side caching. 
- Infinite scroll has currently been hardcoded to stop at a certain number of comments due to limitations imposed by json-server.

3. Create, update and delete operations are handled on client side only through the use of recursive functions to modify state.

4. Memoization techniques implemeted primarily to prevent unecessary re-renders for the following cases:
- Input state is modified for create / update operations.
- Show / hide replies button is toggled.
- More comments are fetched during infinite scroll.

5. Search is client-side only via debounce. Searched comments are read-only for the purposes of this project only to keep in sync with the original list of comments.

## Further improvements 

This section details some functionality that was omitted for the purposes of this project but will likely be necessary in real life scenarios.

1. Error notifications for server side requests.

2. XSS / SQL injection input validation.

3. Virtualization, for extremely high numbers of comments.

4. Amend recursive indentation of comment replies for the reduced width of mobile screens.