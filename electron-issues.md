I spent 5 evenings trying to get electron-forge to build this app for windows but to no avail. This is just a small log of some of the issues I faced which might become useful in the future?

[Mon 15 Feb]

- Problems installing winehq-stable on pop_os
  - resolved by installing via pop!\_shop (oops)
- electron-forge packaged application throwing error something along the lines of `Unable to load clientPreload.js ... utp-native.node is not a valid Win32 Application`
- I thought that perhaps it was because I built a 64bit app so I tried building with `--arch=ia32` to no avail.

[Tue 16 Feb]

- No documented attempts via google history but likely continued failed attempts on both linux and windows machine

[Wed 17 Feb]

- Continued investigating building Windows app from linux, attempted building on Windows laptop too but that would run into an issues with `rcedit.exe unable to load` or similar
- Thought that Squirrel.Windows would help so tried that but had missing `mono` dependency. Turns out Squirrel doesn't do what I want anyway
- A lot of attempts and reattempts of building... I probably just changed random things, installed random dependencies but to no effect
- Ended to day looking to a docker-wine image to try and resolve possible wine related issues since the most consistent issue was it complaining about `not a Win32 Application`

[Thu 18 Feb]

- Found a couple docker-wine images but they produced additional errors related to the wine installation. something like `winex64` not found.
- Attempted building with `--arch=ia32` flag again, but this time I would get errors related to node-gyp rebuild and also `fatal error: bits/libc-header-start.h: No such file or directory`
  - resolved by installing `sudo apt-get install gcc-multilib` 32 bit libraries
- Now i'm onto something, but rebuilding throws `fatal error: bits/c++config.h: No such file or directory`
  - resolved by installing more libraries `sudo apt-get install gcc-multilib g++-multilib`
- This build also fails with the same utp-native error, I tried the above on windows as well but again same error
- I thought maybe on windows the issue was WSL because after all it is a linux environment, so I installed Git Bash and tried again from there. Git Bash and node installed, I tried running the package script but apparantly snowpack cli doesnt exist despite installing node_modules!
- I gave up at this point.

[Fri 19 Feb]

- I read something online with someone recommending `electron-builder` over `electron-forge` so I thought I must give it a go
- Setup a basic config for `electron-builder` and ran it once, their docker containers really helped too. Another error though, `Not allowed to load local resource 'app.asar/resources/app/build/index.html'`...

  - resolved by adding files array to `electron-builder.yml` to specify which folders to include in package (build was being ignored before because it is the default output directory for electron-builder)

- Success! In the end I'm still not sure what was wrong with electron-forge and my application but electron-builder came through at the end. I will continue to use electron-forge for local development though
