const { execSync } = require('child_process');
process.chdir('/Users/milansemelak/Desktop/Claude/oktagon-face-your-brand');
process.env.PORT = '3002';
process.env.BROWSER = 'none';
require('child_process').execFileSync('npx', ['react-scripts', 'start'], {
  stdio: 'inherit',
  env: { ...process.env, PORT: '3002', BROWSER: 'none' },
  cwd: '/Users/milansemelak/Desktop/Claude/oktagon-face-your-brand'
});
