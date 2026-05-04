import app from './src/app.js';
import env from './src/config/env.js';

app.listen(env.PORT, () => {
  console.log(`Premiumin Plus backend running on port ${env.PORT}`);
});
