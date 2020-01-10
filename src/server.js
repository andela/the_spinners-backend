import 'regenerator-runtime/runtime';
import { startSocket } from './helpers/eventEmmiters/socket';
import registerApiDocs from './swagger';

import app from './app';

registerApiDocs(app);

const PORT = process.env.PORT || 3000;

// eslint-disable-next-line no-console
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}.......`));

startSocket(server);
