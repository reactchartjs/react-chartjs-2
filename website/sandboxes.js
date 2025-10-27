/* eslint-disable */
const path = require('path');
const fs = require('fs/promises');

const sourcePattern = path.join(__dirname, '../sandboxes/*/*/dist');
const targetRoot = path.join(__dirname, 'static/sandboxes');

async function moveAllSandboxes() {
  await fs.rm(targetRoot, { recursive: true, force: true });

  for await (const distPath of fs.glob(sourcePattern)) {
    const sandboxPath = path.relative(
      path.join(__dirname, '../sandboxes'),
      distPath.replace(/\/dist$/, '')
    );
    const targetPath = path.join(targetRoot, sandboxPath);

    await fs.mkdir(targetPath, { recursive: true });
    await fs.cp(distPath, targetPath, { recursive: true, force: true });

    console.log(`Copied ${distPath} -> ${targetPath}`);
  }
}

moveAllSandboxes().catch(err => {
  console.error('Error moving sandboxes:', err);
  process.exit(1);
});
