## Contributing

1. Open a [new issue](https://github.com/nespresso/ntaf/issues/new) or pick up an [existing one](https://github.com/nespresso/ntaf/issues)
1. Code, unit tests, document, etc.
1. Commit your changes with message "Fix #X Issue title" 
1. Create a PR
1. Check that the builds are green
1. Fix any SonarQube issues that would have pop up during the builds
1. Assign racodond (David RACODON) as reviewers of the PR
1. Once approved, merge the PR (prefer Squash and merge)

## Building and Testing

* To run unit tests: `npm run test`
* To run end-to-end tests: `npm run e2e-test`. If you are behind a proxy, uncomment (and update if necessary) line `seleniumInstallArgs: { // proxy: 'http://localhost:3128'`, in `lib/conf/wdio.conf.js`.
* To run end-to-end tests in Docker containers: `npm run e2e-test-docker`. If you are behind a proxy, run `npm run e2e-test-docker -- --proxyPort=XXXX` instead.


## Publishing a new version of the npm package
Requirements:

1. Check that the [latest build on master](https://travis-ci.org/nespresso/ntaf) is green
2. Check that the [SonarQube quality gate](https://sonarcloud.io/dashboard?id=natf) is green

From your IDE:

2. Checkout a clean `master` branch
3. Update the package version by running the following command replacing `<type>` with either `major`, `minor` or `patch`: 
```
npm version <type> -m "Release version %s"
```
It upgrades the version in `package.json` and commit the change with "Release version X.X.X" message.

4. Generate the JSDoc by running `npm run doc`
5. Push the changes in `./docs` to GitHub
6. Publish a new release of the npm package by running `npm publish`

From your browser:

7. Close the [milestone](https://github.com/nespresso/ntaf/milestones)
8. Publish a new [new release](https://github.com/nespresso/ntaf/releases/new) on GitHub:
 * Tag version: npm package version
 * Release title: short title describing the main change(s)
 * Description: a link to the issues of the milestone (https://github.com/nespresso/ntaf/milestone/X?closed=1) + any other information that would be relevant
