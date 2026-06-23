#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status.
set -e

if [ -z "$1" ]; then
  echo "Usage: ./upgrade-version.sh <new-version | patch | minor | major>"
  echo "Example: ./upgrade-version.sh minor"
  echo "Example: ./upgrade-version.sh 1.2.3"
  exit 1
fi

VERSION=$1

# 1. Bump the root version
echo "Bumping root package version..."
npm version $VERSION --no-git-tag-version

# Extract the newly created version to apply to workspaces consistently
NEW_VERSION=$(node -p "require('./package.json').version")
echo "New version determined as: $NEW_VERSION"

# 2. Bump the versions in all workspace packages
echo "Bumping versions in workspace packages..."
npm --workspaces version $NEW_VERSION --no-git-tag-version

# 3. Update internal cross-dependencies across the workspaces
echo "Synchronizing internal dependencies..."
node -e "
const fs = require('fs');
const path = require('path');

const packagesDir = path.join(process.cwd(), 'packages');
const packages = fs.readdirSync(packagesDir).filter(p => fs.statSync(path.join(packagesDir, p)).isDirectory());
const newVersion = '$NEW_VERSION';
const namespace = '@khinemyaezin/';

packages.forEach(pkg => {
  const pkgJsonPath = path.join(packagesDir, pkg, 'package.json');
  if (fs.existsSync(pkgJsonPath)) {
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
    let modified = false;

    // Check all dependency types for internal workspace packages
    ['dependencies', 'devDependencies', 'peerDependencies'].forEach(depType => {
      if (pkgJson[depType]) {
        Object.keys(pkgJson[depType]).forEach(dep => {
          if (dep.startsWith(namespace)) {
            // Update the internal dependency to the new version
            pkgJson[depType][dep] = newVersion;
            modified = true;
          }
        });
      }
    });

    if (modified) {
      fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + '\n');
      console.log(\`  Updated internal dependencies for \${pkg}\`);
    }
  }
});
"

echo "=========================================================="
echo "✅ Successfully upgraded all packages to version $NEW_VERSION."
echo "=========================================================="
echo "Next steps:"
echo "1. Verify the changes using 'git diff'"
echo "2. Commit the changes:"
echo "   git commit -am \"chore: bump version to $NEW_VERSION\""
echo "3. Create a git tag:"
echo "   git tag v$NEW_VERSION"
echo "4. Push the changes and tags:"
echo "   git push && git push --tags"
